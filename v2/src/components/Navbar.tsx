import FadeIn from './FadeIn'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

function Navbar() {
  const handleClick = (href: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const id = href.replace('#', '')
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <FadeIn delay={0} y={-20}>
      <nav
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '24px 40px',
          paddingTop: '24px',
          paddingBottom: '24px',
        }}
        className="px-6 md:px-10 pt-6 md:pt-8"
      >
        <span
          style={{
            color: '#D7E2EA',
            fontFamily: "'Kanit', sans-serif",
            fontWeight: 700,
            fontSize: '1.2rem',
            letterSpacing: '0.05em',
          }}
        >
          QUAN
        </span>
        <ul style={{ display: 'flex', gap: 'clamp(1.5rem, 4vw, 3rem)', listStyle: 'none' }}>
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                onClick={handleClick(link.href)}
                style={{
                  color: '#D7E2EA',
                  fontFamily: "'Kanit', sans-serif",
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  fontSize: 'clamp(0.875rem, 1.5vw, 1.4rem)',
                  transition: 'opacity 0.2s ease',
                  opacity: 1,
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.7')}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </FadeIn>
  )
}

export default Navbar
