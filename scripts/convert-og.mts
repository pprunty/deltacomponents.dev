import { existsSync } from "fs"
import path from "path"
import sharp from "sharp"

// Define the directory paths
const publicDir = path.join(process.cwd(), "public")
const ogDir = path.join(publicDir, "og")

// Function to convert PNG to optimized WebP
async function convertOgToWebp(): Promise<void> {
  try {
    const sourceFile = path.join(ogDir, "og.png")
    const outputFile = path.join(ogDir, "og.webp")

    if (!existsSync(sourceFile)) {
      throw new Error(`Source file not found: ${sourceFile}`)
    }

    console.log("🔄 Converting og.png to optimized og.webp...")

    // Convert to WebP with optimization
    await sharp(sourceFile)
      .webp({
        quality: 100, // Maximum quality
        effort: 6, // Maximum compression effort
        lossless: false,
      })
      .toFile(outputFile)

    // Get file sizes for comparison
    const originalStats = await sharp(sourceFile).metadata()
    const optimizedStats = await sharp(outputFile).metadata()

    console.log("✓ Conversion completed successfully!")
    console.log(`📊 Original size: ${originalStats.width}x${originalStats.height}`)
    console.log(`📊 Optimized size: ${optimizedStats.width}x${optimizedStats.height}`)
    
    // Compare file sizes
    const fs = await import("fs/promises")
    const originalSize = (await fs.stat(sourceFile)).size
    const optimizedSize = (await fs.stat(outputFile)).size
    const savings = ((originalSize - optimizedSize) / originalSize * 100).toFixed(1)
    
    console.log(`💾 File size reduction: ${(originalSize / 1024).toFixed(1)}KB → ${(optimizedSize / 1024).toFixed(1)}KB (${savings}% smaller)`)
    
  } catch (error) {
    console.error(
      "❌ Error converting OG image:",
      error instanceof Error ? error.message : String(error)
    )
    throw error
  }
}

// Export the function so it can be called from command line
export default convertOgToWebp

// If script is run directly (not imported), execute the function
if (import.meta.url.endsWith(process.argv[1])) {
  ;(async () => {
    try {
      await convertOgToWebp()
    } catch (error) {
      console.error(
        "❌ Error converting OG image:",
        error instanceof Error ? error.message : String(error)
      )
      process.exit(1)
    }
  })()
}