#!/usr/bin/env python3
import os
from PIL import Image
import sys

def get_file_size_mb(filepath):
    """Get file size in MB"""
    return os.path.getsize(filepath) / (1024 * 1024)

def compress_image(filepath, max_size_kb=150):
    """Compress image to be under max_size_kb"""
    max_size_bytes = max_size_kb * 1024
    
    # Get current file size
    current_size = os.path.getsize(filepath)
    if current_size <= max_size_bytes:
        print(f"✓ {filepath} already under {max_size_kb}KB ({current_size/1024:.1f}KB)")
        return True
    
    print(f"Compressing {filepath} ({current_size/1024:.1f}KB -> target: {max_size_kb}KB)")
    
    try:
        # Open image
        img = Image.open(filepath)
        original_format = img.format
        original_mode = img.mode
        
        # Convert RGBA to RGB if necessary for JPEG
        if img.mode in ('RGBA', 'LA', 'P'):
            # For PNG with transparency, keep as PNG but optimize
            if img.mode == 'RGBA':
                # Create white background
                background = Image.new('RGB', img.size, (255, 255, 255))
                background.paste(img, mask=img.split()[-1])  # Use alpha channel as mask
                img = background
            elif img.mode == 'P':
                img = img.convert('RGB')
        
        # Save as temporary file first
        temp_path = filepath + '.tmp'
        
        # Try different quality levels
        quality = 85
        min_quality = 50
        
        while quality >= min_quality:
            # Save with current quality
            if original_format == 'PNG' or filepath.lower().endswith('.png'):
                # For PNG, use optimize and compress_level
                img.save(temp_path, 'PNG', optimize=True, compress_level=9)
            else:
                # For JPEG
                img.save(temp_path, 'JPEG', quality=quality, optimize=True)
            
            # Check if file size is acceptable
            new_size = os.path.getsize(temp_path)
            if new_size <= max_size_bytes:
                # Replace original with compressed version
                os.replace(temp_path, filepath)
                print(f"  ✓ Compressed to {new_size/1024:.1f}KB (quality: {quality})")
                return True
            
            # If still too large and quality is low, try resizing
            if quality == min_quality and new_size > max_size_bytes:
                # Calculate resize ratio needed
                ratio = (max_size_bytes / new_size) ** 0.5
                new_width = int(img.width * ratio * 0.95)  # Slightly more aggressive
                new_height = int(img.height * ratio * 0.95)
                img = img.resize((new_width, new_height), Image.Resampling.LANCZOS)
                print(f"  Resizing to {new_width}x{new_height}")
                quality = 85  # Reset quality after resize
                continue
            
            quality -= 5
        
        # Final attempt with maximum compression
        if original_format == 'PNG' or filepath.lower().endswith('.png'):
            img.save(temp_path, 'PNG', optimize=True, compress_level=9)
        else:
            img.save(temp_path, 'JPEG', quality=min_quality, optimize=True)
        
        new_size = os.path.getsize(temp_path)
        if new_size <= max_size_bytes:
            os.replace(temp_path, filepath)
            print(f"  ✓ Compressed to {new_size/1024:.1f}KB (maximum compression)")
            return True
        else:
            # Even after maximum compression, still too large - resize further
            while new_size > max_size_bytes:
                img = img.resize((int(img.width * 0.9), int(img.height * 0.9)), Image.Resampling.LANCZOS)
                if original_format == 'PNG' or filepath.lower().endswith('.png'):
                    img.save(temp_path, 'PNG', optimize=True, compress_level=9)
                else:
                    img.save(temp_path, 'JPEG', quality=min_quality, optimize=True)
                new_size = os.path.getsize(temp_path)
            
            os.replace(temp_path, filepath)
            print(f"  ✓ Compressed to {new_size/1024:.1f}KB (with resizing)")
            return True
            
    except Exception as e:
        print(f"  ✗ Error compressing {filepath}: {e}")
        if os.path.exists(temp_path):
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
                    if compress_image(filepath):
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

