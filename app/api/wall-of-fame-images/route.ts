import { readdir } from 'fs/promises';
import { join } from 'path';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const folderPath = join(process.cwd(), 'public', 'assets', 'late-night-wall-of-fame');
    const files = await readdir(folderPath);
    
    // Filter for image files only
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];
    const imageFiles = files
      .filter(file => {
        const ext = file.toLowerCase().substring(file.lastIndexOf('.'));
        return imageExtensions.includes(ext);
      })
      .sort() // Sort alphabetically
      .map(file => `/assets/late-night-wall-of-fame/${file}`);
    
    return NextResponse.json({ images: imageFiles });
  } catch (error) {
    console.error('Error reading wall of fame images:', error);
    return NextResponse.json({ images: [] }, { status: 200 });
  }
}

