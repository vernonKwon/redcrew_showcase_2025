import { Mail, Instagram, Send, LucideProps } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '@/lib/reduxHooks'
import {
  updateContactForm,
  submitContactStart,
  clearContactSubmitSuccess,
} from '@/redux/reducer/showcaseSlice'
import { useEffect } from 'react'

interface ContactInfo {
  icon: React.ComponentType<LucideProps>
  title: string
  value: string
  href: string
}

export default function ContactSection() {
  const dispatch = useAppDispatch()
  const {
    contactForm,
    isSubmittingContact,
    contactSubmitError,
    contactSubmitSuccess,
  } = useAppSelector((state) => state.showcase)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (
      !contactForm.name ||
      !contactForm.email ||
      !contactForm.type ||
      !contactForm.message
    ) {
      alert('모든 필드를 입력해 주세요')
      return
    }

    dispatch(submitContactStart(contactForm))
  }

  // 성공 시 알림
  useEffect(() => {
    if (contactSubmitSuccess) {
      alert('문의가 성공적으로 전송되었습니다!')
      dispatch(clearContactSubmitSuccess())
    }
  }, [contactSubmitSuccess, dispatch])

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
          <div className="contact-section-info">
            <div className="contact-section-contact-info">
              <h3 className="contact-section-info-title">연락처 정보</h3>
              <div className="contact-section-info-list">
                {contactInfo.map((info) => (
                  <a
                    key={info.title}
                    href={info.href}
                    target={info.title === '인스타그램' ? '_blank' : undefined}
                    rel={info.title === '인스타그램' ? 'noopener noreferrer' : undefined}
                    className="contact-section-info-item"
                  >
                    <div className="contact-section-info-icon">
                      <info.icon size={20} />
                    </div>
                    <div className="contact-section-info-content">
                      <h4 className="contact-section-info-label">
                        {info.title}
                      </h4>
                      <p className="contact-section-info-value">
                        {info.value}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="contact-section-form">
            <h3 className="contact-section-form-title">문의하기</h3>
            <form
              onSubmit={handleSubmit}
              className="contact-section-form-content"
            >
              <div className="contact-section-field">
                <label className="contact-section-label">이름</label>
                <input
                  type="text"
                  value={contactForm.name}
                  onChange={(e) =>
                    dispatch(updateContactForm({ name: e.target.value }))
                  }
                  placeholder="성함을 입력해주세요"
                  className="contact-section-input"
                />
              </div>
              <div className="contact-section-field">
                <label className="contact-section-label">이메일</label>
                <input
                  type="email"
                  value={contactForm.email}
                  onChange={(e) =>
                    dispatch(updateContactForm({ email: e.target.value }))
                  }
                  placeholder="이메일 주소를 입력해주세요"
                  className="contact-section-input"
                />
              </div>
              <div className="contact-section-field">
                <label className="contact-section-label">문의 유형</label>
                <select
                  value={contactForm.type}
                  onChange={(e) =>
                    dispatch(updateContactForm({ type: e.target.value }))
                  }
                  className="contact-section-select"
                >
                  <option value="">선택해주세요</option>
                  <option value="venue">공연장 문의</option>
                  <option value="general">일반 문의</option>
                </select>
              </div>
              <div className="contact-section-field">
                <label className="contact-section-label">메시지</label>
                <textarea
                  rows={4}
                  value={contactForm.message}
                  onChange={(e) =>
                    dispatch(updateContactForm({ message: e.target.value }))
                  }
                  placeholder="문의하실 내용을 입력해주세요"
                  className="contact-section-textarea"
                />
              </div>
              {contactSubmitError && (
                <div className="contact-section-error">
                  {contactSubmitError}
                </div>
              )}
              <button
                type="submit"
                disabled={isSubmittingContact}
                className="contact-section-submit"
              >
                <Send className="contact-section-submit-icon" size={16} />
                {isSubmittingContact ? '전송 중...' : '문의 보내기'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
