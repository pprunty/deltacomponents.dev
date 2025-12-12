#!/usr/bin/env tsx

/**
 * Script to convert all images in specified directories to WebP format
 * Skips SVG files and already converted WebP files
 *
 * Usage: tsx scripts/convert-to-webp.ts [directory]
 * Example: tsx scripts/convert-to-webp.ts public/images/themes
 */

import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

// Get directory from command line args, or use defaults
const argDir = process.argv[2];
const DIRECTORIES = argDir ? [argDir] : [
    'public/posts',
    'public/projects'
];

const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.JPG', '.JPEG', '.PNG'];

interface ConversionResult {
    original: string;
    webp: string;
    originalSize: number;
    webpSize: number;
    saved: number;
    savedPercent: number;
}

async function convertToWebP(filePath: string): Promise<ConversionResult | null> {
    const ext = path.extname(filePath);
    const dir = path.dirname(filePath);
    const basename = path.basename(filePath, ext);
    const webpPath = path.join(dir, `${basename}.webp`);

    // Skip if WebP already exists
    if (fs.existsSync(webpPath)) {
        console.log(`⏭️  Skipping ${path.basename(filePath)} - WebP already exists`);
        return null;
    }

    try {
        const originalSize = fs.statSync(filePath).size;
        const isJpeg = ['.jpg', '.jpeg', '.JPG', '.JPEG'].includes(ext);

        // Different strategies for PNG vs JPEG:
        // - PNG: Use lossless mode (preserves 100% quality)
        // - JPEG: Use near-lossless with high quality (avoids expansion while maintaining excellent quality)
        const webpOptions = isJpeg
            ? { quality: 95, nearLossless: true, effort: 6 }  // Near-lossless for JPEGs
            : { quality: 100, lossless: true, effort: 6 };     // Lossless for PNGs

        await sharp(filePath)
            .webp(webpOptions)
            .toFile(webpPath);

        const webpSize = fs.statSync(webpPath).size;
        const saved = originalSize - webpSize;
        const savedPercent = ((saved / originalSize) * 100);

        return {
            original: filePath,
            webp: webpPath,
            originalSize,
            webpSize,
            saved,
            savedPercent
        };
    } catch (error) {
        console.error(`❌ Error converting ${filePath}:`, error);
        return null;
    }
}

async function processDirectory(dirPath: string): Promise<ConversionResult[]> {
    const results: ConversionResult[] = [];

    if (!fs.existsSync(dirPath)) {
        console.log(`⚠️  Directory not found: ${dirPath}`);
        return results;
    }

    const files = fs.readdirSync(dirPath);

    for (const file of files) {
        const filePath = path.join(dirPath, file);
        const ext = path.extname(file);

        // Skip if not an image we want to convert
        if (!IMAGE_EXTENSIONS.includes(ext)) {
            continue;
        }

        console.log(`🔄 Converting: ${file}`);
        const result = await convertToWebP(filePath);

        if (result) {
            results.push(result);
            console.log(`✅ Converted: ${file} → ${path.basename(result.webp)}`);
            console.log(`   Size: ${(result.originalSize / 1024).toFixed(2)}KB → ${(result.webpSize / 1024).toFixed(2)}KB (${result.savedPercent.toFixed(1)}% smaller)\n`);
        }
    }

    return results;
}

async function main() {
    console.log('🚀 Starting image conversion to WebP...\n');

    if (argDir) {
        console.log(`📂 Target directory: ${argDir}\n`);
    }

    let allResults: ConversionResult[] = [];

    for (const dir of DIRECTORIES) {
        console.log(`📁 Processing directory: ${dir}`);
        const results = await processDirectory(dir);
        allResults = [...allResults, ...results];
        console.log('');
    }

    // Summary
    if (allResults.length === 0) {
        console.log('✨ No images needed conversion - all done!\n');
        return;
    }

    console.log('📊 Conversion Summary:');
    console.log('═══════════════════════════════════════════════════\n');

    const totalOriginalSize = allResults.reduce((sum, r) => sum + r.originalSize, 0);
    const totalWebpSize = allResults.reduce((sum, r) => sum + r.webpSize, 0);
    const totalSaved = totalOriginalSize - totalWebpSize;
    const totalSavedPercent = ((totalSaved / totalOriginalSize) * 100);

    console.log(`✅ Converted: ${allResults.length} image(s)`);
    console.log(`💾 Total size before: ${(totalOriginalSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`💾 Total size after:  ${(totalWebpSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`🎉 Total saved: ${(totalSaved / 1024 / 1024).toFixed(2)} MB (${totalSavedPercent.toFixed(1)}% reduction)\n`);

    // Clean up original files
    // console.log('🗑️  Cleaning up original files...\n');
    // let deletedCount = 0;

    // for (const result of allResults) {
    //     try {
    //         // fs.unlinkSync(result.original);
    //         // console.log(`   ✓ Deleted: ${path.basename(result.original)}`);
    //         // deletedCount++;
    //     } catch (error) {
    //         console.error(`   ✗ Failed to delete ${path.basename(result.original)}:`, error);
    //     }
    // }

    // console.log(`\n✅ Cleanup complete! Deleted ${deletedCount} original file(s)\n`);
}

main().catch(console.error);
