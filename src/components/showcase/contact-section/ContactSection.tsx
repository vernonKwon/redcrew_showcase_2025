import { Phone, Mail, Instagram, Send, LucideProps } from 'lucide-react'
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
      icon: Phone,
      title: '전화',
      value: '010-1234-5678',
    },
    {
      icon: Mail,
      title: '이메일',
      value: 'redcrew.official@email.com',
    },
    {
      icon: Instagram,
      title: '인스타그램',
      value: '@redcrew_official',
    },
  ]

  return (
    <section id="contact" className="contact-section">
      <div className="contact-section__container">
        <div className="contact-section__header">
          <h2 className="contact-section__title">
            <span className="contact-section__title-highlight">CONTACT</span> US
          </h2>
          <p className="contact-section__description">
            쇼케이스에 대한 문의사항이나 예매 관련 정보가 필요하시면 언제든지
            연락주세요.
          </p>
        </div>

        <div className="contact-section__content">
          <div className="contact-section__info">
            <div className="contact-section__contact-info">
              <h3 className="contact-section__info-title">연락처 정보</h3>
              <div className="contact-section__info-list">
                {contactInfo.map((info) => (
                  <div key={info.title} className="contact-section__info-item">
                    <div className="contact-section__info-icon">
                      <info.icon size={20} />
                    </div>
                    <div className="contact-section__info-content">
                      <h4 className="contact-section__info-label">
                        {info.title}
                      </h4>
                      <p className="contact-section__info-value">
                        {info.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="contact-section__form">
            <h3 className="contact-section__form-title">문의하기</h3>
            <form
              onSubmit={handleSubmit}
              className="contact-section__form-content"
            >
              <div className="contact-section__field">
                <label className="contact-section__label">이름</label>
                <input
                  type="text"
                  value={contactForm.name}
                  onChange={(e) =>
                    dispatch(updateContactForm({ name: e.target.value }))
                  }
                  placeholder="성함을 입력해주세요"
                  className="contact-section__input"
                />
              </div>
              <div className="contact-section__field">
                <label className="contact-section__label">이메일</label>
                <input
                  type="email"
                  value={contactForm.email}
                  onChange={(e) =>
                    dispatch(updateContactForm({ email: e.target.value }))
                  }
                  placeholder="이메일 주소를 입력해주세요"
                  className="contact-section__input"
                />
              </div>
              <div className="contact-section__field">
                <label className="contact-section__label">문의 유형</label>
                <select
                  value={contactForm.type}
                  onChange={(e) =>
                    dispatch(updateContactForm({ type: e.target.value }))
                  }
                  className="contact-section__select"
                >
                  <option value="">선택해주세요</option>
                  <option value="venue">공연장 문의</option>
                  <option value="general">일반 문의</option>
                </select>
              </div>
              <div className="contact-section__field">
                <label className="contact-section__label">메시지</label>
                <textarea
                  rows={4}
                  value={contactForm.message}
                  onChange={(e) =>
                    dispatch(updateContactForm({ message: e.target.value }))
                  }
                  placeholder="문의하실 내용을 입력해주세요"
                  className="contact-section__textarea"
                />
              </div>
              {contactSubmitError && (
                <div className="contact-section__error">
                  {contactSubmitError}
                </div>
              )}
              <button
                type="submit"
                disabled={isSubmittingContact}
                className="contact-section__submit"
              >
                <Send className="contact-section__submit-icon" size={16} />
                {isSubmittingContact ? '전송 중...' : '문의 보내기'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
