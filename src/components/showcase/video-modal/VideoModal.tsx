import { useEffect } from 'react'
import { X } from 'lucide-react'

interface VideoModalProps {
  isOpen: boolean
  onClose: () => void
  videoId: string
}

export default function VideoModal({
  isOpen,
  onClose,
  videoId,
}: VideoModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      // 현재 스크롤 위치 저장
      const scrollY = window.scrollY

      // 키보드 이벤트 리스너 추가
      document.addEventListener('keydown', handleEsc)

      // iOS Safari 스크롤 방지 (position: fixed 사용)
      document.body.style.overflow = 'hidden'
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = '100%'

      return () => {
        document.removeEventListener('keydown', handleEsc)

        // 원래 스크롤 위치로 복원
        document.body.style.overflow = ''
        document.body.style.position = ''
        document.body.style.top = ''
        document.body.style.width = ''
        window.scrollTo(0, scrollY)
      }
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  // iOS에서 터치 스크롤 방지
  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault()
  }

  return (
    <div
      className="video-modal-overlay"
      onClick={onClose}
      onTouchMove={handleTouchMove}
    >
      <div className="video-modal-background">
        <div className="video-modal-glow video-modal-glow--primary"></div>
        <div className="video-modal-glow video-modal-glow--secondary"></div>
        <div className="video-modal-glow video-modal-glow--accent"></div>
      </div>

      <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="video-modal-close" onClick={onClose}>
          <X size={24} />
        </button>

        <div className="video-modal-wrapper">
          <iframe
            className="video-modal-iframe"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
            title="RED CREW 파이널 쇼케이스 트레일러"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  )
}
