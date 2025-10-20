import { Instagram, Youtube } from 'lucide-react'

interface GuestTeam {
  name: string
  style: string
  description: string
  established: string
  image: string
}

export default function GuestTeams() {
  const guestTeams: GuestTeam[] = [
    {
      name: 'PRE-BXXCH',
      style: 'Hip-Hop / Urban',
      description: '강렬한 비트와 독창적인 안무로 무대를 압도하는 실력파 댄스팀',
      established: 'Est. 2018',
      image: 'https://images.unsplash.com/photo-1504609813442-a8924e83f76e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300'
    },
    {
      name: 'PENTAGON',
      style: 'Contemporary / Jazz',
      description: '정교한 테크닉과 감성적인 표현력으로 관객들의 마음을 사로잡는 팀',
      established: 'Est. 2016',
      image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300'
    },
    {
      name: 'ONESHOT CREW',
      style: 'Breaking / Popping',
      description: '한 번의 기회로 모든 것을 보여주는 강력한 퍼포먼스의 대가들',
      established: 'Est. 2015',
      image: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300'
    },
    {
      name: 'Art company SOUL',
      style: 'Contemporary / Artistic',
      description: '예술적 감성과 깊이 있는 스토리텔링으로 무장한 창작 댄스팀',
      established: 'Est. 2017',
      image: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300'
    }
  ]

  return (
    <section id="teams" className="guest-teams">
      <div className="guest-teams__container">
        <div className="guest-teams__header">
          <h2 className="guest-teams__title">
            <span className="guest-teams__title-highlight">GUEST</span> TEAMS
          </h2>
          <p className="guest-teams__description">
            레드크루와 함께 무대를 빛낼 최고의 댄스팀들을 소개합니다.
          </p>
        </div>

        <div className="guest-teams__grid">
          {guestTeams.map((team) => (
            <div key={team.name} className="guest-teams__card">
              <div className="guest-teams__image">
                <img 
                  src={team.image} 
                  alt={`${team.name} performing ${team.style}`}
                />
              </div>
              <div className="guest-teams__content">
                <h3 className="guest-teams__name">{team.name}</h3>
                <p className="guest-teams__style">{team.style}</p>
                <p className="guest-teams__team-description">{team.description}</p>
                <div className="guest-teams__footer">
                  <span className="guest-teams__established">{team.established}</span>
                  <div className="guest-teams__social">
                    <Instagram className="guest-teams__social-icon" size={16} />
                    <Youtube className="guest-teams__social-icon" size={16} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}