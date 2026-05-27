import { motion } from 'framer-motion'

interface LiveProjectButtonProps {
  label?: string
  className?: string
  onClick?: () => void
}

function LiveProjectButton({
  label = 'Live Project',
  className = '',
  onClick,
}: LiveProjectButtonProps) {
  return (
    <motion.button
      whileHover={{ backgroundColor: 'rgba(215, 226, 234, 0.1)' }}
      style={{
        border: '2px solid #D7E2EA',
        borderRadius: '9999px',
        color: '#D7E2EA',
        fontFamily: "'Kanit', sans-serif",
        fontWeight: 500,
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        cursor: 'pointer',
        padding: '12px 32px',
        fontSize: '0.875rem',
        backgroundColor: 'transparent',
        transition: 'background-color 0.2s ease',
      }}
      className={className}
      onClick={onClick}
    >
      {label}
    </motion.button>
  )
}

export default LiveProjectButton
