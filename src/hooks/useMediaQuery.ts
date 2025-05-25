import { useState, useEffect } from 'react';

interface MediaQueryOptions {
  mobile: number;
  tablet: number;
}

const defaultOptions: MediaQueryOptions = {
  mobile: 900,
  tablet: 1050
};

export const useMediaQuery = (options: Partial<MediaQueryOptions> = {}) => {
  const { mobile, tablet } = { ...defaultOptions, ...options };
  
  const [windowSize, setWindowSize] = useState(() => ({
    width: window.innerWidth,
    height: window.innerHeight
  }));

  const isMobile = windowSize.width < mobile;
  const isTablet = windowSize.width < tablet && windowSize.height < 1400;

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight
        });
      }, 100); // Reduced debounce time
    };

    window.addEventListener('resize', handleResize, { passive: true });
    
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  return { isMobile, isTablet, windowSize };
};
