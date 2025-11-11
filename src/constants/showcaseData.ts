import { Calendar, MapPin, Ticket, LucideProps } from 'lucide-react'

export interface EventDetail {
  icon: React.ComponentType<LucideProps>
  title: string
  primary: string
  secondary: string
  tertiary?: string
  url: string
}

export interface Highlight {
  title: string
  description: string
}

export interface CalendarEvent {
  title: string
  description: string
  location: string
  startTime: string
  endTime: string
  startTimeUTC: string
  endTimeUTC: string
}

export const eventDetails: EventDetail[] = [
  {
    icon: Calendar,
    title: '일정',
    primary: '2025년 12월 14일',
    secondary: '오후 2:00 - 6:00',
    tertiary: '클릭하여 구글 캘린더/iOS 캘린더에 추가',
    url: '',
  },
  {
    icon: MapPin,
    title: '장소',
    primary: '중랑구민회관 대공연장',
    secondary: '서울특별시 중랑구 · 약 500석 규모',
    tertiary: '지하철 7호선 용마산역 1번 출구 도보 5분',
    url: 'https://naver.me/xBwKuRs6',
  },
  {
    icon: Ticket,
    title: '티켓',
    primary: '10,000원',
    secondary: '전석 지정석',
    tertiary: '카메라석 별도 운영 / 공식촬영 방해 시 퇴장 조치',
    url: 'https://aq.gy/f/CsqJl',
  },
]

export const highlights: Highlight[] = [
  {
    title: '시그니처 스테이지',
    description: '각 팀의 과거와 현재의 대표곡을 보여주는 무대',
  },
  {
    title: '조커 스테이지',
    description: '각 팀의 성격과 정반대인 컨셉의 무대',
  },
  {
    title: '포지션 스테이지',
    description: '리더와 멤버가 각각 무대를 준비하여 대결하는 무대',
  },
  {
    title: '스페셜 스테이지',
    description: '레드크루 쇼케이스에서만 볼 수 있는 레전드 무대',
  },
]

export const calendarEvent: CalendarEvent = {
  title: 'RED CREW 파이널 쇼케이스',
  description: '레드크루의 10년을 마무리하는 파이널 쇼케이스',
  location: '중랑구민회관 대공연장, 서울특별시 중랑구',
  startTime: '20251214T140000', // 2025-12-14 14:00 KST
  endTime: '20251214T180000', // 2025-12-14 18:00 KST
  startTimeUTC: '20251214T050000Z', // 2025-12-14 14:00 KST = 05:00 UTC
  endTimeUTC: '20251214T090000Z', // 2025-12-14 18:00 KST = 09:00 UTC
}
