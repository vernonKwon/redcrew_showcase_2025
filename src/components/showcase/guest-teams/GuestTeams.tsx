import TeamCard from './TeamCard'

interface Team {
  name: string
  style: string
  description: string
  established: string
  image: string
}

export default function GuestTeams() {
  const crewTeams: Team[] = [
    {
      name: 'HIPARTY',
      style: 'Hip-Hop',
      description: '걸스힙합, 댄스홀, 트월킹 등으로 여성미를 강조한 댄스팀',
      established: 'Est. 2019',
      image: 'https://images.unsplash.com/photo-1504609813442-a8924e83f76e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300'
    },
    {
      name: '4X4 CREW',
      style: 'Urban',
      description: '컨셉의 스펙트럼이 다양하며, 칼군무가 포인트인 K-POP 댄스팀',
      established: 'Est. 2020',
      image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300'
    },
    {
      name: 'ME_MEMORIES CREW',
      style: 'Contemporary',
      description: '2세대~5세대 K-POP을 자유롭게 넘나드는 댄스팀',
      established: 'Est. 2021',
      image: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300'
    }
  ]

  const guestTeams: Team[] = [
    {
      name: 'PRE-BXXCH',
      style: 'Hip-Hop / Urban',
      description: '왁킹, 올장르, 걸스힙합, 걸리쉬 각 장르별 1군들이 모여 결성한 유닛',
      established: 'Est. 2023',
      image: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300'
    },
    {
      name: 'PENTAGON',
      style: 'Contemporary / Jazz',
      description: 'K-POP 남성댄스팀',
      established: 'Est. 2013',
      image: 'https://images.unsplash.com/photo-1445384763658-0400939829cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300'
    },
    {
      name: 'ONESHOT CREW',
      style: 'Breaking / Popping',
      description: '소속멤버 약 100명, 전국 대학생들의 연합 무용크루',
      established: 'Est. 2023',
      image: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300'
    },
    {
      name: 'Art company SOUL',
      style: 'Contemporary / Artistic',
      description: 'K-POP 남성댄스팀',
      established: 'Est. 2020',
      image: 'https://images.unsplash.com/photo-1504610926078-a1611febcad3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300'
    }
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
              />
            ))}
          </div>
        </div>

        {/* GUEST STAGE */}
        <div className="guest-teams-section">
          <div className="guest-teams-header">
            <h2 className="guest-teams-title">
              <span className="guest-teams-title-highlight">GUEST</span> STAGE
            </h2>
            <p className="guest-teams-description">
              레드크루와 함께 무대를 빛낼 게스트 팀들을 소개합니다.
            </p>
          </div>

          <div className="guest-teams-grid guest-teams-grid--guest">
            {guestTeams.map((team) => (
              <TeamCard
                key={team.name}
                name={team.name}
                description={team.description}
                established={team.established}
                image={team.image}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}