import TeamCard from './TeamCard'
import { crewTeams, guestTeams } from '@/constants/teamsData'
import { useScrollGradient } from '@/lib/hooks/useScrollGradient'

export default function GuestTeams() {
  const { ref: guestScrollRef, opacity: gradientOpacity } = useScrollGradient()

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
