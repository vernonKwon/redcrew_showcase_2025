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
        "열정, 경고, 개성을 표현할 때 제일 눈에 띄는 컬러인 '레드'처럼 각자 매력이 있는 멤버들과 버스킹 활동하는 팀을 결성",
      side: 'left',
    },
    {
      year: '2016',
      title: '찬조공연, 외부활동',
      description:
        '중학교, 고등학교 등 수도권 전지역에서 행사 및 공연 활동, 새로운 도전의 시작점',
      side: 'right',
    },
    {
      year: '2019',
      title: '전국구 인정',
      description:
        '에버랜드, 서울시청, 교육청 등 공공기관과 대규모 페스티벌 초청 및 타 크루들과의 협업, 네트워크 확장의 해',
      side: 'left',
    },
    {
      year: '2021',
      title: '프로젝트 전환',
      description:
        '코로나 시기, 버스킹과 행사 등을 못하게 되었을 때 유튜브 커버댄스 촬영팀으로 전환',
      side: 'right',
    },
    {
      year: '2023',
      title: '전성기',
      description:
        '마포구청, 서초구청, 초/중/고 등 공공기관에서 러브콜 쇄도, 유튜브/버스킹/찬조 등 다방면에서 화려하게 활동하였음',
      side: 'left',
    },
    {
      year: '2025',
      title: 'Finale',
      description:
        '10년간의 여정을 마무리하는 해체 전 마지막 무대. 모든 것을 쏟아낼 마지막 공연',
      side: 'right',
      special: true,
    },
  ]

  return (
    <section id="history" className="history-timeline">
      <div className="history-timeline-container">
        <div className="history-timeline-header">
          <h2 className="history-timeline-title">
            <span className="history-timeline-title-highlight">RED CREW</span>의
            이야기 그리고{' '}
            <span className="history-timeline-subtitle-highlight">10년</span>의
            여정
          </h2>
          <p className="history-timeline-description">
            가장 강렬하고 시선을 끄는 컬러 &apos;레드&apos;처럼
            <br />
            각기 다른 개성과 매력을 지닌 멤버들이 모여 하나의 팀으로 빛나는 댄스
            크루입니다
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
