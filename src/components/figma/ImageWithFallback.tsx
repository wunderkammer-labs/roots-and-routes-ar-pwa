import React, { useState } from 'react';

export type ImageWithFallbackProps = {
  src: string;
  alt: string;
  fallbackSrc: string;
  className?: string;
  aspectRatio?: string;
};

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  fallbackSrc,
  className,
  aspectRatio,
}) => {
  const [currentSrc, setCurrentSrc] = useState(src);

  return (
    <figure
      className={className}
      style={{
        margin: 0,
        width: '100%',
        overflow: 'hidden',
        borderRadius: 'var(--radius-base)',
        background: 'var(--color-surface-muted)',
        aspectRatio,
      }}
    >
      <img
        src={currentSrc}
        alt={alt}
        onError={() => {
          if (currentSrc !== fallbackSrc) {
            setCurrentSrc(fallbackSrc);
          }
        }}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
    </figure>
  );
};

export default ImageWithFallback;
