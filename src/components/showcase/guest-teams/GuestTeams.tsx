import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import TeamCard from './TeamCard'
import { crewTeams, guestTeams } from '@/constants/teamsData'
import { useScrollGradient } from '@/lib/hooks/useScrollGradient'

export default function GuestTeams() {
  const { ref: guestScrollRef, opacity: gradientOpacity } = useScrollGradient()
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)

  // 스크롤 위치에 따라 화살표 표시 여부 결정
  const handleScroll = () => {
    if (!guestScrollRef.current) return

    const { scrollLeft, scrollWidth, clientWidth } = guestScrollRef.current
    setShowLeftArrow(scrollLeft > 0)
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10)
  }

  // 스크롤 함수
  const scroll = (direction: 'left' | 'right') => {
    if (!guestScrollRef.current) return

    const scrollAmount = 300 // 스크롤할 거리
    const newScrollLeft =
      direction === 'left'
        ? guestScrollRef.current.scrollLeft - scrollAmount
        : guestScrollRef.current.scrollLeft + scrollAmount

    guestScrollRef.current.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth',
    })
  }

  // 초기 마운트 시 화살표 상태 설정
  useEffect(() => {
    handleScroll()
  }, [])

  return (
    <section id="teams" className="guest-teams">
      <div className="guest-teams-container">
        {/* CREW STAGE */}
        <div className="guest-teams-section">
          <div className="guest-teams-header">
            <h2 className="guest-teams-title">
              <span className="guest-teams-title-highlight">CREW</span> STAGE
            </h2>
            <p className="guest-teams-description">
              레드크루와 함께 무대를 만들어갈 크루들을 소개합니다
            </p>
          </div>

          <div className="guest-teams-grid guest-teams-grid--crew">
            {crewTeams.map((team) => (
              <TeamCard
                key={team.name}
                name={team.name}
                description={team.description}
                established={team.established}
                image={team.image}
                instagram={team.instagram}
                instagram2={team.instagram2}
                youtube={team.youtube}
              />
            ))}
          </div>
        </div>

        {/* GUEST STAGE */}
        <div
          className="guest-teams-section guest-teams-section--guest-scroll"
          style={
            { '--gradient-opacity': gradientOpacity } as React.CSSProperties
          }
        >
          <div className="guest-teams-header">
            <h2 className="guest-teams-title">
              <span className="guest-teams-title-highlight">GUEST</span> STAGE
            </h2>
            <p className="guest-teams-description">
              레드크루와 함께 무대를 빛낼 게스트 팀들을 소개합니다
            </p>
          </div>

          <div className="guest-teams-scroll-wrapper">
            {/* 왼쪽 화살표 버튼 (데스크톱만) */}
            {showLeftArrow && (
              <button
                className="guest-teams-scroll-button guest-teams-scroll-button--left"
                onClick={() => scroll('left')}
                aria-label="이전 팀 보기"
              >
                <ChevronLeft size={24} />
              </button>
            )}

            {/* 오른쪽 화살표 버튼 (데스크톱만) */}
            {showRightArrow && (
              <button
                className="guest-teams-scroll-button guest-teams-scroll-button--right"
                onClick={() => scroll('right')}
                aria-label="다음 팀 보기"
              >
                <ChevronRight size={24} />
              </button>
            )}

            <div
              ref={guestScrollRef}
              className="guest-teams-grid guest-teams-grid--guest"
              onScroll={handleScroll}
            >
              {guestTeams.map((team) => (
                <TeamCard
                  key={team.name}
                  name={team.name}
                  description={team.description}
                  established={team.established}
                  image={team.image}
                  instagram={team.instagram}
                  instagram2={team.instagram2}
                  youtube={team.youtube}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
