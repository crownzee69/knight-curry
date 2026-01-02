const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Maximum dimensions for menu images (web-optimized)
const MAX_WIDTH = 800;
const MAX_HEIGHT = 800;
const QUALITY = 85; // JPEG quality (for conversion)
const COMPRESSION_LEVEL = 9; // PNG compression level

// Directories to optimize
const directories = [
  'public/assets/menu',
  'public/assets/category',
  'public/assets/images',
];

async function optimizeImage(filePath) {
  try {
    const stats = fs.statSync(filePath);
    const originalSize = stats.size;
    const ext = path.extname(filePath).toLowerCase();
    
    // Skip if already small enough (less than 100KB)
    if (originalSize < 100 * 1024) {
      console.log(`Skipping ${filePath} (already small: ${(originalSize / 1024).toFixed(2)}KB)`);
      return;
    }

    console.log(`Optimizing ${filePath} (${(originalSize / 1024 / 1024).toFixed(2)}MB)...`);

    let image = sharp(filePath);
    const metadata = await image.metadata();
    
    // Calculate new dimensions (maintain aspect ratio)
    let width = metadata.width;
    let height = metadata.height;
    
    if (width > MAX_WIDTH || height > MAX_HEIGHT) {
      if (width > height) {
        width = MAX_WIDTH;
        height = Math.round((metadata.height / metadata.width) * MAX_WIDTH);
      } else {
        height = MAX_HEIGHT;
        width = Math.round((metadata.width / metadata.height) * MAX_HEIGHT);
      }
    }

    // Create backup
    const backupPath = filePath + '.backup';
    if (!fs.existsSync(backupPath)) {
      fs.copyFileSync(filePath, backupPath);
    }

    // Optimize based on file type
    if (ext === '.png') {
      // Optimize PNG with high compression
      await image
        .resize(width, height, {
          fit: 'inside',
          withoutEnlargement: true,
        })
        .png({
          compressionLevel: COMPRESSION_LEVEL,
          quality: 90,
          palette: true, // Try to use palette if possible
        })
        .toFile(filePath + '.optimized');
    } else if (ext === '.jpg' || ext === '.jpeg') {
      // Optimize JPEG
      await image
        .resize(width, height, {
          fit: 'inside',
          withoutEnlargement: true,
        })
        .jpeg({
          quality: QUALITY,
          progressive: true,
          mozjpeg: true,
        })
        .toFile(filePath + '.optimized');
    } else {
      console.log(`Skipping ${filePath} (unsupported format: ${ext})`);
      return;
    }

    // Replace original with optimized
    const optimizedStats = fs.statSync(filePath + '.optimized');
    const newSize = optimizedStats.size;
    const savings = ((originalSize - newSize) / originalSize * 100).toFixed(1);

    if (newSize < originalSize) {
      fs.renameSync(filePath + '.optimized', filePath);
      console.log(`✓ Optimized ${path.basename(filePath)}: ${(originalSize / 1024 / 1024).toFixed(2)}MB → ${(newSize / 1024 / 1024).toFixed(2)}MB (${savings}% reduction)`);
    } else {
      // If optimization made it larger, keep original
      fs.unlinkSync(filePath + '.optimized');
      console.log(`✗ Skipped ${path.basename(filePath)} (optimization made it larger)`);
    }
  } catch (error) {
    console.error(`Error optimizing ${filePath}:`, error.message);
    // Clean up optimized file if it exists
    if (fs.existsSync(filePath + '.optimized')) {
      fs.unlinkSync(filePath + '.optimized');
    }
  }
}

async function processDirectory(dir) {
  if (!fs.existsSync(dir)) {
    console.log(`Directory ${dir} does not exist, skipping...`);
    return;
  }

  const files = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const file of files) {
    const filePath = path.join(dir, file.name);
    
    if (file.isDirectory()) {
      await processDirectory(filePath);
    } else if (file.isFile()) {
      const ext = path.extname(file.name).toLowerCase();
      if (['.png', '.jpg', '.jpeg'].includes(ext)) {
        await optimizeImage(filePath);
      }
    }
  }
}

async function main() {
  console.log('Starting image optimization...\n');
  
  for (const dir of directories) {
    console.log(`Processing directory: ${dir}`);
    await processDirectory(dir);
    console.log('');
  }
  
  console.log('Image optimization complete!');
  console.log('\nNote: Original images are backed up with .backup extension');
  console.log('You can remove .backup files after verifying the optimized images look good.');
}

main().catch(console.error);

