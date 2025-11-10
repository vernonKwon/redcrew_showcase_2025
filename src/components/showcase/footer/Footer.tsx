import Image from 'next/image'
import LogoImage from '@/asset/REWIND_NUGGI.png'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <Image
            src={LogoImage}
            alt="REWIND - RED CREW 10th Anniversary Showcase"
            width={600}
            height={160}
          />
        </div>

        <p className="footer-copyright">
          © {currentYear} RED CREW. All rights reserved. | 10 Years of Passion,
          One Final Stage.
        </p>
      </div>
    </footer>
  )
}
