import { GetStaticProps } from 'next'
import { useState } from 'react'

interface Article {
  id: number
  title: string
  content: string
  author: string
  publishedAt: string
}

interface SSGPageProps {
  articles: Article[]
  buildTime: string
}

const SSGPage = ({ articles, buildTime }: SSGPageProps) => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null)
  const [clientTime, setClientTime] = useState<string>('')

  // 클라이언트 시간 표시 (CSR)
  const updateClientTime = () => {
    setClientTime(new Date().toLocaleString('ko-KR', {
      timeZone: 'Asia/Seoul',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }))
  }

  return (
    <div className="container" style={{ padding: '2rem' }}>
      <h1>🏗️ SSG (Static Site Generation) 예제</h1>
      
      <div className="info-section" style={{ 
        background: '#f0fff0', 
        padding: '1.5rem', 
        borderRadius: '8px',
        marginTop: '1rem'
      }}>
        <h2>📋 SSG 특징</h2>
        <ul>
          <li>빌드 시점에 HTML을 미리 생성</li>
          <li>CDN에서 제공 가능 (매우 빠른 로딩)</li>
          <li>SEO 최적화</li>
          <li>정적 콘텐츠에 적합 (블로그, 문서 사이트 등)</li>
        </ul>
      </div>

      <div className="build-info" style={{ 
        background: '#ffe6e6', 
        padding: '1rem', 
        borderRadius: '8px',
        marginTop: '1rem'
      }}>
        <h3>🏗️ 빌드 정보</h3>
        <p><strong>빌드 시간:</strong> {buildTime}</p>
        <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.5rem' }}>
          ⚠️ 이 시간은 빌드할 때 한 번만 생성되며, 새로고침해도 변경되지 않습니다.
        </p>
        
        <div style={{ marginTop: '1rem' }}>
          <button 
            onClick={updateClientTime}
            style={{
              padding: '0.5rem 1rem',
              background: '#0066cc',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            현재 시간 확인 (클라이언트)
          </button>
          {clientTime && (
            <p style={{ marginTop: '0.5rem' }}>
              <strong>클라이언트 시간:</strong> {clientTime}
            </p>
          )}
        </div>
      </div>

      <div className="articles-section" style={{ marginTop: '2rem' }}>
        <h2>📰 블로그 글 목록 (빌드 시 생성)</h2>
        <div style={{ marginTop: '1rem' }}>
          {articles.map(article => (
            <div 
              key={article.id}
              onClick={() => setSelectedArticle(article)}
              style={{ 
                border: '1px solid #ddd',
                padding: '1.5rem',
                marginBottom: '1rem',
                borderRadius: '8px',
                cursor: 'pointer',
                background: selectedArticle?.id === article.id ? '#fff9e6' : '#fff',
                transition: 'all 0.3s'
              }}
            >
              <h3 style={{ marginTop: 0 }}>{article.title}</h3>
              <div style={{ 
                display: 'flex', 
                gap: '1rem', 
                marginBottom: '0.5rem',
                fontSize: '0.9rem',
                color: '#666'
              }}>
                <span>✍️ {article.author}</span>
                <span>📅 {article.publishedAt}</span>
              </div>
              <p style={{ color: '#333' }}>{article.content}</p>
            </div>
          ))}
        </div>
      </div>

      {selectedArticle && (
        <div style={{ 
          marginTop: '2rem',
          padding: '1rem',
          background: '#f8f9fa',
          borderRadius: '8px'
        }}>
          <h3>선택한 글 (클라이언트 상태)</h3>
          <p>&quot;{selectedArticle.title}&quot; by {selectedArticle.author}</p>
          <p style={{ fontSize: '0.9rem', color: '#666' }}>
            💡 이 선택 상태는 클라이언트에서만 관리됩니다.
          </p>
        </div>
      )}

      <div style={{ 
        marginTop: '2rem',
        padding: '1rem',
        background: '#f0f0f0',
        borderRadius: '8px',
        fontSize: '0.9rem'
      }}>
        <strong>🔍 확인해보세요:</strong>
        <ol style={{ marginTop: '0.5rem' }}>
          <li>페이지 소스를 보면 모든 글이 HTML에 포함되어 있습니다</li>
          <li>새로고침해도 빌드 시간이 변경되지 않습니다</li>
          <li>Network 탭에서 HTML 파일이 캐시되어 매우 빠르게 로드됩니다</li>
          <li>yarn build 후 yarn start로 실행하면 실제 SSG 동작을 확인할 수 있습니다</li>
        </ol>
      </div>
    </div>
  )
}

export const getStaticProps: GetStaticProps<SSGPageProps> = async () => {
  // 빌드 시점에 실행되는 코드
  // eslint-disable-next-line no-console
  console.log('🏗️ SSG: getStaticProps 실행됨 (빌드 시)')
  
  // 가상의 블로그 글 데이터 생성
  const articles: Article[] = [
    {
      id: 1,
      title: 'Next.js 14의 새로운 기능',
      content: 'Next.js 14에서는 Turbopack이 안정화되고, Server Actions가 정식 지원됩니다. 개발 서버 시작 속도가 획기적으로 개선되었습니다.',
      author: '김개발',
      publishedAt: '2024-01-15'
    },
    {
      id: 2,
      title: 'React Server Components 이해하기',
      content: 'RSC는 서버에서 렌더링되는 React 컴포넌트입니다. 번들 크기를 줄이고 성능을 향상시킬 수 있는 새로운 패러다임입니다.',
      author: '이리액트',
      publishedAt: '2024-01-10'
    },
    {
      id: 3,
      title: 'TypeScript 5.0 주요 변경사항',
      content: '데코레이터가 정식 지원되고, const type parameters가 추가되었습니다. 타입 추론이 더욱 강력해졌습니다.',
      author: '박타입',
      publishedAt: '2024-01-05'
    },
    {
      id: 4,
      title: 'Tailwind CSS vs CSS-in-JS',
      content: '유틸리티 우선 CSS와 CSS-in-JS 방식의 장단점을 비교합니다. 프로젝트 특성에 맞는 선택이 중요합니다.',
      author: '최스타일',
      publishedAt: '2024-01-01'
    }
  ]
  
  // 빌드 시간
  const buildTime = new Date().toLocaleString('ko-KR', {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })
  
  return {
    props: {
      articles,
      buildTime
    },
    // ISR (Incremental Static Regeneration) 옵션
    // revalidate: 60 // 60초마다 재생성 (선택사항)
  }
}

export default SSGPage