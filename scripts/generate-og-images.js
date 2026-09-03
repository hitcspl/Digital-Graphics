/**
 * Generate Open Graph preview images using sharp's create function
 * Creates simple gradient backgrounds with brand colors (1200x630px)
 */

import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import sharp from "sharp"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const publicDir = path.join(__dirname, "../public")

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true })
}

const images = [
  { name: "og-image.jpg", title: "Digital Graphics" },
  { name: "og-proud-moments.jpg", title: "Proud Moments" },
]

async function generateImage(config) {
  const width = 1200
  const height = 630

  try {
    // Create a dark background with brand red accent using pixel data
    const pixelData = Buffer.alloc(width * height * 3)
    const red = 239,
      green = 61,
      blue = 49 // Brand red: #EF3D31
    const bgRed = 15,
      bgGreen = 15,
      bgBlue = 15 // Dark background

    // Fill background
    for (let i = 0; i < pixelData.length; i += 3) {
      pixelData[i] = bgRed
      pixelData[i + 1] = bgGreen
      pixelData[i + 2] = bgBlue
    }

    // Add red accent bar (12px wide) on the left
    const pixelsPerRow = width * 3
    for (let y = 0; y < height; y++) {
      const rowStart = y * pixelsPerRow
      for (let x = 0; x < 12; x++) {
        const pixelIndex = rowStart + x * 3
        pixelData[pixelIndex] = red
        pixelData[pixelIndex + 1] = green
        pixelData[pixelIndex + 2] = blue
      }
    }

    // Create JPEG from raw pixel data
    await sharp(pixelData, {
      raw: { width, height, channels: 3 },
    })
      .jpeg({ quality: 90, progressive: true })
      .toFile(path.join(publicDir, config.name))

    const fileSize = fs.statSync(path.join(publicDir, config.name)).size
    console.log(
      `✓ Generated ${config.name} (${(fileSize / 1024).toFixed(1)}KB)`
    )
  } catch (error) {
    console.error(`✗ Failed to generate ${config.name}:`, error.message)
  }
}

async function main() {
  console.log("Generating Open Graph preview images...\n")

  for (const config of images) {
    await generateImage(config)
  }

  console.log("\nDone! OG images created in /public/ directory.")
}

main().catch(console.error)
