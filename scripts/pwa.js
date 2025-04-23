const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const svgr = require('@svgr/core').default;

// Define the directory paths
const publicDir = path.join(process.cwd(), 'public');
const iconsDir = path.join(publicDir, 'icons');

// Ensure directory exists
function ensureDirectoryExistence(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// Clear existing icons in the icons directory
function clearIconsDirectory(dirPath) {
  if (fs.existsSync(dirPath)) {
    const files = fs.readdirSync(dirPath);
    for (const file of files) {
      const filePath = path.join(dirPath, file);
      if (fs.lstatSync(filePath).isFile()) {
        fs.unlinkSync(filePath);
      }
    }
  }
}

// Define the sizes for PWA icons
const sizes = [16, 32, 72, 96, 120, 128, 144, 152, 180, 192, 384, 512];

// Function to optimize SVG and create one with proper dimensions
async function optimizeSvg(sourceSvg, size) {
  try {
    const svgContent = fs.readFileSync(sourceSvg, 'utf8');
    const outputFile = path.join(iconsDir, `${size}x${size}.svg`);

    // Parse and modify SVG attributes to set width and height
    let modifiedSvg = svgContent;

    // Extract viewBox if present
    const viewBoxMatch = svgContent.match(/viewBox=["']([^"']+)["']/);
    const viewBox = viewBoxMatch ? viewBoxMatch[1] : "0 0 24 24"; // Default viewBox

    // Modify SVG to ensure it has width, height and viewBox
    if (!modifiedSvg.includes('width=')) {
      modifiedSvg = modifiedSvg.replace('<svg', `<svg width="${size}"`);
    } else {
      modifiedSvg = modifiedSvg.replace(/width=["']([^"']+)["']/, `width="${size}"`);
    }

    if (!modifiedSvg.includes('height=')) {
      modifiedSvg = modifiedSvg.replace('<svg', `<svg height="${size}"`);
    } else {
      modifiedSvg = modifiedSvg.replace(/height=["']([^"']+)["']/, `height="${size}"`);
    }

    if (!modifiedSvg.includes('viewBox=')) {
      modifiedSvg = modifiedSvg.replace('<svg', `<svg viewBox="${viewBox}"`);
    }

    fs.writeFileSync(outputFile, modifiedSvg);

    // Also generate PNG version for backward compatibility and manifest
    await sharp(Buffer.from(modifiedSvg))
      .resize({ width: size, height: size })
      .png()
      .toFile(path.join(iconsDir, `${size}x${size}.png`));

    return outputFile;
  } catch (error) {
    console.error(`❌ Error optimizing SVG for ${size}x${size}:`, error.message);
    throw error;
  }
}

// Function to resize and save an icon (for non-SVG sources)
async function resizeAndSave(inputFile, size) {
  const outputFile = path.join(iconsDir, `${size}x${size}.png`);
  try {
    const image = sharp(inputFile).resize({ width: size, height: size });
    if (size === 32) {
      const radius = size / 20; // Adjust the divisor for corner roundness
      const roundedCorners = Buffer.from(
        `<svg><rect x="0" y="0" width="${size}" height="${size}" rx="${radius}" ry="${radius}"/></svg>`,
      );
      await image
        .composite([{ input: roundedCorners, blend: 'dest-in' }])
        .toFile(outputFile);
    } else {
      await image.toFile(outputFile);
    }
  } catch (error) {
    console.error(`❌ Error creating icon ${size}x${size}.png:`, error.message);
  }
}

// Create a favicon.ico from SVG
async function createFaviconIco(svgPath) {
  try {
    const outputIco = path.join(publicDir, 'favicon.ico');

    // Convert to PNG first at 32x32
    const tempPng = path.join(iconsDir, 'temp-favicon.png');
    await sharp(svgPath)
      .resize(32, 32)
      .png()
      .toFile(tempPng);

    // Convert PNG to ICO using sharp (basic support)
    await sharp(tempPng)
      .toFile(outputIco);

    // Clean up temp file
    if (fs.existsSync(tempPng)) {
      fs.unlinkSync(tempPng);
    }

    console.log('✓ favicon.ico created');
  } catch (error) {
    console.error('❌ Error creating favicon.ico:', error.message);
  }
}

// Main function to generate PWA icons
async function generatePwaIcons() {
  try {
    // Ensure required directories exist
    ensureDirectoryExistence(publicDir);
    ensureDirectoryExistence(iconsDir);
    clearIconsDirectory(iconsDir);

    // First check for SVG file
    const svgIconPath = path.join(publicDir, 'logo.svg');
    const svgExists = fs.existsSync(svgIconPath);

    if (svgExists) {
      console.log('✓ Found SVG icon, generating SVG favicons...');

      // Copy original SVG to icon location
      fs.copyFileSync(svgIconPath, path.join(publicDir, 'favicon.svg'));

      // Generate SVG icons for each size
      await Promise.all(
        sizes.map((size) =>
          optimizeSvg(svgIconPath, size).catch((err) =>
            console.error(
              `❌ Failed to generate SVG icon ${size}x${size}:`,
              err.message,
            ),
          ),
        ),
      );

      // Also create a favicon.ico for compatibility
      await createFaviconIco(svgIconPath);

    } else {
      // Fallback to original behavior for raster images
      console.log('No SVG found, using raster image source...');

      // Resolve source icon file: check for icon.webp, icon.png, or icon.jpg in public/
      const possibleExtensions = ['webp', 'png', 'jpg', 'icon.svg'];
      let sourceIcon = null;
      for (const ext of possibleExtensions) {
        const filePath = path.join(publicDir, `icon.${ext}`);
        if (fs.existsSync(filePath)) {
          sourceIcon = filePath;
          break;
        }
      }
      if (!sourceIcon) {
        throw new Error(
          'No valid source icon found. Please include logo.svg, icon.webp, icon.png, or icon.jpg in the public folder.',
        );
      }

      // Destination for the converted logo (always .webp)
      const logoDestination = path.join(publicDir, 'icon.webp');

      // If the found file isn't already webp, convert it; otherwise, copy if necessary
      if (path.extname(sourceIcon).toLowerCase() !== '.webp') {
        await sharp(sourceIcon).toFormat('webp').toFile(logoDestination);
      } else if (path.resolve(sourceIcon) !== path.resolve(logoDestination)) {
        fs.copyFileSync(sourceIcon, logoDestination);
      }

      // Small delay for file system consistency
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Generate resized icons based on the logoDestination
      await Promise.all(
        sizes.map((size) =>
          resizeAndSave(logoDestination, size).catch((err) =>
            console.error(
              `❌ Failed to generate icon ${size}x${size}:`,
              err.message,
            ),
          ),
        ),
      );
    }

    // Create an updated manifest file with both PNG and SVG references
    if (svgExists) {
      updateManifestWithSvg();
    }

    console.log('✓ PWA icons generated successfully!');
  } catch (error) {
    console.error('❌ Error generating PWA icons or logo:', error.message);
    throw error;
  }
}

// Function to update the manifest to include SVG icons when available
function updateManifestWithSvg() {
  try {
    const manifestPath = path.join(publicDir, 'manifest.prod.json');
    if (fs.existsSync(manifestPath)) {
      const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

      // Add SVG icon entries
      const svgIcons = sizes.map(size => ({
        src: `icons/${size}x${size}.svg`,
        sizes: `${size}x${size}`,
        type: "image/svg+xml"
      }));

      // Keep original PNG entries for compatibility
      if (!manifest.icons) {
        manifest.icons = [];
      }

      // Add SVG entries to the beginning of the array for priority
      manifest.icons = [...svgIcons, ...manifest.icons];

      // Write updated manifest
      fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
      console.log('✓ Updated manifest.json with SVG icons');
    }
  } catch (error) {
    console.error('❌ Error updating manifest with SVG icons:', error.message);
  }
}

// Immediately invoke the script
(async () => {
  try {
    await generatePwaIcons();
  } catch (error) {
    console.error('❌ Error generating PWA icons:', error);
  }
})();