import React, { useState, useEffect } from 'react'

interface TypeWriterProps {
  text: string
  delay?: number
  className?: string
  onComplete?: () => void
}

const TypeWriter: React.FC<TypeWriterProps> = ({ 
  text, 
  delay = 150, 
  className = '', 
  onComplete 
}) => {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, delay)

      return () => clearTimeout(timeout)
    } else if (onComplete) {
      onComplete()
    }
  }, [currentIndex, text, delay, onComplete])

  // Cursor blinking effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 530)

    return () => clearInterval(cursorInterval)
  }, [])

  return (
    <span className={`typewriter ${className}`}>
      <span dangerouslySetInnerHTML={{ __html: displayText }} />
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
}

export default TypeWriter
