import { useState, useEffect } from 'react'
import { Ticket, Play } from 'lucide-react'
import { getTimeUntilEvent } from '@/lib/dayjs'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
  isEventPassed: boolean
}

export default function HeroSection() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isEventPassed: false,
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
    alert('티켓 예매 시스템으로 이동합니다.')
  }

  const handleTrailer = () => {
    alert('트레일러 재생')
  }

  return (
    <section className="hero-section">
      <div className="hero-section__background">
        <div className="hero-section__gradient"></div>
        <div className="hero-section__animation">
          <div className="hero-section__circle hero-section__circle--primary"></div>
          <div className="hero-section__circle hero-section__circle--secondary"></div>
          <div className="hero-section__circle hero-section__circle--accent"></div>
        </div>
      </div>

      <div className="hero-section__content">
        <div className="hero-section__title">
          <h1 className="hero-section__main-title">
            <span className="hero-section__gradient-text">
              RED CREW (이강용 바보)
            </span>
          </h1>
          <div className="hero-section__subtitle">10주년 파이널 쇼케이스</div>
          <div className="hero-section__description">
            10년간의 열정과 땀이 담긴 마지막 무대.
            <br />
            레드크루의 대단원의 막을 함께해주세요.
          </div>
        </div>

        <div className="hero-section__countdown">
          <div className="hero-section__countdown-label">
            <span>{isMounted && timeLeft.isEventPassed ? 'EVENT ENDED' : 'D-DAY COUNTDOWN'}</span>
          </div>
          {isMounted && timeLeft.isEventPassed ? (
            <div className="hero-section__event-ended">
              <p>쇼케이스가 성공적으로 종료되었습니다!</p>
            </div>
          ) : (
            <div className="hero-section__countdown-grid">
              {[
                { label: 'DAYS', value: isMounted ? timeLeft.days : 0 },
                { label: 'HOURS', value: isMounted ? timeLeft.hours : 0 },
                { label: 'MIN', value: isMounted ? timeLeft.minutes : 0 },
                { label: 'SEC', value: isMounted ? timeLeft.seconds : 0 },
              ].map((unit) => (
                <div key={unit.label} className="hero-section__countdown-item">
                  <div className="hero-section__countdown-value">
                    {unit.value}
                  </div>
                  <div className="hero-section__countdown-unit">{unit.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="hero-section__actions">
          <button
            onClick={handleReservation}
            className="hero-section__button hero-section__button--primary"
          >
            <Ticket size={20} />
            예매하기
          </button>
          <button
            onClick={handleTrailer}
            className="hero-section__button hero-section__button--outline"
          >
            <Play size={20} />
            트레일러 보기
          </button>
        </div>
      </div>

      <div className="hero-section__scroll-indicator">
        <div className="hero-section__scroll-line"></div>
      </div>
    </section>
  )
}
