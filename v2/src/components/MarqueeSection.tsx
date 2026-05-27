import { useEffect, useRef } from 'react'

const GIF_URLS = [
  'https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif',
  'https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif',
  'https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif',
  'https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif',
  'https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif',
  'https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif',
  'https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif',
  'https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif',
  'https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif',
  'https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif',
  'https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif',
  'https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif',
  'https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif',
  'https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif',
  'https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif',
  'https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif',
  'https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif',
  'https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif',
  'https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif',
  'https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif',
  'https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif',
]

const TILE_WIDTH = 420
const TILE_HEIGHT = 270

function MarqueeSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const row1Ref = useRef<HTMLDivElement>(null)
  const row2Ref = useRef<HTMLDivElement>(null)

  const row1Images = [...GIF_URLS.slice(0, 11), ...GIF_URLS.slice(0, 11), ...GIF_URLS.slice(0, 11)]
  const row2Images = [...GIF_URLS.slice(11), ...GIF_URLS.slice(11), ...GIF_URLS.slice(11)]

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !row1Ref.current || !row2Ref.current) return

      const rect = sectionRef.current.getBoundingClientRect()
      const sectionTop = rect.top + window.scrollY
      const offset = (window.scrollY - sectionTop + window.innerHeight) * 0.3

      row1Ref.current.style.transform = `translateX(${offset - 200}px)`
      row2Ref.current.style.transform = `translateX(${-(offset - 200)}px)`
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const imgStyle: React.CSSProperties = {
    width: TILE_WIDTH,
    height: TILE_HEIGHT,
    borderRadius: '16px',
    objectFit: 'cover',
    flexShrink: 0,
    willChange: 'transform',
  }

  return (
    <section
      ref={sectionRef}
      style={{
        background: '#0C0C0C',
        paddingTop: 'clamp(6rem, 8vw, 10rem)',
        paddingBottom: '2.5rem',
      }}
      className="pt-24 sm:pt-32 md:pt-40 pb-10"
    >
      {/* Row 1 */}
      <div style={{ overflow: 'hidden', marginBottom: '12px' }}>
        <div
          ref={row1Ref}
          style={{
            display: 'flex',
            gap: '12px',
            width: 'max-content',
            willChange: 'transform',
          }}
        >
          {row1Images.map((src, i) => (
            <img
              key={`row1-${i}`}
              src={src}
              alt=""
              loading="lazy"
              style={imgStyle}
            />
          ))}
        </div>
      </div>

      {/* Row 2 */}
      <div style={{ overflow: 'hidden' }}>
        <div
          ref={row2Ref}
          style={{
            display: 'flex',
            gap: '12px',
            width: 'max-content',
            willChange: 'transform',
          }}
        >
          {row2Images.map((src, i) => (
            <img
              key={`row2-${i}`}
              src={src}
              alt=""
              loading="lazy"
              style={imgStyle}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default MarqueeSection
