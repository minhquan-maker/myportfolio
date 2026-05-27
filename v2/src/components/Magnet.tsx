import { useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface MagnetProps {
  children: ReactNode
  padding?: number
  strength?: number
  className?: string
}

function Magnet({
  children,
  padding = 150,
  strength = 3,
  className,
}: MagnetProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = ref.current!.getBoundingClientRect()
    const centerX = left + width / 2
    const centerY = top + height / 2

    const distX = e.clientX - centerX
    const distY = e.clientY - centerY

    const distance = Math.sqrt(distX * distX + distY * distY)

    if (distance < padding + Math.max(width, height) / 2) {
      setPosition({
        x: distX / strength,
        y: distY / strength,
      })
    } else {
      setPosition({ x: 0, y: 0 })
    }
  }

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{
        type: 'spring',
        stiffness: 200,
        damping: 20,
      }}
      style={{ willChange: 'transform' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default Magnet
