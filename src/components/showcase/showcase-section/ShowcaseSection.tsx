import { Calendar, MapPin, Ticket, LucideProps } from 'lucide-react'
import Link from 'next/link'

interface EventDetail {
  icon: React.ComponentType<LucideProps>
  title: string
  primary: string
  secondary: string
  tertiary?: string
  url: string
}

interface Highlight {
  title: string
  description: string
}

export default function ShowcaseSection() {
  const handleCalendarClick = () => {
    const event = {
      title: 'RED CREW 파이널 쇼케이스',
      description: '레드크루의 10년을 마무리하는 파이널 쇼케이스',
      location: '중랑구민회관 대공연장, 서울특별시 중랑구',
      startTime: '20251214T140000', // 2025-12-14 14:00 KST
      endTime: '20251214T180000', // 2025-12-14 18:00 KST
      startTimeUTC: '20251214T050000Z', // 2025-12-14 14:00 KST = 05:00 UTC
      endTimeUTC: '20251214T090000Z', // 2025-12-14 18:00 KST = 09:00 UTC
    }

    // 768px 기준으로 모바일/데스크톱 분기
    const isMobile = window.innerWidth < 768

    if (isMobile) {
      // 모바일: .ics 파일 다운로드
      const icsContent = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'CALSCALE:GREGORIAN',
        'METHOD:PUBLISH',
        'BEGIN:VEVENT',
        `DTSTART:${event.startTimeUTC}`,
        `DTEND:${event.endTimeUTC}`,
        `SUMMARY:${event.title}`,
        `DESCRIPTION:${event.description}`,
        `LOCATION:${event.location}`,
        'STATUS:CONFIRMED',
        'END:VEVENT',
        'END:VCALENDAR',
      ].join('\r\n')

      const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = 'red-crew-final-showcase.ics'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    } else {
      // 데스크톱: Google Calendar URL
      const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${event.startTime}/${event.endTime}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}`

      window.open(googleCalendarUrl, '_blank')
    }
  }

  const eventDetails: EventDetail[] = [
    {
      icon: Calendar,
      title: '일정',
      primary: '2025년 12월 14일',
      secondary: '오후 2:00 - 6:00',
      tertiary: '클릭하여 구글 캘린더/iOS 캘린더에 추가',
      url: '',
    },
    {
      icon: MapPin,
      title: '장소',
      primary: '중랑구민회관 대공연장',
      secondary: '서울특별시 중랑구 · 약 500석 규모',
      tertiary: '지하철 7호선 용마산역 1번 출구 도보 5분',
      url: 'https://naver.me/xBwKuRs6',
    },
    {
      icon: Ticket,
      title: '티켓',
      primary: '10,000원',
      secondary: '전석 지정석',
      tertiary: '카메라석 별도 운영 / 공식촬영 방해 시 퇴장 조치',
      url: 'https://aq.gy/f/CsqJl',
    },
  ]

  const highlights: Highlight[] = [
    {
      title: '시그니처 스테이지',
      description: '각 팀의 과거/현재의 대표곡을 보여주는 무대',
    },
    {
      title: '조커 스테이지',
      description: '각 팀의 성격과 정반대 되는 컨셉의 무대',
    },
    {
      title: '포지션 스테이지',
      description: '리더와 멤버가 각각 무대를 준비하여 대결하는 무대',
    },
    {
      title: '스페셜 스테이지',
      description: '레드크루 쇼케이스에서만 볼 수 있는 레전드 무대',
    },
  ]

  return (
    <section id="showcase" className="showcase-section">
      <div className="showcase-section-container">
        <div className="showcase-section-header">
          <h2 className="showcase-section-title">
            <span className="showcase-section-title-highlight">FINAL</span>{' '}
            SHOWCASE
          </h2>
          <p className="showcase-section-description">
            레드크루의 마지막 무대를 위해 준비된 특별한 공연 정보를 확인하세요.
          </p>
        </div>

        <div className="showcase-section-details">
          {eventDetails.map((detail) => {
            const cardContent = (
              <div className="showcase-section-detail-card">
                <div className="showcase-section-detail-icon">
                  <detail.icon size={24} />
                </div>
                <h3 className="showcase-section-detail-title">
                  {detail.title}
                </h3>
                <div className="showcase-section-detail-content">
                  <p className="showcase-section-detail-primary">
                    {detail.primary}
                  </p>
                  <p className="showcase-section-detail-secondary">
                    {detail.secondary}
                  </p>
                  {detail.tertiary && (
                    <p className="showcase-section-detail-tertiary">
                      {detail.tertiary}
                    </p>
                  )}
                </div>
              </div>
            )

            return detail.title === '일정' ? (
              <div
                key={detail.title}
                onClick={handleCalendarClick}
                style={{ cursor: 'pointer' }}
              >
                {cardContent}
              </div>
            ) : (
              <Link href={detail.url} target="blank" key={detail.title}>
                {cardContent}
              </Link>
            )
          })}
        </div>

        <div className="showcase-section-highlights">
          <div className="showcase-section-highlights-content">
            <h3 className="showcase-section-highlights-title">
              공연 하이라이트
            </h3>
            <div className="showcase-section-highlights-list">
              {highlights.map((highlight) => (
                <div
                  key={highlight.title}
                  className="showcase-section-highlight"
                >
                  <div className="showcase-section-highlight-dot"></div>
                  <div className="showcase-section-highlight-content">
                    <h4 className="showcase-section-highlight-title">
                      {highlight.title}
                    </h4>
                    <p className="showcase-section-highlight-description">
                      {highlight.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
