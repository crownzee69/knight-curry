const sharp = require('sharp');
const path = require('path');

const offersDir = path.join(__dirname, '../public/assets/offers');
const images = ['1.webp', '2.webp', '3.webp'];

async function checkDimensions() {
  console.log('\n📐 Offer Image Dimensions:\n');
  
  const results = [];
  
  for (const img of images) {
    const imgPath = path.join(offersDir, img);
    try {
      const metadata = await sharp(imgPath).metadata();
      results.push({
        file: img,
        width: metadata.width,
        height: metadata.height,
        format: metadata.format
      });
      console.log(`${img}: ${metadata.width} x ${metadata.height} pixels`);
    } catch (error) {
      console.error(`Error reading ${img}:`, error.message);
    }
  }
  
  if (results.length > 0) {
    const widths = results.map(r => r.width);
    const heights = results.map(r => r.height);
    const avgWidth = Math.round(widths.reduce((a, b) => a + b) / widths.length);
    const avgHeight = Math.round(heights.reduce((a, b) => a + b) / heights.length);
    const aspectRatio = (avgWidth / avgHeight).toFixed(2);
    
    console.log('\n✅ Recommended size for future images:');
    console.log(`   Width: ${avgWidth}px`);
    console.log(`   Height: ${avgHeight}px`);
    console.log(`   Aspect Ratio: ${aspectRatio}:1`);
    console.log(`   Format: WebP (recommended for best compression)`);
    console.log(`   Target file size: Under 300KB`);
    console.log('\n💡 For best results, use images with:');
    console.log(`   - Width: ${avgWidth}px (or similar, e.g., 1920px)`);
    console.log(`   - Height: ${avgHeight}px (or similar, e.g., 1080px)`);
    console.log(`   - Aspect ratio: ~${aspectRatio}:1 (16:9 or 21:9 works well)`);
  }
}

checkDimensions().catch(console.error);

