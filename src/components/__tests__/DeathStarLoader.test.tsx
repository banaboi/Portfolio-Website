import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import DeathStarLoader from '../DeathStarLoader'

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
  },
}))

describe('DeathStarLoader Component', () => {
  it('renders without crashing', () => {
    render(<DeathStarLoader />)
    
    // Should render the loader container
    const loader = document.querySelector('.death-star-loader')
    expect(loader).toBeInTheDocument()
  })

  it('displays default loading message', () => {
    render(<DeathStarLoader />)
    
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('displays custom message when provided', () => {
    const customMessage = 'Transmitting to the Jedi Council...'
    render(<DeathStarLoader message={customMessage} />)
    
    expect(screen.getByText(customMessage)).toBeInTheDocument()
  })

  it('applies custom size', () => {
    const customSize = 100
    render(<DeathStarLoader size={customSize} />)
    
    // Check if the main Death Star sphere has the correct size
    const deathStarSphere = document.querySelector('.death-star-loader > div')
    expect(deathStarSphere).toHaveStyle({
      width: `${customSize}px`,
      height: `${customSize}px`,
    })
  })

  it('applies custom className', () => {
    const customClass = 'custom-loader'
    render(<DeathStarLoader className={customClass} />)
    
    const loader = document.querySelector('.death-star-loader')
    expect(loader).toHaveClass(customClass)
  })

  it('uses CSS custom properties for color by default', () => {
    render(<DeathStarLoader />)
    
    const message = screen.getByText('Loading...')
    expect(message).toHaveStyle({
      color: 'var(--accent-primary)',
    })
  })

  it('applies custom color when provided', () => {
    const customColor = '#ff0000'
    render(<DeathStarLoader color={customColor} />)
    
    const message = screen.getByText('Loading...')
    expect(message).toHaveStyle({
      color: customColor,
    })
  })

  it('has proper accessibility attributes', () => {
    render(<DeathStarLoader message="Loading content" />)
    
    // The component should be accessible
    const loader = document.querySelector('.death-star-loader')
    expect(loader).toBeInTheDocument()
    
    // Message should be readable by screen readers
    const message = screen.getByText('Loading content')
    expect(message).toBeInTheDocument()
  })

  it('renders Death Star visual elements', () => {
    render(<DeathStarLoader />)
    
    // Should have the main sphere container
    const mainContainer = document.querySelector('.death-star-loader > div')
    expect(mainContainer).toBeInTheDocument()
    
    // Should have multiple child elements (superlaser, surface details, orbital rings)
    const childElements = mainContainer?.children
    expect(childElements?.length).toBeGreaterThan(1)
  })

  it('handles different sizes correctly', () => {
    const { rerender } = render(<DeathStarLoader size={40} />)
    
    let deathStarSphere = document.querySelector('.death-star-loader > div')
    expect(deathStarSphere).toHaveStyle({ width: '40px', height: '40px' })
    
    rerender(<DeathStarLoader size={120} />)
    
    deathStarSphere = document.querySelector('.death-star-loader > div')
    expect(deathStarSphere).toHaveStyle({ width: '120px', height: '120px' })
  })

  it('maintains proper structure for animations', () => {
    render(<DeathStarLoader />)
    
    // Should have the main container with proper structure for CSS animations
    const loader = document.querySelector('.death-star-loader')
    expect(loader).toBeInTheDocument()
    
    // Should have nested structure for Death Star elements
    const mainSphere = loader?.querySelector('div')
    expect(mainSphere).toBeInTheDocument()
  })
})
