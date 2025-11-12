import { useState, useEffect } from 'react'
import { Ticket, Play } from 'lucide-react'
import { getTimeUntilEvent, EventStatus } from '@/lib/dayjs'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
  eventStatus: EventStatus
}

export default function HeroSection() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    eventStatus: 'before',
  })
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    // 클라이언트 사이드에서만 실행되도록 마운트 상태 설정
    setIsMounted(true)

    const updateCountdown = () => {
      const timeData = getTimeUntilEvent()
      setTimeLeft(timeData)
    }

    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)

    return () => clearInterval(interval)
  }, [])

  const handleReservation = () => {
    window.open('https://aq.gy/f/CsqJl', '_blank', 'noopener,noreferrer')
  }

  const handleTrailer = () => {
    alert('트레일러 재생')
  }

  return (
    <section id="d-day" className="hero-section">
      <div className="hero-section-background">
        <div className="hero-section-gradient"></div>
        <div className="hero-section-animation">
          <div className="hero-section-circle hero-section-circle--primary"></div>
          <div className="hero-section-circle hero-section-circle--secondary"></div>
          <div className="hero-section-circle hero-section-circle--accent"></div>
        </div>
      </div>

      <div className="hero-section-content">
        <div className="hero-section-title">
          <h1 className="hero-section-main-title">
            <span className="hero-section-gradient-text">RED CREW</span>
          </h1>
          <div className="hero-section-subtitle">
            청춘 그 자체였던 10년간의 활동
          </div>
          <div className="hero-section-description">
            우여곡절이 많았던 10년의 여정, 그리고 마지막 쇼케이스
            <br />그 끝을 함께 장식해주세요
          </div>
        </div>

        <div className="hero-section-countdown">
          <div className="hero-section-countdown-label">
            <span>
              {isMounted && timeLeft.eventStatus === 'ended' && 'EVENT ENDED'}
              {isMounted && timeLeft.eventStatus === 'ongoing' && 'NOW LIVE'}
              {(!isMounted || timeLeft.eventStatus === 'before') &&
                'D-DAY COUNTDOWN'}
            </span>
          </div>

          {/* 이벤트 시작 전 (14시 이전): 카운트다운 표시 */}
          {(!isMounted || timeLeft.eventStatus === 'before') && (
            <div className="hero-section-countdown-grid">
              {[
                { label: 'DAYS', value: isMounted ? timeLeft.days : 0 },
                { label: 'HOURS', value: isMounted ? timeLeft.hours : 0 },
                { label: 'MIN', value: isMounted ? timeLeft.minutes : 0 },
                { label: 'SEC', value: isMounted ? timeLeft.seconds : 0 },
              ].map((unit) => (
                <div key={unit.label} className="hero-section-countdown-item">
                  <div className="hero-section-countdown-value">
                    {String(unit.value).padStart(2, '0')}
                  </div>
                  <div className="hero-section-countdown-unit">
                    {unit.label}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 이벤트 진행 중 (14시 ~ 18시): 쇼케이스를 즐기세요! */}
          {isMounted && timeLeft.eventStatus === 'ongoing' && (
            <div className="hero-section-event-ended">
              <p>쇼케이스를 즐기세요!</p>
            </div>
          )}

          {/* 이벤트 종료 후 (18시 이후): 쇼케이스가 성공적으로 종료되었습니다! */}
          {isMounted && timeLeft.eventStatus === 'ended' && (
            <div className="hero-section-event-ended">
              <p>쇼케이스가 성공적으로 종료되었습니다!</p>
            </div>
          )}
        </div>

        <div className="hero-section-actions">
          <button
            onClick={handleReservation}
            className="hero-section-button hero-section-button--primary"
          >
            <Ticket size={20} />
            예매하기
          </button>
          <button
            onClick={handleTrailer}
            className="hero-section-button hero-section-button--outline"
          >
            <Play size={20} />
            트레일러 보기
          </button>
        </div>
      </div>

      <div className="hero-section-scroll-indicator">
        <div className="hero-section-scroll-line"></div>
      </div>
    </section>
  )
}
