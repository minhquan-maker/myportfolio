import { motion } from 'framer-motion'

interface ContactButtonProps {
  label?: string
  className?: string
}

function ContactButton({
  label = 'Contact Me',
  className = '',
}: ContactButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      style={{
        background: 'linear-gradient(123deg, #18001F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
        boxShadow: '0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset',
        border: '2px solid white',
        borderRadius: '9999px',
        outline: '2px solid white',
        outlineOffset: '-3px',
        color: 'white',
        fontFamily: "'Kanit', sans-serif",
        fontWeight: 500,
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        cursor: 'pointer',
        padding: '12px 32px',
        fontSize: '0.75rem',
      }}
      className={className}
      onClick={() => {
        const contactSection = document.getElementById('contact')
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' })
        } else {
          window.location.href = 'mailto:minhquan.nguyen-2@student.uts.edu.au'
        }
      }}
    >
      {label}
    </motion.button>
  )
}

export default ContactButton
