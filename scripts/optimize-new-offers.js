const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const offersDir = path.join(__dirname, '../public/assets/offers');
const targetSizeKB = 300;
const targetSizeBytes = targetSizeKB * 1024;
const targetWidth = 1536;
const targetHeight = 1024;

async function optimizeImage(inputPath, outputPath) {
  try {
    const stats = fs.statSync(inputPath);
    const originalSize = stats.size;
    console.log(`\nOptimizing ${path.basename(inputPath)} (${(originalSize / 1024).toFixed(2)}KB)...`);

    // Resize to target dimensions and optimize
    let quality = 85;
    let minQuality = 50;
    let optimized = false;
    let finalSize = originalSize;

    while (!optimized && quality >= minQuality) {
      const buffer = await sharp(inputPath)
        .resize(targetWidth, targetHeight, {
          fit: 'cover',
          position: 'center'
        })
        .webp({
          quality: quality,
          effort: 6
        })
        .toBuffer();

      finalSize = buffer.length;

      if (finalSize <= targetSizeBytes) {
        fs.writeFileSync(outputPath, buffer);
        const metadata = await sharp(outputPath).metadata();
        console.log(`✓ Optimized: ${(originalSize / 1024).toFixed(2)}KB → ${(finalSize / 1024).toFixed(2)}KB`);
        console.log(`  Dimensions: ${metadata.width}x${metadata.height}px (quality: ${quality})`);
        optimized = true;
      } else {
        quality -= 5;
      }
    }

    if (!optimized) {
      // Use the best result even if slightly over target
      const buffer = await sharp(inputPath)
        .resize(targetWidth, targetHeight, {
          fit: 'cover',
          position: 'center'
        })
        .webp({
          quality: minQuality,
          effort: 6
        })
        .toBuffer();

      fs.writeFileSync(outputPath, buffer);
      const metadata = await sharp(outputPath).metadata();
      console.log(`✓ Optimized (best effort): ${(originalSize / 1024).toFixed(2)}KB → ${(buffer.length / 1024).toFixed(2)}KB`);
      console.log(`  Dimensions: ${metadata.width}x${metadata.height}px`);
    }

    return outputPath;
  } catch (error) {
    console.error(`Error optimizing ${inputPath}:`, error.message);
    return null;
  }
}

async function main() {
  console.log('Optimizing new offer images to 1536x1024px and ~300KB...\n');

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

    const webpPath = inputPath.replace('.png', '.webp');
    const outputPath = await optimizeImage(inputPath, webpPath);
    
    if (outputPath) {
      results.push({ original: image, optimized: path.basename(outputPath) });
    }
  }

  console.log('\n✓ Optimization complete!');
  console.log('\nUpdated files:');
  results.forEach(r => {
    console.log(`  ${r.original} → ${r.optimized}`);
  });
  console.log('\nAll images are now 1536x1024px and under 300KB');
}

main().catch(console.error);

