import FadeIn from './FadeIn'
import Magnet from './Magnet'
import ContactButton from './ContactButton'
import Navbar from './Navbar'

const PORTRAIT_URL =
  'https://shrug-person-78902957.figma.site/_components/v2/d24c01ad3a56fc65e942a1f501eb73db42d7cf9a/Rectangle_40443.81459862.png'

function HeroSection() {
  return (
    <section
      id="hero"
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        background: '#0C0C0C',
      }}
    >
      <Navbar />

      {/* Hero Heading */}
      <FadeIn delay={0.15} y={40}>
        <div style={{ overflow: 'hidden', width: '100%' }}>
          <h1
            className="hero-heading"
            style={{
              fontFamily: "'Kanit', sans-serif",
              fontWeight: 900,
              textTransform: 'uppercase',
              letterSpacing: '-0.03em',
              lineHeight: 1,
              whiteSpace: 'nowrap',
              width: '100%',
              fontSize: 'clamp(14vw, 17.5vw, 17.5vw)',
              marginTop: '1.5rem',
              textAlign: 'center',
            }}
          >
            Hi, i&apos;m Quan
          </h1>
        </div>
      </FadeIn>

      {/* Portrait Image */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          bottom: 0,
        }}
        className="hidden sm:block"
      >
        <FadeIn delay={0.6} y={30}>
          <Magnet padding={150} strength={3}>
            <img
              src={PORTRAIT_URL}
              alt="Quan portrait"
              style={{
                width: 'clamp(280px, 40vw, 520px)',
                height: 'auto',
                objectFit: 'cover',
              }}
            />
          </Magnet>
        </FadeIn>
      </div>

      {/* Mobile portrait */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 10,
          display: 'none',
        }}
        className="sm:hidden"
      >
        <FadeIn delay={0.6} y={30}>
          <Magnet padding={150} strength={3}>
            <img
              src={PORTRAIT_URL}
              alt="Quan portrait"
              style={{
                width: 'clamp(200px, 60vw, 280px)',
                height: 'auto',
                objectFit: 'cover',
              }}
            />
          </Magnet>
        </FadeIn>
      </div>

      {/* Bottom Bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          padding: '0 40px 40px',
          paddingBottom: 'clamp(1.75rem, 5vw, 2.5rem)',
          marginTop: 'auto',
          zIndex: 20,
        }}
        className="sm:px-6 md:px-10 pb-7 sm:pb-8 md:pb-10 px-6"
      >
        <FadeIn delay={0.35} y={20}>
          <p
            style={{
              color: '#D7E2EA',
              fontFamily: "'Kanit', sans-serif",
              fontWeight: 300,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              lineHeight: 1.5,
              maxWidth: 'clamp(160px, 20vw, 260px)',
              fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)',
            }}
          >
            a 3d creator driven by crafting striking and unforgettable projects
          </p>
        </FadeIn>

        <FadeIn delay={0.5} y={20}>
          <ContactButton />
        </FadeIn>
      </div>
    </section>
  )
}

export default HeroSection
