// Google Analytics gtag 타입 정의
interface Window {
  gtag: (
    command: 'config' | 'event' | 'js' | 'set',
    targetId: string | Date,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    config?: any,
  ) => void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dataLayer: any[]
}
