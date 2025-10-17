import dayjs, { Dayjs } from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import duration from 'dayjs/plugin/duration'
import 'dayjs/locale/ko'

// dayjs 플러그인 확장
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(duration)

// 한국 로케일 설정
dayjs.locale('ko')

// 한국 시간대 설정
export const KST_TIMEZONE = 'Asia/Seoul'

// SSR 호환을 위한 타입 정의
type DayjsArguType = Parameters<typeof dayjs>

// 한국시간 기준으로 dayjs 인스턴스를 생성하는 함수
export const dayjsWithTimezone = (...args: DayjsArguType): Dayjs => {
  return dayjs(...args).tz(KST_TIMEZONE)
}

// 한국시간 기준으로 현재 시간을 반환하는 함수
export const now = (): Dayjs => dayjsWithTimezone()

// 특정 날짜를 한국시간으로 파싱하는 함수
export const parseKST = (date: string): Dayjs => dayjsWithTimezone(date)

// 쇼케이스 이벤트 날짜 (2025년 12월 14일 오후 2시 한국시간)
export const SHOWCASE_EVENT_DATE = parseKST('2025-12-14 14:00:00')

// 현재 시간과 이벤트 시간의 차이를 계산하는 함수
export const getTimeUntilEvent = () => {
  // SSR 환경에서는 브라우저 API를 사용할 수 없으므로 조건부 실행
  if (typeof window === 'undefined') {
    // 서버 사이드에서는 기본값 반환
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isEventPassed: false
    }
  }

  const currentTime = now()
  const difference = SHOWCASE_EVENT_DATE.diff(currentTime)
  
  if (difference <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isEventPassed: true
    }
  }
  
  const timeDuration = dayjs.duration(difference)
  
  return {
    days: Math.floor(timeDuration.asDays()),
    hours: timeDuration.hours(),
    minutes: timeDuration.minutes(),
    seconds: timeDuration.seconds(),
    isEventPassed: false
  }
}

export { dayjs }
export default dayjs