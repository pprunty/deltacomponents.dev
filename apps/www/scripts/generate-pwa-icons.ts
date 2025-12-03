import {
  promises as fs,
  existsSync,
  readdirSync,
  lstatSync,
  unlinkSync,
  copyFileSync,
  readFileSync,
  writeFileSync,
} from "fs";
import path from "path";
import sharp from "sharp";
import { default as svgr } from "@svgr/core";

// Define the directory paths
const publicDir = path.join(process.cwd(), "public");
const iconsDir = path.join(publicDir, "icons");

// Ensure directory exists
function ensureDirectoryExistence(dirPath: string): void {
  if (!existsSync(dirPath)) {
    fs.mkdir(dirPath, { recursive: true });
  }
}

// Clear existing icons in the icons directory
function clearIconsDirectory(dirPath: string): void {
  if (existsSync(dirPath)) {
    const files = readdirSync(dirPath);
    for (const file of files) {
      const filePath = path.join(dirPath, file);
      if (lstatSync(filePath).isFile()) {
        unlinkSync(filePath);
      }
    }
  }
}

// Define the sizes for PWA icons
const sizes: number[] = [
  16, 32, 72, 96, 120, 128, 144, 152, 180, 192, 384, 512,
];

// Function to optimize SVG and create one with proper dimensions
async function optimizeSvg(sourceSvg: string, size: number): Promise<string> {
  try {
    const svgContent = await fs.readFile(sourceSvg, "utf8");
    const outputFile = path.join(iconsDir, `${size}x${size}.svg`);

    // Parse and modify SVG attributes to set width and height
    let modifiedSvg = svgContent;

    // Extract viewBox if present
    const viewBoxMatch = svgContent.match(/viewBox=["']([^"']+)["']/);
    const viewBox = viewBoxMatch ? viewBoxMatch[1] : "0 0 24 24"; // Default viewBox

    // Modify SVG to ensure it has width, height and viewBox
    if (!modifiedSvg.includes("width=")) {
      modifiedSvg = modifiedSvg.replace("<svg", `<svg width="${size}"`);
    } else {
      modifiedSvg = modifiedSvg.replace(
        /width=["']([^"']+)["']/,
        `width="${size}"`,
      );
    }

    if (!modifiedSvg.includes("height=")) {
      modifiedSvg = modifiedSvg.replace("<svg", `<svg height="${size}"`);
    } else {
      modifiedSvg = modifiedSvg.replace(
        /height=["']([^"']+)["']/,
        `height="${size}"`,
      );
    }

    if (!modifiedSvg.includes("viewBox=")) {
      modifiedSvg = modifiedSvg.replace("<svg", `<svg viewBox="${viewBox}"`);
    }

    await fs.writeFile(outputFile, modifiedSvg);

    // Also generate PNG version for backward compatibility and manifest
    await sharp(Buffer.from(modifiedSvg))
      .resize({ width: size, height: size })
      .png()
      .toFile(path.join(iconsDir, `${size}x${size}.png`));

    return outputFile;
  } catch (error) {
    console.error(
      `❌ Error optimizing SVG for ${size}x${size}:`,
      error instanceof Error ? error.message : String(error),
    );
    throw error;
  }
}

// Function to resize and save an icon (for non-SVG sources)
async function resizeAndSave(inputFile: string, size: number): Promise<void> {
  const outputFile = path.join(iconsDir, `${size}x${size}.png`);
  try {
    const image = sharp(inputFile).resize({ width: size, height: size });

    // Apply rounded corners to favicon-sized images (small icons that browsers use)
    const faviconSizes = [16, 32, 96, 128];
    if (faviconSizes.includes(size)) {
      // Calculate radius based on size - smaller radius for smaller icons
      const radius = Math.max(2, Math.round(size / 8)); // Minimum 2px radius, scales with size

      // Create a rounded rectangle mask using Sharp
      const mask = Buffer.from(
        `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
            <rect width="${size}" height="${size}" rx="${radius}" ry="${radius}" fill="white"/>
          </svg>`
      );

      console.log(`Creating rounded favicon mask for ${size}x${size} with radius ${radius}px`);

      await sharp(inputFile)
        .resize({ width: size, height: size, fit: 'cover' })
        .composite([{ input: mask, blend: 'dest-in' }])
        .png()
        .toFile(outputFile);
    } else {
      await image.png().toFile(outputFile);
    }
  } catch (error) {
    console.error(
      `❌ Error creating icon ${size}x${size}.png:`,
      error instanceof Error ? error.message : String(error),
    );
  }
}

// Create a rounded favicon.ico from any source image
async function createFaviconIco(sourcePath: string): Promise<void> {
  try {
    const outputIco = path.join(publicDir, "favicon.ico");
    const size = 32;
    const radius = Math.max(2, Math.round(size / 8)); // More subtle rounding for favicons

    // Create a rounded rectangle mask using Sharp
    const mask = Buffer.from(
      `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
          <rect width="${size}" height="${size}" rx="${radius}" ry="${radius}" fill="white"/>
        </svg>`
    );

    console.log(`Creating favicon.ico mask for ${size}x${size} with radius ${radius}px`);

    const tempPng = path.join(iconsDir, "temp-favicon.png");
    await sharp(sourcePath)
      .resize({ width: size, height: size, fit: 'cover' })
      .composite([{ input: mask, blend: 'dest-in' }])
      .png()
      .toFile(tempPng);

    await sharp(tempPng).toFile(outputIco);

    if (existsSync(tempPng)) {
      unlinkSync(tempPng);
    }

    console.log("✓ favicon.ico created with rounded corners");
  } catch (error) {
    console.error(
      "❌ Error creating favicon.ico:",
      error instanceof Error ? error.message : String(error),
    );
  }
}

