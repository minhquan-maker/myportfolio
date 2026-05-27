import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import type { MotionValue } from 'framer-motion'

interface AnimatedTextProps {
  text: string
  className?: string
  style?: React.CSSProperties
}

function AnimatedText({ text, className, style }: AnimatedTextProps) {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  })

  const characters = text.split('')
  const total = characters.length

  return (
    <p ref={ref} className={className} style={style}>
      {characters.map((char, i) => {
        const start = i / total
        const end = (i + 1) / total
        return (
          <CharSpan
            key={i}
            scrollYProgress={scrollYProgress}
            charStart={start}
            charEnd={end}
            char={char}
          />
        )
      })}
    </p>
  )
}

interface CharSpanProps {
  scrollYProgress: MotionValue<number>
  charStart: number
  charEnd: number
  char: string
}

function CharSpan({ scrollYProgress, charStart, charEnd, char }: CharSpanProps) {
  const opacity = useTransform(scrollYProgress, [charStart, charEnd], [0.2, 1])
  return (
    <span style={{ position: 'relative', display: 'inline-block' }}>
      <motion.span style={{ opacity, display: 'inline-block' }}>
        {char === ' ' ? ' ' : char}
      </motion.span>
    </span>
  )
}

export default AnimatedText
