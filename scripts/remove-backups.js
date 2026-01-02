const fs = require('fs');
const path = require('path');

// Remove all backup files
function removeBackups(dir) {
  if (!fs.existsSync(dir)) {
    return;
  }

  const files = fs.readdirSync(dir, { withFileTypes: true });
  let removedCount = 0;
  let totalSize = 0;

  for (const file of files) {
    const filePath = path.join(dir, file.name);

    if (file.isDirectory()) {
      const result = removeBackups(filePath);
      removedCount += result.removedCount;
      totalSize += result.totalSize;
    } else if (file.isFile() && file.name.endsWith('.backup')) {
      const stats = fs.statSync(filePath);
      totalSize += stats.size;
      fs.unlinkSync(filePath);
      removedCount++;
      console.log(`Removed: ${filePath}`);
    }
  }

  return { removedCount, totalSize };
}

const directories = [
  'public/assets/menu',
  'public/assets/category',
  'public/assets/images',
];

console.log('Removing backup files...\n');

let totalRemoved = 0;
let totalSizeFreed = 0;

for (const dir of directories) {
  if (fs.existsSync(dir)) {
    const result = removeBackups(dir);
    totalRemoved += result.removedCount;
    totalSizeFreed += result.totalSize;
  }
}

console.log(`\n✓ Removed ${totalRemoved} backup files`);
console.log(`✓ Freed ${(totalSizeFreed / 1024 / 1024).toFixed(2)} MB`);

