import React, { useState, useRef, useEffect, memo } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  placeholder?: string;
  loading?: 'lazy' | 'eager';
  onLoad?: () => void;
  onError?: () => void;
}

const OptimizedImage: React.FC<OptimizedImageProps> = memo(({
  src,
  alt,
  className = '',
  style = {},
  placeholder,
  loading = 'lazy',
  onLoad,
  onError
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = imgRef.current;
    if (!img || loading === 'eager') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Image is in viewport, load it
            img.src = src;
            observer.unobserve(img);
          }
        });
      },
      {
        rootMargin: '50px' // Start loading 50px before image comes into view
      }
    );

    observer.observe(img);

    return () => observer.disconnect();
  }, [src, loading]);

  const handleLoad = () => {
    setImageLoaded(true);
    if (onLoad) onLoad();
  };

  const handleError = () => {
    setImageError(true);
    if (onError) onError();
  };

  const imageStyle: React.CSSProperties = {
    ...style,
    opacity: imageLoaded ? 1 : 0,
    transition: 'opacity 0.3s ease',
  };

  if (imageError) {
    return (
      <div 
        className={`image-error ${className}`}
        style={style}
        aria-label={`Failed to load image: ${alt}`}
      >
        <span>❌ Image failed to load</span>
      </div>
    );
  }

  return (
    <div className={`optimized-image-container ${className}`} style={style}>
      {!imageLoaded && placeholder && (
        <div 
          className="image-placeholder"
          style={{
            ...style,
            background: `url(${placeholder}) center/cover`,
            filter: 'blur(5px)',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%'
          }}
        />
      )}
      <img
        ref={imgRef}
        src={loading === 'eager' ? src : undefined}
        alt={alt}
        style={imageStyle}
        onLoad={handleLoad}
        onError={handleError}
        loading={loading}
        decoding="async"
      />
    </div>
  );
});

OptimizedImage.displayName = 'OptimizedImage';

export default OptimizedImage;
