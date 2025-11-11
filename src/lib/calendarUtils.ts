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
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${event.startTime}/${event.endTime}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}`
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
 * 캘린더에 이벤트를 추가합니다 (모바일/데스크톱 자동 분기)
 */
export const addToCalendar = (
  event: CalendarEvent,
  isMobile: boolean,
): void => {
  if (isMobile) {
    const icsBlob = generateICS(event)
    downloadICS(icsBlob, 'red-crew-final-showcase.ics')
  } else {
    const googleCalendarUrl = generateGoogleCalendarURL(event)
    window.open(googleCalendarUrl, '_blank')
  }
}
