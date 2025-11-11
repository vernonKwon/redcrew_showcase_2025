import { CalendarEvent } from '@/constants/showcaseData'

/**
 * ICS 파일 형식의 캘린더 이벤트를 생성합니다
 */
export const generateICS = (event: CalendarEvent): Blob => {
  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `DTSTART:${event.startTimeUTC}`,
    `DTEND:${event.endTimeUTC}`,
    `SUMMARY:${event.title}`,
    `DESCRIPTION:${event.description}`,
    `LOCATION:${event.location}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')

  return new Blob([icsContent], { type: 'text/calendar;charset=utf-8' })
}

/**
 * Google Calendar URL을 생성합니다
 */
export const generateGoogleCalendarURL = (event: CalendarEvent): string => {
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    event.title,
  )}&dates=${event.startTime}/${event.endTime}&details=${encodeURIComponent(
    event.description,
  )}&location=${encodeURIComponent(event.location)}`
}

/**
 * ICS 파일을 다운로드합니다 (모바일용)
 */
export const downloadICS = (blob: Blob, filename = 'event.ics'): void => {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

/**
 * ICS 파일을 브라우저에서 직접 열기 (다운로드 대신)
 * 안드로이드 브라우저가 ICS 파일을 감지하면 캘린더 앱으로 전달
 */
export const openICS = (blob: Blob): void => {
  const url = URL.createObjectURL(blob)
  window.location.href = url
}

/**
 * iOS 기기인지 확인합니다
 */
export const isIOSDevice = (): boolean => {
  if (typeof window === 'undefined') return false

  const userAgent = window.navigator.userAgent.toLowerCase()
  return /iphone|ipad|ipod/.test(userAgent)
}

/**
 * Android 기기인지 확인합니다
 */
export const isAndroidDevice = (): boolean => {
  if (typeof window === 'undefined') return false

  const userAgent = window.navigator.userAgent.toLowerCase()
  return /android/.test(userAgent)
}

/**
 * Android용 Data URI (ICS 파일)을 생성합니다
 * 안드로이드도 ICS 파일을 지원하며, 다운로드 시 캘린더 앱이 자동으로 열립니다
 */
export const generateDataURI = (event: CalendarEvent): string => {
  const icsBlob = generateICS(event)
  return URL.createObjectURL(icsBlob)
}

/**
 * 안드로이드용 토스트 메시지를 화면에 표시합니다
 */
export const showAndroidToast = (message: string): void => {
  // 토스트 div 생성
  const toast = document.createElement('div')
  toast.textContent = message
  toast.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(0, 0, 0, 0.9);
    color: white;
    padding: 24px 32px;
    border-radius: 16px;
    font-size: 15px;
    line-height: 1.6;
    text-align: center;
    z-index: 10000;
    max-width: 90%;
    min-width: 280px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
    animation: fadeIn 0.3s ease-in-out;
    word-break: keep-all;
  `

  // fadeIn 애니메이션 추가
  const style = document.createElement('style')
  style.textContent = `
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translate(-50%, -50%) scale(0.9);
      }
      to {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1);
      }
    }
    @keyframes fadeOut {
      from {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1);
      }
      to {
        opacity: 0;
        transform: translate(-50%, -50%) scale(0.9);
      }
    }
  `
  document.head.appendChild(style)

  // 화면에 추가
  document.body.appendChild(toast)

  // 3초 후 페이드아웃 후 제거
  setTimeout(() => {
    toast.style.animation = 'fadeOut 0.3s ease-in-out'
    setTimeout(() => {
      document.body.removeChild(toast)
      document.head.removeChild(style)
    }, 300)
  }, 3000)
}

/**
 * 캘린더에 이벤트를 추가합니다
 * - iOS: ICS 파일 다운로드 → 캘린더 앱 자동 실행
 * - Android: ICS 파일을 브라우저에서 직접 열기 → 캘린더 앱 실행 + 안내 메시지
 * - 데스크톱: Google Calendar 웹사이트
 */
export const addToCalendar = (event: CalendarEvent): void => {
  const isIOS = isIOSDevice()
  const isAndroid = isAndroidDevice()

  if (isIOS) {
    // iOS: ICS 파일 다운로드
    const icsBlob = generateICS(event)
    downloadICS(icsBlob, 'red-crew-final-showcase.ics')
  } else if (isAndroid) {
    // Android: ICS 파일을 브라우저에서 직접 열기
    const icsBlob = generateICS(event)
    openICS(icsBlob)

    // 안내 메시지 표시
    setTimeout(() => {
      showAndroidToast(
        '다운로드 한 파일을 실행하면 캘린더 앱에서 일정을 추가할 수 있습니다',
      )
    }, 300)
  } else {
    // 데스크톱: Google Calendar 웹사이트 (새 탭)
    const googleCalendarUrl = generateGoogleCalendarURL(event)
    window.open(googleCalendarUrl, '_blank')
  }
}
