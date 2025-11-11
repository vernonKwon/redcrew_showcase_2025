import Link from 'next/link'
import {
  eventDetails,
  highlights,
  calendarEvent,
} from '@/constants/showcaseData'
import { addToCalendar } from '@/lib/calendarUtils'

export default function ShowcaseSection() {
  const handleCalendarClick = () => {
    addToCalendar(calendarEvent)
  }

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
