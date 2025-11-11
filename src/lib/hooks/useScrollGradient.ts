import { useEffect, useRef, useState } from 'react'

interface UseScrollGradientOptions {
  /**
   * 스크롤 범위 (픽셀). 이 범위 내에서 opacity가 1에서 0으로 변경됩니다.
   * @default 100
   */
  threshold?: number
}

/**
 * 스크롤 위치에 따라 그라디언트 opacity를 계산하는 커스텀 훅
 *
 * @param options - 옵션 객체
 * @returns ref와 opacity 값
 *
 * @example
 * const { ref, opacity } = useScrollGradient({ threshold: 150 })
 *
 * <div ref={ref} style={{ '--gradient-opacity': opacity }}>
 *   ...
 * </div>
 */
export const useScrollGradient = (
  options: UseScrollGradientOptions = {},
): {
  ref: React.RefObject<HTMLDivElement>
  opacity: number
} => {
  const { threshold = 100 } = options
  const ref = useRef<HTMLDivElement>(null)
  const [opacity, setOpacity] = useState(1)

  useEffect(() => {
    const scrollContainer = ref.current
    if (!scrollContainer) return

    const handleScroll = () => {
      const { scrollLeft } = scrollContainer
      // 스크롤 0~threshold 범위를 opacity 1~0으로 매핑
      const newOpacity = Math.max(0, Math.min(1, 1 - scrollLeft / threshold))
      setOpacity(newOpacity)
    }

    scrollContainer.addEventListener('scroll', handleScroll)
    // 초기 상태 체크
    handleScroll()

    return () => scrollContainer.removeEventListener('scroll', handleScroll)
  }, [threshold])

  return { ref, opacity }
}
