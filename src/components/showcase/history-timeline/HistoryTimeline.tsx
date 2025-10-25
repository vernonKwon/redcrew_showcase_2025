interface TimelineEvent {
  year: string
  title: string
  description: string
  side: 'left' | 'right'
  special?: boolean
}

export default function HistoryTimeline() {
  const timelineEvents: TimelineEvent[] = [
    {
      year: '2015',
      title: '레드크루 결성',
      description:
        '춤에 대한 열정 하나로 모인 5명의 멤버들. 작은 연습실에서 시작된 우리의 꿈',
      side: 'left',
    },
    {
      year: '2016',
      title: '첫 대회 우승',
      description:
        '지역 댄스 대회에서 거둔 첫 승리. 우리가 할 수 있다는 자신감을 얻은 순간',
      side: 'right',
    },
    {
      year: '2018',
      title: '전국구 인정',
      description:
        '전국 댄스 페스티벌 참가 및 여러 크루들과의 협업. 네트워크 확장의 해',
      side: 'left',
    },
    {
      year: '2020',
      title: '디지털 전환',
      description: '온라인 플랫폼을 통한 공연과 교육. 새로운 도전의 시작점',
      side: 'right',
    },
    {
      year: '2022',
      title: '전성기',
      description:
        '국내 최대 댄스 대회 우승 및 해외 페스티벌 초청. 최고의 순간들',
      side: 'left',
    },
    {
      year: '2025',
      title: '파이널 쇼케이스',
      description:
        '10년간의 여정을 마무리하는 특별한 무대. 모든 것을 쏟아낼 마지막 공연',
      side: 'right',
      special: true,
    },
  ]

  return (
    <section id="history" className="history-timeline">
      <div className="history-timeline-container">
        <div className="history-timeline-header">
          <h2 className="history-timeline-title">
            <span className="history-timeline-title-highlight">10년</span>의
            여정
          </h2>
          <p className="history-timeline-description">
            레드크루가 걸어온 길, 그리고 함께 만들어온 추억들을 되돌아봅니다.
          </p>
        </div>

        <div className="history-timeline-content">
          <div className="history-timeline-line"></div>

          <div className="history-timeline-events">
            {timelineEvents.map((event) => (
              <div
                key={event.year}
                className={`history-timeline-event history-timeline-event--${
                  event.side
                } ${event.special ? 'history-timeline-event--special' : ''}`}
              >
                <div className="history-timeline-dot">
                  {event.special ? (
                    <span className="history-timeline-star">★</span>
                  ) : (
                    <div className="history-timeline-dot-inner"></div>
                  )}
                </div>

                <div className="history-timeline-card">
                  <div className="history-timeline-year">{event.year}</div>
                  <h3 className="history-timeline-event-title">
                    {event.title}
                  </h3>
                  <p className="history-timeline-event-description">
                    {event.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
