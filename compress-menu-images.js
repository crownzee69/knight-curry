const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

async function compressImage(inputPath, outputPath, targetSizeKB = 150) {
  try {
    // Check if file already exists and is under target size
    if (fs.existsSync(outputPath)) {
      const existingSize = fs.statSync(outputPath).size / 1024; // KB
      if (existingSize <= targetSizeKB) {
        console.log(`✓ ${path.basename(outputPath)} already compressed (${existingSize.toFixed(2)} KB)`);
        return true;
      }
    }

    let quality = 90; // Start with high quality
    const minQuality = 10;
    
    while (quality >= minQuality) {
      await sharp(inputPath)
        .resize({ width: 1400, withoutEnlargement: true }) // Resize for compression, don't enlarge
        .webp({ quality }) // Convert to webp
        .toFile(outputPath);

      const size = fs.statSync(outputPath).size / 1024; // KB

      if (size <= targetSizeKB) {
        console.log(`✔ ${path.basename(outputPath)} compressed to ${size.toFixed(2)} KB (quality: ${quality})`);
        return true;
      }

      quality -= 5; // Reduce quality step-by-step
    }

    // If we couldn't reach target, check final size
    const finalSize = fs.statSync(outputPath).size / 1024;
    if (finalSize > targetSizeKB * 1.1) { // Allow 10% tolerance
      console.log(`⚠ ${path.basename(outputPath)} could not reach target size (${finalSize.toFixed(2)} KB). Keeping anyway.`);
    } else {
      console.log(`✔ ${path.basename(outputPath)} compressed to ${finalSize.toFixed(2)} KB (minimum quality reached)`);
    }
    return true;
  } catch (error) {
    console.error(`✗ Error compressing ${inputPath}:`, error.message);
    return false;
  }
}

async function processDirectory(dirPath) {
  const files = fs.readdirSync(dirPath);
  let processed = 0;
  let errors = 0;

  for (const file of files) {
    const filePath = path.join(dirPath, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // Recursively process subdirectories
      const result = await processDirectory(filePath);
      processed += result.processed;
      errors += result.errors;
    } else if (stat.isFile()) {
      const ext = path.extname(file).toLowerCase();
      
      // Only process PNG and JPG files
      if (ext === '.png' || ext === '.jpg' || ext === '.jpeg') {
        const outputPath = filePath.replace(ext, '.webp');
        
        // Skip if WebP already exists and original is still there (might be in progress)
        if (fs.existsSync(outputPath) && fs.existsSync(filePath)) {
          const webpSize = fs.statSync(outputPath).size / 1024;
          if (webpSize <= 150) {
            console.log(`✓ ${file} already has WebP version (${webpSize.toFixed(2)} KB), skipping...`);
            continue;
          }
        }

        const success = await compressImage(filePath, outputPath, 150);
        
        if (success) {
          // Delete original file after successful conversion
          try {
            fs.unlinkSync(filePath);
            console.log(`  → Deleted original: ${file}`);
            processed++;
          } catch (error) {
            console.error(`  ✗ Could not delete ${file}:`, error.message);
            errors++;
          }
        } else {
          errors++;
        }
      }
    }
  }

  return { processed, errors };
}

async function main() {
  const menuDir = path.join(__dirname, 'public', 'assets', 'menu');
  
  if (!fs.existsSync(menuDir)) {
    console.error(`Directory not found: ${menuDir}`);
    process.exit(1);
  }

  console.log(`Starting image compression for: ${menuDir}\n`);
  console.log("=" .repeat(60));

  const result = await processDirectory(menuDir);

  console.log("\n" + "=".repeat(60));
  console.log("Compression Summary:");
  console.log(`  Processed: ${result.processed} images`);
  console.log(`  Errors: ${result.errors}`);
  console.log("=".repeat(60));
}

main().catch(console.error);

