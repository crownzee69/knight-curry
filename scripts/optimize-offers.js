const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const offersDir = path.join(__dirname, '../public/assets/offers');
const targetSizeKB = 300;
const targetSizeBytes = targetSizeKB * 1024;

async function optimizeImage(inputPath, outputPath) {
  try {
    const stats = fs.statSync(inputPath);
    const originalSize = stats.size;
    console.log(`\nOptimizing ${path.basename(inputPath)} (${(originalSize / 1024).toFixed(2)}KB)...`);

    // Start with quality 85 and adjust down if needed
    let quality = 85;
    let minQuality = 50;
    let optimized = false;
    let finalSize = originalSize;

    while (!optimized && quality >= minQuality) {
      const buffer = await sharp(inputPath)
        .resize(1920, null, {
          withoutEnlargement: true,
          fit: 'inside'
        })
        .png({
          quality: quality,
          compressionLevel: 9,
          adaptiveFiltering: true
        })
        .toBuffer();

      finalSize = buffer.length;

      if (finalSize <= targetSizeBytes) {
        fs.writeFileSync(outputPath, buffer);
        console.log(`✓ Optimized: ${(originalSize / 1024).toFixed(2)}KB → ${(finalSize / 1024).toFixed(2)}KB (quality: ${quality})`);
        optimized = true;
      } else {
        quality -= 5;
      }
    }

    if (!optimized) {
      // If still too large, try converting to WebP or JPEG
      console.log(`  Trying WebP format...`);
      const webpBuffer = await sharp(inputPath)
        .resize(1920, null, {
          withoutEnlargement: true,
          fit: 'inside'
        })
        .webp({
          quality: 80
        })
        .toBuffer();

      if (webpBuffer.length <= targetSizeBytes) {
        const webpPath = outputPath.replace('.png', '.webp');
        fs.writeFileSync(webpPath, webpBuffer);
        console.log(`✓ Optimized as WebP: ${(originalSize / 1024).toFixed(2)}KB → ${(webpBuffer.length / 1024).toFixed(2)}KB`);
        return webpPath;
      }

      // Last resort: JPEG
      console.log(`  Trying JPEG format...`);
      const jpegBuffer = await sharp(inputPath)
        .resize(1920, null, {
          withoutEnlargement: true,
          fit: 'inside'
        })
        .jpeg({
          quality: 80,
          mozjpeg: true
        })
        .toBuffer();

      if (jpegBuffer.length <= targetSizeBytes) {
        const jpegPath = outputPath.replace('.png', '.jpg');
        fs.writeFileSync(jpegPath, jpegBuffer);
        console.log(`✓ Optimized as JPEG: ${(originalSize / 1024).toFixed(2)}KB → ${(jpegBuffer.length / 1024).toFixed(2)}KB`);
        return jpegPath;
      }

      // If still too large, use the smallest result
      const smallest = Math.min(webpBuffer.length, jpegBuffer.length);
      if (smallest === webpBuffer.length) {
        const webpPath = outputPath.replace('.png', '.webp');
        fs.writeFileSync(webpPath, webpBuffer);
        console.log(`⚠ Best effort WebP: ${(originalSize / 1024).toFixed(2)}KB → ${(webpBuffer.length / 1024).toFixed(2)}KB`);
        return webpPath;
      } else {
        const jpegPath = outputPath.replace('.png', '.jpg');
        fs.writeFileSync(jpegPath, jpegBuffer);
        console.log(`⚠ Best effort JPEG: ${(originalSize / 1024).toFixed(2)}KB → ${(jpegBuffer.length / 1024).toFixed(2)}KB`);
        return jpegPath;
      }
    }

    return outputPath;
  } catch (error) {
    console.error(`Error optimizing ${inputPath}:`, error.message);
    return null;
  }
}

async function main() {
  console.log('Optimizing offer images to ~300KB...\n');

  const images = ['1.png', '2.png', '3.png'];
  const results = [];

  for (const image of images) {
    const inputPath = path.join(offersDir, image);
    
    if (!fs.existsSync(inputPath)) {
      console.log(`⚠ Skipping ${image} (not found)`);
      continue;
    }

    // Create backup
    const backupPath = path.join(offersDir, `${image}.backup`);
    if (!fs.existsSync(backupPath)) {
      fs.copyFileSync(inputPath, backupPath);
      console.log(`Created backup: ${backupPath}`);
    }

    const outputPath = await optimizeImage(inputPath, inputPath);
    if (outputPath) {
      results.push({ original: image, optimized: path.basename(outputPath) });
    }
  }

  console.log('\n✓ Optimization complete!');
  console.log('\nUpdated files:');
  results.forEach(r => {
    console.log(`  ${r.original} → ${r.optimized}`);
  });
}

main().catch(console.error);

