import { Users, Trophy, Heart, LucideProps } from 'lucide-react'

interface Achievement {
  icon: React.ComponentType<LucideProps>
  title: string
  description: string
}

export default function AboutSection() {
  const achievements: Achievement[] = [
    {
      icon: Users,
      title: '팀 정신',
      description:
        '하나의 마음으로 춤추는 크루. 개인의 개성과 팀워크의 완벽한 조화',
    },
    {
      icon: Trophy,
      title: '성취',
      description:
        '전국 대회 우승 3회, 지역 페스티벌 참가 50여 회의 화려한 경력',
    },
    {
      icon: Heart,
      title: '열정',
      description: '매주 3회 이상의 연습, 끊임없는 도전과 성장을 추구하는 열정',
    },
  ]

  return (
    <section id="about" className="about-section">
      <div className="about-section-container">
        <div className="about-section-header">
          <h2 className="about-section-title">
            <span className="about-section-title-highlight">RED CREW</span>의
            이야기
          </h2>
          <p className="about-section-description">
            {
              "가장 강렬하고 시선을 끄는 컬러 '레드'처럼, 각기 다른 개성과 매력을 지닌 멤버들이 모여 하나의 팀으로 빛나는 댄스 크루입니다"
            }
          </p>
        </div>

        <div className="about-section-content">
          <div className="about-section-image">
            <img
              src="https://images.unsplash.com/photo-1547036967-23d11aacaee0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
              alt="Dance performance on stage with dramatic lighting"
            />
          </div>

          <div className="about-section-achievements">
            {achievements.map((achievement) => (
              <div
                key={achievement.title}
                className="about-section-achievement"
              >
                <div className="about-section-achievement-icon">
                  <achievement.icon size={20} />
                </div>
                <div className="about-section-achievement-content">
                  <h3 className="about-section-achievement-title">
                    {achievement.title}
                  </h3>
                  <p className="about-section-achievement-description">
                    {achievement.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
