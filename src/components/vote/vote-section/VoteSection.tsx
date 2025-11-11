import { useState } from 'react'
import { Heart, Star, Clock, Users, ArrowLeft, MapPin } from 'lucide-react'
import Link from 'next/link'
import { voteCategories, VoteOption } from '@/constants/voteData'

export default function VoteSection() {
  const [selectedVotes, setSelectedVotes] = useState<Record<string, string>>({})
  const [hasVoted, setHasVoted] = useState<Record<string, boolean>>({})

  const handleVote = (categoryId: string, optionId: string) => {
    if (hasVoted[categoryId]) return

    setSelectedVotes((prev) => ({
      ...prev,
      [categoryId]: optionId,
    }))
  }

  const submitVote = (categoryId: string) => {
    if (!selectedVotes[categoryId]) return

    setHasVoted((prev) => ({
      ...prev,
      [categoryId]: true,
    }))

    // 여기서 실제 투표 API 호출 예정
    alert('투표가 완료되었습니다! 감사합니다.')
  }

  const getTotalVotes = (options: VoteOption[]) => {
    return options.reduce((total, option) => total + option.votes, 0)
  }

  return (
    <section className="vote-section">
      <div className="vote-section-background">
        <div className="vote-section-gradient"></div>
      </div>

      <div className="vote-section-container">
        <Link href="/" className="vote-section-back-link">
          <ArrowLeft size={20} />
          홈으로 돌아가기
        </Link>

        <div className="vote-section-header">
          <h1 className="vote-section-title">
            <span className="vote-section-title-highlight">게스트 팀</span>{' '}
            인기투표
          </h1>
          <p className="vote-section-description">
            파이널 쇼케이스를 함께 빛낼 최고의 게스트 팀들. 여러분이 가장
            기대하는 팀에게 투표해주세요.
            <br />
            모든 투표는 파이널 쇼케이스 구성과 협업 계획에 소중한 자료가 됩니다.
          </p>
        </div>

        <div className="vote-section-categories">
          {voteCategories.map((category) => {
            const totalVotes = getTotalVotes(category.options)
            const IconComponent = category.icon

            return (
              <div key={category.id} className="vote-section-category">
                <div className="vote-section-category-header">
                  <div className="vote-section-category-icon">
                    <IconComponent size={24} />
                  </div>
                  <div className="vote-section-category-info">
                    <h2 className="vote-section-category-title">
                      {category.title}
                    </h2>
                    <p className="vote-section-category-description">
                      {category.description}
                    </p>
                    <div className="vote-section-category-stats">
                      <Users size={16} />
                      <span>총 {totalVotes.toLocaleString()}명 참여</span>
                    </div>
                  </div>
                </div>

                <div className="vote-section-options">
                  {category.options.map((option) => {
                    const isSelected = selectedVotes[category.id] === option.id
                    const isVoted = hasVoted[category.id]

                    return (
                      <div
                        key={option.id}
                        className={`vote-section-option ${
                          isSelected ? 'vote-section-option--selected' : ''
                        } ${isVoted ? 'vote-section-option--voted' : ''}`}
                        onClick={() => handleVote(category.id, option.id)}
                      >
                        <div className="vote-section-option-image">
                          <img src={option.imageUrl} alt={option.title} />
                        </div>

                        <div className="vote-section-option-content">
                          <h3 className="vote-section-option-title">
                            {option.title}
                          </h3>
                          <div className="vote-section-option-meta">
                            <span className="vote-section-option-location">
                              <MapPin size={14} />
                              {option.location}
                            </span>
                            <span className="vote-section-option-established">
                              {option.established}
                            </span>
                          </div>
                          <p className="vote-section-option-description">
                            {option.description}
                          </p>
                        </div>

                        {isSelected && !isVoted && (
                          <div className="vote-section-option-selected">✓</div>
                        )}
                      </div>
                    )
                  })}
                </div>

                {selectedVotes[category.id] && !hasVoted[category.id] && (
                  <div className="vote-section-submit">
                    <button
                      onClick={() => submitVote(category.id)}
                      className="vote-section-submit-button"
                    >
                      <Star size={20} />
                      투표하기
                    </button>
                  </div>
                )}

                {hasVoted[category.id] && (
                  <div className="vote-section-voted">
                    <div className="vote-section-voted-message">
                      <Heart size={20} />
                      <span>소중한 투표 감사합니다!</span>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <div className="vote-section-footer">
          <div className="vote-section-footer-content">
            <h3 className="vote-section-footer-title">투표 기간</h3>
            <div className="vote-section-footer-info">
              <Clock size={20} />
              <span>2025년 11월 1일 ~ 2025년 12월 10일</span>
            </div>
            <p className="vote-section-footer-note">
              * 투표 결과는 파이널 쇼케이스 구성에 참고되며, 최종 결과는 12월
              11일 발표됩니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
