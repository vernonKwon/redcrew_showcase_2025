import Link from 'next/link'
import { useState, useEffect } from 'react'

const RenderingComparison = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const renderingMethods = [
    {
      name: 'SSR',
      title: 'Server-Side Rendering',
      emoji: '🔄',
      color: '#e6f3ff',
      link: '/examples/ssr',
      description: '매 요청마다 서버에서 HTML 생성',
      pros: [
        'SEO 최적화',
        '항상 최신 데이터',
        '첫 페이지 로드 빠름'
      ],
      cons: [
        '서버 부하 높음',
        'TTFB(Time To First Byte) 느림',
        '캐싱 어려움'
      ],
      useCase: '실시간 데이터가 중요한 페이지 (뉴스, 전자상거래)',
      performance: {
        ttfb: '느림',
        fcp: '빠름',
        tti: '빠름',
        seo: '최상'
      }
    },
    {
      name: 'SSG',
      title: 'Static Site Generation',
      emoji: '🏗️',
      color: '#f0fff0',
      link: '/examples/ssg',
      description: '빌드 시점에 HTML 미리 생성',
      pros: [
        '매우 빠른 로딩',
        'CDN 캐싱 가능',
        'SEO 최적화',
        '서버 부하 없음'
      ],
      cons: [
        '데이터 업데이트 지연',
        '빌드 시간 증가',
        '동적 콘텐츠 제한'
      ],
      useCase: '정적 콘텐츠 (블로그, 문서, 마케팅 페이지)',
      performance: {
        ttfb: '최상',
        fcp: '최상',
        tti: '최상',
        seo: '최상'
      }
    },
    {
      name: 'CSR',
      title: 'Client-Side Rendering',
      emoji: '💻',
      color: '#fff0f5',
      link: '/examples/csr',
      description: '브라우저에서 JavaScript로 콘텐츠 생성',
      pros: [
        '풍부한 인터랙션',
        '서버 부하 최소',
        '빠른 페이지 전환',
        'SPA 구현 용이'
      ],
      cons: [
        'SEO 불리',
        '초기 로딩 느림',
        'JavaScript 필수',
        '큰 번들 크기'
      ],
      useCase: '인터랙티브 웹앱 (대시보드, 어드민, SaaS)',
      performance: {
        ttfb: '빠름',
        fcp: '느림',
        tti: '느림',
        seo: '낮음'
      }
    }
  ]

  return (
    <div className="container" style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>
        🚀 Next.js 렌더링 방식 비교
      </h1>

      <div style={{ 
        background: '#f8f9fa',
        padding: '1.5rem',
        borderRadius: '8px',
        marginBottom: '2rem'
      }}>
        <h2>📚 렌더링 방식 개요</h2>
        <p>Next.js는 페이지별로 다른 렌더링 방식을 선택할 수 있습니다.</p>
        <p>각 방식은 장단점이 있으며, 사용 사례에 따라 적절한 방식을 선택해야 합니다.</p>
        {mounted && (
          <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '1rem' }}>
            💡 현재 이 페이지는 기본 CSR로 렌더링되고 있습니다.
          </p>
        )}
      </div>

      <div style={{ 
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        {renderingMethods.map((method) => (
          <div key={method.name} style={{
            background: method.color,
            padding: '1.5rem',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            transition: 'transform 0.3s',
            cursor: 'pointer'
          }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              marginBottom: '1rem' 
            }}>
              <span style={{ fontSize: '2rem', marginRight: '0.5rem' }}>
                {method.emoji}
              </span>
              <h3 style={{ margin: 0 }}>{method.title}</h3>
            </div>
            
            <p style={{ fontWeight: 'bold' }}>{method.name}</p>
            <p style={{ fontSize: '0.95rem', color: '#555' }}>
              {method.description}
            </p>

            <div style={{ marginTop: '1rem' }}>
              <h4 style={{ color: '#28a745', marginBottom: '0.5rem' }}>✅ 장점</h4>
              <ul style={{ marginTop: 0, paddingLeft: '1.2rem' }}>
                {method.pros.map((pro, idx) => (
                  <li key={idx} style={{ fontSize: '0.9rem' }}>{pro}</li>
                ))}
              </ul>
            </div>

            <div style={{ marginTop: '1rem' }}>
              <h4 style={{ color: '#dc3545', marginBottom: '0.5rem' }}>❌ 단점</h4>
              <ul style={{ marginTop: 0, paddingLeft: '1.2rem' }}>
                {method.cons.map((con, idx) => (
                  <li key={idx} style={{ fontSize: '0.9rem' }}>{con}</li>
                ))}
              </ul>
            </div>

            <div style={{ 
              marginTop: '1rem',
              padding: '0.8rem',
              background: 'rgba(255,255,255,0.5)',
              borderRadius: '6px'
            }}>
              <strong>💼 적합한 사용 사례:</strong>
              <p style={{ fontSize: '0.9rem', margin: '0.3rem 0 0' }}>
                {method.useCase}
              </p>
            </div>

            <div style={{ marginTop: '1rem' }}>
              <h4 style={{ marginBottom: '0.5rem' }}>📊 성능 지표</h4>
              <div style={{ fontSize: '0.85rem' }}>
                <div>TTFB: {method.performance.ttfb}</div>
                <div>FCP: {method.performance.fcp}</div>
                <div>TTI: {method.performance.tti}</div>
                <div>SEO: {method.performance.seo}</div>
              </div>
            </div>

            <Link href={method.link}>
              <button style={{
                width: '100%',
                marginTop: '1rem',
                padding: '0.8rem',
                background: '#0066cc',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: 'bold',
                transition: 'background 0.3s'
              }}>
                {method.name} 예제 보기 →
              </button>
            </Link>
          </div>
        ))}
      </div>

      <div style={{
        background: '#fff',
        border: '2px solid #ddd',
        padding: '1.5rem',
        borderRadius: '8px',
        marginTop: '2rem'
      }}>
        <h2>🎯 렌더링 방식 선택 가이드</h2>
        
        <table style={{ 
          width: '100%', 
          borderCollapse: 'collapse',
          marginTop: '1rem'
        }}>
          <thead>
            <tr style={{ background: '#f0f0f0' }}>
              <th style={{ padding: '0.8rem', textAlign: 'left', border: '1px solid #ddd' }}>
                시나리오
              </th>
              <th style={{ padding: '0.8rem', textAlign: 'center', border: '1px solid #ddd' }}>
                추천 방식
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '0.8rem', border: '1px solid #ddd' }}>
                블로그, 문서 사이트
              </td>
              <td style={{ padding: '0.8rem', textAlign: 'center', border: '1px solid #ddd' }}>
                <span style={{ 
                  background: '#28a745', 
                  color: 'white', 
                  padding: '0.2rem 0.6rem',
                  borderRadius: '4px'
                }}>SSG</span>
              </td>
            </tr>
            <tr>
              <td style={{ padding: '0.8rem', border: '1px solid #ddd' }}>
                전자상거래 상품 페이지
              </td>
              <td style={{ padding: '0.8rem', textAlign: 'center', border: '1px solid #ddd' }}>
                <span style={{ 
                  background: '#17a2b8', 
                  color: 'white', 
                  padding: '0.2rem 0.6rem',
                  borderRadius: '4px'
                }}>SSR / ISR</span>
              </td>
            </tr>
            <tr>
              <td style={{ padding: '0.8rem', border: '1px solid #ddd' }}>
                관리자 대시보드
              </td>
              <td style={{ padding: '0.8rem', textAlign: 'center', border: '1px solid #ddd' }}>
                <span style={{ 
                  background: '#6610f2', 
                  color: 'white', 
                  padding: '0.2rem 0.6rem',
                  borderRadius: '4px'
                }}>CSR</span>
              </td>
            </tr>
            <tr>
              <td style={{ padding: '0.8rem', border: '1px solid #ddd' }}>
                실시간 뉴스/피드
              </td>
              <td style={{ padding: '0.8rem', textAlign: 'center', border: '1px solid #ddd' }}>
                <span style={{ 
                  background: '#fd7e14', 
                  color: 'white', 
                  padding: '0.2rem 0.6rem',
                  borderRadius: '4px'
                }}>SSR</span>
              </td>
            </tr>
            <tr>
              <td style={{ padding: '0.8rem', border: '1px solid #ddd' }}>
                마케팅 랜딩 페이지
              </td>
              <td style={{ padding: '0.8rem', textAlign: 'center', border: '1px solid #ddd' }}>
                <span style={{ 
                  background: '#28a745', 
                  color: 'white', 
                  padding: '0.2rem 0.6rem',
                  borderRadius: '4px'
                }}>SSG</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style={{
        marginTop: '2rem',
        padding: '1rem',
        background: '#f0f0f0',
        borderRadius: '8px',
        fontSize: '0.9rem'
      }}>
        <strong>💡 팁:</strong>
        <ul style={{ marginTop: '0.5rem' }}>
          <li>하나의 Next.js 앱에서 페이지별로 다른 렌더링 방식을 사용할 수 있습니다</li>
          <li>ISR (Incremental Static Regeneration)을 사용하면 SSG의 장점과 실시간 업데이트를 결합할 수 있습니다</li>
          <li>Next.js 13+ App Router에서는 Server Components로 더 세밀한 제어가 가능합니다</li>
        </ul>
      </div>
    </div>
  )
}

export default RenderingComparison