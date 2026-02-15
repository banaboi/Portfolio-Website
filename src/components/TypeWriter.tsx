import React, { useState, useEffect, memo, useMemo, useCallback } from 'react'

interface TypeWriterProps {
  text: string
  delay?: number
  className?: string
  onComplete?: () => void
}

const TypeWriter: React.FC<TypeWriterProps> = memo(({ 
  text, 
  delay = 150, 
  className = '', 
  onComplete 
}) => {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showCursor, setShowCursor] = useState(true)

  // Memoize the clean text to prevent recalculation
  const cleanText = useMemo(() => {
    return text.replace(/<(?!\/?b\b)[^>]*>/gi, '');
  }, [text]);

  const updateDisplayText = useCallback(() => {
    if (currentIndex < cleanText.length) {
      setDisplayText(prev => prev + cleanText[currentIndex])
      setCurrentIndex(prev => prev + 1)
    } else if (onComplete) {
      onComplete()
    }
  }, [currentIndex, cleanText, onComplete]);

  useEffect(() => {
    if (currentIndex < cleanText.length) {
      const timeout = setTimeout(updateDisplayText, delay)
      return () => clearTimeout(timeout)
    }
  }, [currentIndex, cleanText.length, delay, updateDisplayText])

  // Cursor blinking with setInterval (more efficient than rAF for infrequent updates)
  useEffect(() => {
    const intervalId = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);
    
    return () => clearInterval(intervalId);
  }, []);

  return (
    <span className={`typewriter ${className}`}>
      {displayText.includes('<b>') ? (
        <span dangerouslySetInnerHTML={{ __html: displayText.replace(/<(?!\/?b\b)[^>]*>/gi, '') }} />
      ) : (
        <span>{displayText}</span>
      )}
      <span 
        className={`typewriter-cursor ${showCursor ? 'visible' : 'hidden'}`}
        style={{
          opacity: showCursor ? 1 : 0,
          transition: 'opacity 0.1s ease',
          color: 'var(--accent-primary)',
          fontWeight: 'normal'
        }}
      >
        |
      </span>
    </span>
  )
});

TypeWriter.displayName = 'TypeWriter';

export default TypeWriter