// Main function to generate PWA icons
async function generatePwaIcons(): Promise<void> {
  try {
    // Ensure required directories exist
    ensureDirectoryExistence(publicDir);
    ensureDirectoryExistence(iconsDir);
    clearIconsDirectory(iconsDir);

    // First check for SVG file
    const svgIconPath = path.join(publicDir, "logo.svg");
    const svgExists = existsSync(svgIconPath);

    if (svgExists) {
      console.log("✓ Found SVG icon, generating SVG favicons...");

      // Copy original SVG to icon location
      copyFileSync(svgIconPath, path.join(publicDir, "favicon.svg"));

      // Generate SVG icons for each size
      await Promise.all(
        sizes.map((size) =>
          optimizeSvg(svgIconPath, size).catch((err) =>
            console.error(
              `❌ Failed to generate SVG icon ${size}x${size}:`,
              err instanceof Error ? err.message : String(err),
            ),
          ),
        ),
      );

      // Also create a favicon.ico for compatibility
      await createFaviconIco(svgIconPath);
    } else {
      // Fallback to original behavior for raster images
      console.log("No SVG found, using raster image source...");

      // Resolve source icon file: check for icon.webp, icon.png, or icon.jpg in public/
      const possibleExtensions = ["webp", "png", "jpg", "icon.svg"];
      let sourceIcon: string | null = null;
      for (const ext of possibleExtensions) {
        const filePath = path.join(publicDir, `icon.${ext}`);
        if (existsSync(filePath)) {
          sourceIcon = filePath;
          break;
        }
      }
      if (!sourceIcon) {
        throw new Error(
          "No valid source icon found. Please include logo.svg, icon.webp, icon.png, or icon.jpg in the public folder.",
        );
      }

      // Destination for the converted logo (always .webp)
      const logoDestination = path.join(publicDir, "icon.webp");

      // If the found file isn't already webp, convert it; otherwise, copy if necessary
      if (path.extname(sourceIcon).toLowerCase() !== ".webp") {
        await sharp(sourceIcon).toFormat("webp").toFile(logoDestination);
      } else if (path.resolve(sourceIcon) !== path.resolve(logoDestination)) {
        copyFileSync(sourceIcon, logoDestination);
      }

      // Small delay for file system consistency
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Generate resized icons based on the logoDestination
      await Promise.all(
        sizes.map((size) =>
          resizeAndSave(logoDestination, size).catch((err) =>
            console.error(
              `❌ Failed to generate icon ${size}x${size}:`,
              err instanceof Error ? err.message : String(err),
            ),
          ),
        ),
      );

      // Also create a favicon.ico for compatibility
      await createFaviconIco(logoDestination);
    }

    // Create an updated manifest file with both PNG and SVG references
    if (svgExists) {
      updateManifestWithSvg();
    }

    console.log("✓ PWA icons generated successfully!");
  } catch (error) {
    console.error(
      "❌ Error generating PWA icons or logo:",
      error instanceof Error ? error.message : String(error),
    );
    throw error;
  }
}

// Interface for manifest file
interface ManifestIcon {
  src: string;
  sizes: string;
  type: string;
}

interface Manifest {
  icons: ManifestIcon[];
  [key: string]: any;
}

// Function to update the manifest to include SVG icons when available
function updateManifestWithSvg(): void {
  try {
    const manifestPath = path.join(publicDir, "manifest.prod.json");
    if (existsSync(manifestPath)) {
      const manifestContent = readFileSync(manifestPath, "utf8");
      const manifest = JSON.parse(manifestContent) as Manifest;

      // Add SVG icon entries
      const svgIcons: ManifestIcon[] = sizes.map((size) => ({
        src: `icons/${size}x${size}.svg`,
        sizes: `${size}x${size}`,
        type: "image/svg+xml",
      }));

      // Keep original PNG entries for compatibility
      if (!manifest.icons) {
        manifest.icons = [];
      }

      // Add SVG entries to the beginning of the array for priority
      manifest.icons = [...svgIcons, ...manifest.icons];

      // Write updated manifest
      writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
      console.log("✓ Updated manifest.json with SVG icons");
    }
  } catch (error) {
    console.error(
      "❌ Error updating manifest with SVG icons:",
      error instanceof Error ? error.message : String(error),
    );
  }
}

// Export the function so it can be called from command line
export default generatePwaIcons;

// If script is run directly (not imported), execute the function
if (import.meta.url.endsWith(process.argv[1])) {
  (async () => {
    try {
      await generatePwaIcons();
    } catch (error) {
      console.error(
        "❌ Error generating PWA icons:",
        error instanceof Error ? error.message : String(error),
      );
      process.exit(1);
    }
  })();
}
