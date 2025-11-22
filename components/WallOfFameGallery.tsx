'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface WallOfFameGalleryProps {
  limit?: number; // Optional limit for number of images to show
  showAll?: boolean; // If true, show all images
}

export default function WallOfFameGallery({ limit, showAll = false }: WallOfFameGalleryProps) {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchImages() {
      try {
        const response = await fetch('/api/wall-of-fame-images');
        const data = await response.json();
        setImages(data.images || []);
      } catch (error) {
        console.error('Error fetching wall of fame images:', error);
        setImages([]);
      } finally {
        setLoading(false);
      }
    }

    fetchImages();
  }, []);

  if (loading) {
    const loadingGridCols = showAll 
      ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5' 
      : 'grid-cols-2 sm:grid-cols-2 md:grid-cols-4';
    return (
      <div className={`grid ${loadingGridCols} gap-4`}>
        {Array.from({ length: showAll ? 20 : (limit || 4) }).map((_, i) => (
          <div
            key={i}
            className="aspect-square rounded-lg overflow-hidden bg-neutral-200 animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="text-center py-12 text-neutral-500">
        <ion-icon name="image-outline" className="text-5xl mb-4 opacity-50"></ion-icon>
        <p className="text-lg">No images yet. Add images to the folder to see them here!</p>
        <p className="text-sm mt-2 opacity-75">Folder: public/assets/late-night-wall-of-fame/</p>
      </div>
    );
  }

  const displayImages = showAll ? images : (limit ? images.slice(0, limit) : images.slice(0, 4));
  
  // Adjust grid columns based on number of images and showAll flag
  const gridCols = showAll 
    ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5' 
    : 'grid-cols-2 sm:grid-cols-2 md:grid-cols-4';

  return (
    <div className={`grid ${gridCols} gap-4`}>
      {displayImages.map((imagePath, index) => {
        const fileName = imagePath.split('/').pop() || `image-${index}`;
        return (
          <div
            key={imagePath}
            className="aspect-square rounded-lg overflow-hidden relative group cursor-pointer transition-all hover:scale-105 shadow-lg"
            style={{
              border: '2px solid rgba(220, 38, 38, 0.1)',
            }}
          >
            <Image
              src={imagePath}
              alt={`Late Night Wall of Fame - ${fileName}`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
              quality={85}
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <ion-icon name="expand-outline" className="text-2xl text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg"></ion-icon>
            </div>
          </div>
        );
      })}
    </div>
  );
}
