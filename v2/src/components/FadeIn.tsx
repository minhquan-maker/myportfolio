import { motion } from 'framer-motion'
import type { MotionProps } from 'framer-motion'
import type { ReactNode } from 'react'

interface FadeInProps extends Omit<MotionProps, 'children'> {
  children: ReactNode
  delay?: number
  duration?: number
  x?: number
  y?: number
  className?: string
}

function FadeIn({
  children,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  className,
  ...props
}: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '50px', amount: 0 }}
      transition={{
        delay,
        duration,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export default FadeIn
