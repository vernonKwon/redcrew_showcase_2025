export interface Team {
  name: string
  description: string
  established: string
  image: string
  instagram?: string
  instagram2?: string
  youtube?: string
}

export const crewTeams: Team[] = [
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

export const guestTeams: Team[] = [
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
