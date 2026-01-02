import { readdir, stat } from 'fs/promises';
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
    
    // Get modification time of the folder to create a cache key
    const folderStat = await stat(folderPath);
    const lastModified = folderStat.mtime.getTime();
    
    // Create ETag from folder modification time
    const etag = `"${lastModified}"`;
    
    return NextResponse.json(
      { images: imageFiles },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
          'ETag': etag,
        },
      }
    );
  } catch (error) {
    console.error('Error reading wall of fame images:', error);
    return NextResponse.json(
      { images: [] },
      {
        status: 200,
        headers: {
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
        },
      }
    );
  }
}

