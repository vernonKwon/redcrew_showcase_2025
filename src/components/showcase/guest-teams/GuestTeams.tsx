import { useEffect, useRef, useState } from 'react'
import TeamCard from './TeamCard'

interface Team {
  name: string
  description: string
  established: string
  image: string
  instagram?: string
  instagram2?: string
  youtube?: string
}

export default function GuestTeams() {
  const guestScrollRef = useRef<HTMLDivElement>(null)
  const [gradientOpacity, setGradientOpacity] = useState(1)

  useEffect(() => {
    const scrollContainer = guestScrollRef.current
    if (!scrollContainer) return

    const handleScroll = () => {
      const { scrollLeft } = scrollContainer
      // 스크롤 0~100px 범위를 opacity 1~0으로 매핑
      const opacity = Math.max(0, Math.min(1, 1 - scrollLeft / 100))
      setGradientOpacity(opacity)
    }

    scrollContainer.addEventListener('scroll', handleScroll)
    // 초기 상태 체크
    handleScroll()

    return () => scrollContainer.removeEventListener('scroll', handleScroll)
  }, [])

  const crewTeams: Team[] = [
    {
      name: 'RED CREW',
      description:
        "가장 강렬하고 시선을 끄는 컬러 '레드'처럼, 각기 다른 개성과 매력을 지닌 멤버들이 모여 하나의 팀으로 빛나는 댄스 크루",
      established: 'Est. 2015',
      image: '/images/teams/redcrew.png',
      instagram: 'https://www.instagram.com/redcrew_korea',
      instagram2: 'https://www.instagram.com/red_99_0819',
      youtube: 'https://www.youtube.com/@레드크루',
    },
    {
      name: '4X4 CREW',
      description:
        '컨셉의 스펙트럼이 다양하며, 칼군무가 포인트인 K-POP 댄스 크루',
      established: 'Est. 2020',
      image: '/images/teams/4x4_2.png',
      instagram: 'https://www.instagram.com/4x4crew_4x4studio/',
      youtube: 'https://www.youtube.com/@4x4crew_public',
    },
    {
      name: 'ME_MEMORIES CREW',
      description: '2세대~5세대 K-POP을 자유롭게 넘나드는 댄스 크루',
      established: 'Est. 2021',
      image: '/images/teams/ME_MEMORIES.png',
      instagram: 'https://www.instagram.com/me_memoriescrew/',
      youtube: 'https://www.youtube.com/@ME_MEMORIESCREW_crew',
    },
  ]

  const guestTeams: Team[] = [
    {
      name: 'PENTAGON',
      description: '',
      established: '',
      image: '/images/teams/guest_pentagon.png',
    },
    {
      name: 'DROP',
      description: '',
      established: '',
      image: '/images/teams/guest_drop.png',
    },
    {
      name: 'PRE-BXXCH',
      description: '',
      established: '',
      image: '/images/teams/guest_pre-bxxch.png',
    },
    {
      name: 'Art company SOUL',
      description: '',
      established: '',
      image: '/images/teams/guest_art_company_soul.png',
    },
    {
      name: 'ONESHOT CREW',
      description: '',
      established: '',
      image: '/images/teams/guest_one_shot.png',
    },
  ]

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
              레드크루와 함께 무대를 만들어갈 크루들을 소개합니다.
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
              레드크루와 함께 무대를 빛낼 게스트 팀들을 소개합니다.
            </p>
          </div>

          <div
            ref={guestScrollRef}
            className="guest-teams-grid guest-teams-grid--guest"
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
    </section>
  )
}
