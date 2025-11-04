import { Mail, Instagram, LucideProps } from 'lucide-react'

interface ContactInfo {
  icon: React.ComponentType<LucideProps>
  title: string
  value: string
  href: string
}

export default function ContactSection() {
  const contactInfo: ContactInfo[] = [
    {
      icon: Mail,
      title: '이메일',
      value: 'redcrew_@naver.com',
      href: 'mailto:redcrew_@naver.com',
    },
    {
      icon: Instagram,
      title: '인스타그램',
      value: '@redcrew_korea',
      href: 'https://www.instagram.com/redcrew_korea',
    },
  ]

  return (
    <section id="contact" className="contact-section">
      <div className="contact-section-container">
        <div className="contact-section-header">
          <h2 className="contact-section-title">
            <span className="contact-section-title-highlight">CONTACT</span> US
          </h2>
          <p className="contact-section-description">
            쇼케이스에 대한 문의사항이나 예매 관련 정보가 필요하시면 언제든지
            연락주세요.
          </p>
        </div>

        <div className="contact-section-content">
          <div className="contact-section-info-list">
            {contactInfo.map((info) => (
              <a
                key={info.title}
                href={info.href}
                target={info.title === '인스타그램' ? '_blank' : undefined}
                rel={
                  info.title === '인스타그램' ? 'noopener noreferrer' : undefined
                }
                className="contact-section-info-item"
              >
                <div className="contact-section-info-icon">
                  <info.icon size={24} />
                </div>
                <div className="contact-section-info-content">
                  <h4 className="contact-section-info-label">{info.title}</h4>
                  <p className="contact-section-info-value">{info.value}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
