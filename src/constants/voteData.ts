import { Star, Trophy, Heart, LucideProps } from 'lucide-react'

export interface VoteOption {
  id: string
  title: string
  description: string
  style: string
  location: string
  established: string
  imageUrl: string
  votes: number
}

export interface VoteCategory {
  id: string
  title: string
  description: string
  icon: React.ComponentType<LucideProps>
  options: VoteOption[]
}

export const voteCategories: VoteCategory[] = [
  {
    id: 'most-anticipated-team',
    title: '가장 기대되는 게스트 팀',
    description: '파이널 쇼케이스에서 가장 보고싶은 게스트 팀을 선택해주세요',
    icon: Star,
    options: [
      {
        id: 'blue-storm',
        title: 'BLUE STORM',
        description:
          '부산을 대표하는 힙합 댄스팀. 강렬한 퍼포먼스와 독창적인 안무로 유명',
        style: 'Hip-Hop / Urban',
        location: '부산',
        established: 'Est. 2018',
        imageUrl:
          'https://images.unsplash.com/photo-1504609813442-a8924e83f76e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
        votes: 1847,
      },
      {
        id: 'golden-wave',
        title: 'GOLDEN WAVE',
        description:
          '감성적이고 우아한 무브먼트로 관객들의 마음을 사로잡는 대구의 실력파 팀',
        style: 'Contemporary / Jazz',
        location: '대구',
        established: 'Est. 2016',
        imageUrl:
          'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
        votes: 1623,
      },
      {
        id: 'urban-kings',
        title: 'URBAN KINGS',
        description:
          '스트릿 댄스의 본고장 서울에서 활동하는 올드스쿨의 강자들',
        style: 'Breaking / Popping',
        location: '서울',
        established: 'Est. 2015',
        imageUrl:
          'https://images.unsplash.com/photo-1547036967-23d11aacaee0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
        votes: 2134,
      },
      {
        id: 'rhythm-souls',
        title: 'RHYTHM SOULS',
        description: '감미로운 리듬과 정교한 안무로 무장한 광주의 신예 강자',
        style: 'R&B / Choreography',
        location: '광주',
        established: 'Est. 2019',
        imageUrl:
          'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
        votes: 1456,
      },
      {
        id: 'electric-minds',
        title: 'ELECTRIC MINDS',
        description:
          '혁신적인 스타일과 강렬한 에너지로 무대를 뒤흔드는 인천의 실험적 팀',
        style: 'Krump / Experimental',
        location: '인천',
        established: 'Est. 2020',
        imageUrl:
          'https://images.unsplash.com/photo-1524863479829-916d8e77f114?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
        votes: 1289,
      },
      {
        id: 'legacy-crew',
        title: 'LEGACY CREW',
        description:
          '다양한 장르를 융합한 독창적 스타일로 유명한 전주의 베테랑 팀',
        style: 'All-Style / Fusion',
        location: '전주',
        established: 'Est. 2017',
        imageUrl:
          'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
        votes: 1789,
      },
    ],
  },
  {
    id: 'best-collaboration',
    title: '최고의 콜라보레이션 기대',
    description:
      '레드크루와 함께했을 때 가장 멋진 무대를 만들어낼 것 같은 팀',
    icon: Trophy,
    options: [
      {
        id: 'collab-blue-storm',
        title: 'BLUE STORM × RED CREW',
        description: '힙합의 강렬함과 레드크루의 열정이 만나는 폭발적인 무대',
        style: 'Hip-Hop Fusion',
        location: '부산 × 홈',
        established: '협업 예정',
        imageUrl:
          'https://images.unsplash.com/photo-1504609813442-a8924e83f76e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
        votes: 987,
      },
      {
        id: 'collab-golden-wave',
        title: 'GOLDEN WAVE × RED CREW',
        description: '감성적인 재즈와 역동적인 에너지의 완벽한 조화',
        style: 'Contemporary Fusion',
        location: '대구 × 홈',
        established: '협업 예정',
        imageUrl:
          'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
        votes: 1234,
      },
      {
        id: 'collab-urban-kings',
        title: 'URBAN KINGS × RED CREW',
        description: '올드스쿨과 뉴스쿨이 만나는 스트릿 댄스의 정석',
        style: 'Street Dance Legacy',
        location: '서울 × 홈',
        established: '협업 예정',
        imageUrl:
          'https://images.unsplash.com/photo-1547036967-23d11aacaee0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
        votes: 1567,
      },
      {
        id: 'collab-all-teams',
        title: '전체 팀 그랜드 콜라보',
        description: '모든 게스트 팀과 레드크루가 함께하는 대장관의 피날레',
        style: 'Grand Finale',
        location: '전국 연합',
        established: '2025 Special',
        imageUrl:
          'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
        votes: 2789,
      },
    ],
  },
  {
    id: 'rising-star',
    title: '라이징 스타 팀',
    description: '앞으로 가장 성장 가능성이 높다고 생각하는 신예 팀',
    icon: Heart,
    options: [
      {
        id: 'rising-rhythm-souls',
        title: 'RHYTHM SOULS',
        description:
          '2019년 결성된 신예 팀이지만 이미 남다른 실력을 보여주는 광주의 희망',
        style: 'R&B / Choreography',
        location: '광주',
        established: 'Est. 2019',
        imageUrl:
          'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
        votes: 1345,
      },
      {
        id: 'rising-electric-minds',
        title: 'ELECTRIC MINDS',
        description:
          '2020년부터 활동을 시작한 실험적인 크럼프 팀, 무한한 가능성을 보여주는 인천의 다크호스',
        style: 'Krump / Experimental',
        location: '인천',
        established: 'Est. 2020',
        imageUrl:
          'https://images.unsplash.com/photo-1524863479829-916d8e77f114?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
        votes: 1123,
      },
      {
        id: 'rising-blue-storm',
        title: 'BLUE STORM',
        description:
          '2018년 결성 후 빠르게 성장하며 부산 힙합씬을 이끌어가는 신세대 강자',
        style: 'Hip-Hop / Urban',
        location: '부산',
        established: 'Est. 2018',
        imageUrl:
          'https://images.unsplash.com/photo-1504609813442-a8924e83f76e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
        votes: 1567,
      },
    ],
  },
]
