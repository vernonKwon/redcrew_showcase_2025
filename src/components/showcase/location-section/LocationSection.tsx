import { MapPin, Train, Car } from 'lucide-react'

export default function LocationSection() {
  return (
    <section className="location-section">
      <div className="location-section-container">
        <div className="location-section-header">
          <h2 className="location-section-title">
            <span className="location-section-title-highlight">오시는</span> 길
          </h2>
          <p className="location-section-description">
            중랑구민회관 대공연장으로 오시는 방법을 안내해드립니다
          </p>
        </div>

        <div className="location-section-content">
          <div className="location-section-map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d429.56026173678606!2d127.08445234348252!3d37.5737153236846!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357cbae070abb17b%3A0x53bf658829d31a3c!2z7KSR656R6rWs66-87ZqM6rSA!5e0!3m2!1sko!2skr!4v1761389309412!5m2!1sko!2skr"
              width="600"
              height="450"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          <div className="location-section-info">
            <div className="location-section-info-card">
              <div className="location-section-info-icon">
                <MapPin size={24} />
              </div>
              <div className="location-section-info-content">
                <h3 className="location-section-info-title">주소</h3>
                <p className="location-section-info-text">
                  서울 중랑구 면목로 238
                  <br />
                  중랑구민회관 대공연장 (약 500석 규모)
                </p>
              </div>
            </div>

            <div className="location-section-info-card">
              <div className="location-section-info-icon">
                <Train size={24} />
              </div>
              <div className="location-section-info-content">
                <h3 className="location-section-info-title">대중교통</h3>
                <p className="location-section-info-text">
                  <span className="location-section-subway">지하철 7호선</span>{' '}
                  용마산역 1번 출구
                  <br />
                  도보 약 5분
                </p>
              </div>
            </div>

            <div className="location-section-info-card">
              <div className="location-section-info-icon">
                <Car size={24} />
              </div>
              <div className="location-section-info-content">
                <h3 className="location-section-info-title">주차 안내</h3>
                <p className="location-section-info-text">
                  • 용마폭포공원 공영주차장
                  <br />
                  • 중곡초등학교 공영주차장
                  <br />
                  <span className="location-section-parking-note">
                    * 주차 공간이 제한적이니 대중교통 이용을 권장합니다
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
