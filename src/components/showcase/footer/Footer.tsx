import { Instagram, Youtube, LucideProps } from 'lucide-react'
import Image from 'next/image'
import LogoImage from '@/asset/REWIND_NUGGI.png'

interface QuickLink {
  href: string
  label: string
}

interface SocialLink {
  icon: React.ComponentType<LucideProps>
  href: string
  className: string
}

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const quickLinks: QuickLink[] = [
    { href: '#about', label: '팀 소개' },
    { href: '#history', label: '10년의 여정' },
    { href: '#showcase', label: '쇼케이스' },
    { href: '#teams', label: '게스트 팀' },
  ]

  const eventInfo: string[] = [
    '2025.12.14 (일)',
    '오후 2:00 - 6:00',
    '중랑구민회관 대공연장',
  ]

  const socialLinks: SocialLink[] = [
    {
      icon: Instagram,
      href: 'https://www.instagram.com/redcrew_korea',
      className: 'hover:text-white',
    },
    {
      icon: Instagram,
      href: 'https://www.instagram.com/red_99_0819',
      className: 'hover:text-white',
    },
    {
      icon: Youtube,
      href: 'https://www.youtube.com/@레드크루',
      className: 'hover:text-white',
    },
  ]

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="footer-logo">
              <Image
                src={LogoImage}
                alt="REWIND - RED CREW 10th Anniversary Showcase"
                width={150}
                height={40}
              />
            </div>
            <p className="footer-description">
              2015년부터 2025년까지, 10년간 달려온 레드크루의 마지막 무대를
              함께해주세요.
            </p>
            <div className="footer-social">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-link"
                >
                  <social.icon
                    className={`footer-social-icon ${social.className}`}
                    size={16}
                  />
                </a>
              ))}
            </div>
          </div>

          <div className="footer-links">
            <h4 className="footer-section-title">바로가기</h4>
            <ul className="footer-link-list">
              {quickLinks.map((link) => (
                <li key={link.href} className="footer-link-item">
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="footer-link"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-event-info">
            <h4 className="footer-section-title">공연 정보</h4>
            <ul className="footer-info-list">
              {eventInfo.map((info, index) => (
                <li key={index} className="footer-info-item">
                  {info}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            © {currentYear} RED CREW. All rights reserved. | 10 Years of
            Passion, One Final Stage.
          </p>
        </div>
      </div>
    </footer>
  )
}
