import { Calendar, MapPin, Ticket, LucideProps } from 'lucide-react'

interface EventDetail {
  icon: React.ComponentType<LucideProps>
  title: string
  primary: string
  secondary: string
}

interface Highlight {
  title: string
  description: string
}

export default function ShowcaseSection() {
  const eventDetails: EventDetail[] = [
    {
      icon: Calendar,
      title: '일정',
      primary: '2025년 12월 14일',
      secondary: '오후 2:00 - 6:00'
    },
    {
      icon: MapPin,
      title: '장소',
      primary: '중랑구민회관 대공연장',
      secondary: '서울특별시 중랑구'
    },
    {
      icon: Ticket,
      title: '티켓',
      primary: '35,000원',
      secondary: '전석 지정석'
    }
  ]

  const highlights: Highlight[] = [
    {
      title: '10년 베스트 퍼포먼스',
      description: '역대 최고의 무대들을 재구성한 스페셜 메들리'
    },
    {
      title: '게스트 팀 콜라보레이션',
      description: '전국 유명 댄스팀들과의 특별한 합동 공연'
    },
    {
      title: '멤버 솔로 무대',
      description: '각 멤버의 개성이 담긴 솔로 퍼포먼스'
    },
    {
      title: '피날레 그랜드 쇼',
      description: '모든 참가팀이 함께하는 감동의 마지막 무대'
    }
  ]

  return (
    <section id="showcase" className="showcase-section">
      <div className="showcase-section__container">
        <div className="showcase-section__header">
          <h2 className="showcase-section__title">
            <span className="showcase-section__title-highlight">FINAL</span> SHOWCASE
          </h2>
          <p className="showcase-section__description">
            레드크루의 마지막 무대를 위해 준비된 특별한 공연 정보를 확인하세요.
          </p>
        </div>

        <div className="showcase-section__details">
          {eventDetails.map((detail) => (
            <div key={detail.title} className="showcase-section__detail-card">
              <div className="showcase-section__detail-icon">
                <detail.icon size={24} />
              </div>
              <h3 className="showcase-section__detail-title">{detail.title}</h3>
              <div className="showcase-section__detail-content">
                <p className="showcase-section__detail-primary">{detail.primary}</p>
                <p className="showcase-section__detail-secondary">{detail.secondary}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="showcase-section__highlights">
          <div className="showcase-section__highlights-content">
            <h3 className="showcase-section__highlights-title">공연 하이라이트</h3>
            <div className="showcase-section__highlights-list">
              {highlights.map((highlight) => (
                <div key={highlight.title} className="showcase-section__highlight">
                  <div className="showcase-section__highlight-dot"></div>
                  <div className="showcase-section__highlight-content">
                    <h4 className="showcase-section__highlight-title">
                      {highlight.title}
                    </h4>
                    <p className="showcase-section__highlight-description">
                      {highlight.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="showcase-section__highlights-image">
            <img 
              src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
              alt="Celebration event with stage lighting and crowd" 
            />
          </div>
        </div>
      </div>
    </section>
  )
}