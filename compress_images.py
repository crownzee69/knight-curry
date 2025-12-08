#!/usr/bin/env python3
import os
from PIL import Image
import sys

def compress_image(filepath, max_size_kb=150):
    """Compress image to be under max_size_kb while maintaining sharpness and quality"""
    max_size_bytes = max_size_kb * 1024
    
    # Get current file size
    current_size = os.path.getsize(filepath)
    if current_size <= max_size_bytes:
        print(f"✓ {filepath} already under {max_size_kb}KB ({current_size/1024:.1f}KB)")
        return True
    
    print(f"Compressing {filepath} ({current_size/1024:.1f}KB -> target: {max_size_kb}KB)")
    
    try:
        # Open image and preserve original dimensions
        img = Image.open(filepath)
        original_format = img.format
        original_mode = img.mode
        original_size = img.size
        
        # Keep original mode for better compression (especially for palette images)
        # Only convert if absolutely necessary
        needs_conversion = False
        if img.mode == 'RGBA':
            # RGBA needs conversion for PNG compression
            needs_conversion = True
        # Keep 'P' (palette) mode - it compresses much better than RGB
        
        temp_path = filepath + '.tmp'
        
        # Strategy: PNG optimization with maximum compression, minimal/no resizing
        # Keep original format to maintain compatibility with codebase
        if original_format == 'PNG' or filepath.lower().endswith('.png'):
            # Try PNG with maximum compression (no resizing first)
            # Use compress_level=9 (maximum) with optimize=True
            # Convert RGBA if needed, but keep palette mode
            save_img = img
            if needs_conversion and img.mode == 'RGBA':
                background = Image.new('RGB', img.size, (255, 255, 255))
                background.paste(img, mask=img.split()[-1])
                save_img = background
            save_img.save(temp_path, 'PNG', optimize=True, compress_level=9)
            current_temp_size = os.path.getsize(temp_path)
            
            if current_temp_size <= max_size_bytes:
                os.replace(temp_path, filepath)
                print(f"  ✓ Compressed to {current_temp_size/1024:.1f}KB (PNG max compression, no resize - sharp!)")
                return True
            
            # If still too large, calculate smart resize needed
            # PNG compression alone isn't enough, so we need minimal resizing
            # Calculate resize ratio needed to get under limit
            # Use square root of size ratio for area-based calculation
            ratio = (max_size_bytes / current_temp_size) ** 0.5
            # Start with calculated ratio, but allow up to 20-25% resize to maintain good quality
            # Be more aggressive initially to get closer to target
            resize_ratio = min(0.90, max(0.70, ratio * 0.98))
            
            # Iteratively resize until we're under limit
            # Use LANCZOS resampling (highest quality resampling algorithm)
            # Try from calculated ratio down to 60% (minimum for acceptable sharpness)
            min_ratio = 0.60
            max_iterations = 30  # Prevent infinite loops
            
            iteration = 0
            while resize_ratio >= min_ratio and iteration < max_iterations:
                new_width = int(original_size[0] * resize_ratio)
                new_height = int(original_size[1] * resize_ratio)
                
                # Skip if dimensions are too small (would cause quality loss)
                if new_width < 100 or new_height < 100:
                    break
                
                try:
                    # Use the same image object (preserving mode)
                    resize_img = save_img if 'save_img' in locals() else img
                    img_resized = resize_img.resize((new_width, new_height), Image.Resampling.LANCZOS)
                    img_resized.save(temp_path, 'PNG', optimize=True, compress_level=9)
                    new_size = os.path.getsize(temp_path)
                    
                    if new_size <= max_size_bytes:
                        os.replace(temp_path, filepath)
                        print(f"  ✓ Compressed to {new_size/1024:.1f}KB (resized to {new_width}x{new_height}, {resize_ratio*100:.1f}% - maintains sharpness)")
                        return True
                except Exception as e:
                    # If resize fails, try next ratio
                    pass
                
                # Reduce by 2% each iteration
                resize_ratio *= 0.98
                iteration += 1
        else:
            # For JPEG files
            for quality in range(90, 70, -5):
                img.save(temp_path, 'JPEG', quality=quality, optimize=True)
                new_size = os.path.getsize(temp_path)
                if new_size <= max_size_bytes:
                    os.replace(temp_path, filepath)
                    print(f"  ✓ Compressed to {new_size/1024:.1f}KB (JPEG quality: {quality})")
                    return True
        
        # If we get here, compression failed
        if os.path.exists(temp_path):
            os.remove(temp_path)
        print(f"  ✗ Could not compress {filepath} to under {max_size_kb}KB without significant quality loss")
        return False
            
    except Exception as e:
        print(f"  ✗ Error compressing {filepath}: {e}")
        if 'temp_path' in locals() and os.path.exists(temp_path):
            os.remove(temp_path)
        return False

def main():
    # Directories to process
    directories = [
        'public/assets/menu'
    ]
    
    # Supported image formats
    image_extensions = ['.png', '.jpg', '.jpeg', '.webp']
    
    total_files = 0
    compressed_files = 0
    skipped_files = 0
    error_files = 0
    
    for directory in directories:
        if not os.path.exists(directory):
            print(f"Directory not found: {directory}")
            continue
        
        print(f"\nProcessing {directory}...")
        print("-" * 60)
        
        # Walk through all subdirectories
        for root, dirs, files in os.walk(directory):
            for file in files:
                filepath = os.path.join(root, file)
                file_ext = os.path.splitext(file)[1].lower()
                
                if file_ext in image_extensions:
                    total_files += 1
                    result = compress_image(filepath)
                    if result:
                        compressed_files += 1
                    else:
                        error_files += 1
                else:
                    skipped_files += 1
    
    print("\n" + "=" * 60)
    print("Compression Summary:")
    print(f"  Total image files: {total_files}")
    print(f"  Successfully compressed: {compressed_files}")
    print(f"  Already under limit: {skipped_files}")
    print(f"  Errors: {error_files}")
    print("=" * 60)

if __name__ == '__main__':
    main()
