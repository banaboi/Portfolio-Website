import React, { memo } from 'react'
import { motion } from 'framer-motion'

interface DeathStarLoaderProps {
    size?: number
    color?: string
    message?: string
    className?: string
}

const DeathStarLoader: React.FC<DeathStarLoaderProps> = memo(({
    size = 60,
    color = 'var(--accent-primary)',
    message = 'Loading...',
    className = ''
}) => {
    return (
        <motion.div
            className={`death-star-loader ${className}`}
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2rem',
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div
                style={{
                    width: size,
                    height: size,
                    position: 'relative',
                    margin: '20px auto',
                }}
            >
            {/* Main sphere */}
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    border: `2px solid ${color}`,
                    position: 'relative',
                    animation: 'death-star-rotate 3s linear infinite',
                    background: `radial-gradient(circle at 30% 30%, rgba(0, 255, 65, 0.1), transparent 50%)`,
                    boxShadow: `0 0 20px ${color}40`,
                }}
            >
                {/* Superlaser dish */}
                <div
                    style={{
                        width: '20%',
                        height: '20%',
                        borderRadius: '50%',
                        border: `1px solid ${color}`,
                        position: 'absolute',
                        top: '25%',
                        left: '25%',
                        background: color,
                        boxShadow: `0 0 10px ${color}`,
                        animation: 'superlaser-pulse 1.5s ease-in-out infinite',
                    }}
                />

                {/* Surface details */}
                <div
                    style={{
                        width: '8%',
                        height: '8%',
                        borderRadius: '50%',
                        border: `1px solid ${color}80`,
                        position: 'absolute',
                        top: '60%',
                        left: '70%',
                    }}
                />
                <div
                    style={{
                        width: '6%',
                        height: '6%',
                        borderRadius: '50%',
                        border: `1px solid ${color}60`,
                        position: 'absolute',
                        top: '15%',
                        left: '65%',
                    }}
                />
                <div
                    style={{
                        width: '4%',
                        height: '4%',
                        borderRadius: '50%',
                        border: `1px solid ${color}40`,
                        position: 'absolute',
                        top: '75%',
                        left: '20%',
                    }}
                />
            </div>

            {/* Orbital rings */}
            <div
                style={{
                    width: '120%',
                    height: '120%',
                    borderRadius: '50%',
                    border: `1px solid ${color}30`,
                    position: 'absolute',
                    top: '-10%',
                    left: '-10%',
                    animation: 'orbital-ring 4s linear infinite reverse',
                }}
            />
            <div
                style={{
                    width: '140%',
                    height: '140%',
                    borderRadius: '50%',
                    border: `1px solid ${color}20`,
                    position: 'absolute',
                    top: '-20%',
                    left: '-20%',
                    animation: 'orbital-ring 6s linear infinite',
                }}
            />
            </div>

            {/* Loading message */}
            <motion.p
                style={{
                    marginTop: '1rem',
                    color: color,
                    fontFamily: '"Space Mono", monospace',
                    fontSize: '1rem',
                    textShadow: `0 0 5px ${color}`,
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
            >
                {message}
            </motion.p>
        </motion.div>
    )
})

DeathStarLoader.displayName = 'DeathStarLoader'

export default DeathStarLoader
