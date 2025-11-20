import { useState, useEffect } from 'react'
import { RotateCcw } from 'lucide-react'

export default function LandscapeWarning() {
  const [showWarning, setShowWarning] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    const checkOrientation = () => {
      // 모바일/태블릿 기기에서만 체크 (데스크탑 제외)
      const isMobile = window.innerWidth < 1024
      const isLandscape = window.innerHeight < window.innerWidth
      const isShortHeight = window.innerHeight < 600

      // 가로 모드이고, 높이가 짧고, 모바일 기기이고, 아직 닫지 않았을 때만 표시
      if (isMobile && isLandscape && isShortHeight && !isDismissed) {
        setShowWarning(true)
      } else {
        setShowWarning(false)
      }
    }

    checkOrientation()
    window.addEventListener('resize', checkOrientation)
    window.addEventListener('orientationchange', checkOrientation)

    return () => {
      window.removeEventListener('resize', checkOrientation)
      window.removeEventListener('orientationchange', checkOrientation)
    }
  }, [isDismissed])

  const handleDismiss = () => {
    setIsDismissed(true)
    setShowWarning(false)
  }

  if (!showWarning) return null

  return (
    <div className="landscape-warning">
      <div className="landscape-warning-overlay" onClick={handleDismiss}></div>
      <div className="landscape-warning-content">
        <div className="landscape-warning-icon">
          <RotateCcw size={48} />
        </div>
        <h3 className="landscape-warning-title">세로 모드를 권장합니다</h3>
        <p className="landscape-warning-message">
          가로 모드에서는 화면이 제대로 보이지 않을 수 있습니다.
          <br />
          더 나은 경험을 위해 기기를 세로로 회전해주세요.
        </p>
        <button onClick={handleDismiss} className="landscape-warning-button">
          확인
        </button>
      </div>
    </div>
  )
}
