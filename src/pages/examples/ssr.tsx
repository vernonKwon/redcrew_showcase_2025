import { GetServerSideProps } from 'next'
import { useState } from 'react'

interface Product {
  id: number
  name: string
  price: number
  description: string
}

interface SSRPageProps {
  products: Product[]
  serverTime: string
  userAgent: string
}

const SSRPage = ({ products, serverTime, userAgent }: SSRPageProps) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  return (
    <div className="container" style={{ padding: '2rem' }}>
      <h1>🔄 SSR (Server-Side Rendering) 예제</h1>
      
      <div className="info-section" style={{ 
        background: '#f0f8ff', 
        padding: '1.5rem', 
        borderRadius: '8px',
        marginTop: '1rem'
      }}>
        <h2>📋 SSR 특징</h2>
        <ul>
          <li>매 요청마다 서버에서 HTML을 생성</li>
          <li>항상 최신 데이터 표시 가능</li>
          <li>SEO 최적화</li>
          <li>첫 로딩은 빠르지만, 페이지 전환시 서버 요청 필요</li>
        </ul>
      </div>

      <div className="server-info" style={{ 
        background: '#fff3cd', 
        padding: '1rem', 
        borderRadius: '8px',
        marginTop: '1rem'
      }}>
        <h3>🖥️ 서버 정보</h3>
        <p><strong>서버 시간:</strong> {serverTime}</p>
        <p><strong>User Agent:</strong> {userAgent}</p>
        <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.5rem' }}>
          💡 이 정보는 서버에서 생성되어 props로 전달됩니다. 
          새로고침할 때마다 서버 시간이 업데이트됩니다.
        </p>
      </div>

      <div className="products-section" style={{ marginTop: '2rem' }}>
        <h2>📦 상품 목록 (서버에서 생성)</h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '1rem',
          marginTop: '1rem'
        }}>
          {products.map(product => (
            <div 
              key={product.id}
              onClick={() => setSelectedProduct(product)}
              style={{ 
                border: '1px solid #ddd',
                padding: '1rem',
                borderRadius: '8px',
                cursor: 'pointer',
                background: selectedProduct?.id === product.id ? '#e8f4fd' : '#fff',
                transition: 'all 0.3s'
              }}
            >
              <h3>{product.name}</h3>
              <p style={{ color: '#0066cc', fontWeight: 'bold' }}>
                ₩{product.price.toLocaleString()}
              </p>
              <p style={{ color: '#666', fontSize: '0.9rem' }}>
                {product.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {selectedProduct && (
        <div style={{ 
          marginTop: '2rem',
          padding: '1rem',
          background: '#f8f9fa',
          borderRadius: '8px'
        }}>
          <h3>선택한 상품 (클라이언트 상태)</h3>
          <p>{selectedProduct.name} - ₩{selectedProduct.price.toLocaleString()}</p>
          <p style={{ fontSize: '0.9rem', color: '#666' }}>
            💡 이 부분은 클라이언트에서 관리되는 상태입니다.
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
          <li>페이지 소스 보기를 하면 모든 데이터가 HTML에 포함되어 있습니다</li>
          <li>새로고침할 때마다 서버 시간이 변경됩니다</li>
          <li>Network 탭에서 매 요청마다 서버 응답을 확인할 수 있습니다</li>
        </ol>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<SSRPageProps> = async (context) => {
  // 서버에서 실행되는 코드
  // eslint-disable-next-line no-console
  console.log('🔄 SSR: getServerSideProps 실행됨')
  
  // 가상의 상품 데이터 생성
  const products: Product[] = [
    {
      id: 1,
      name: 'MacBook Pro 14"',
      price: 2990000,
      description: 'M3 Pro 칩, 18GB RAM, 512GB SSD'
    },
    {
      id: 2,
      name: 'iPhone 15 Pro',
      price: 1550000,
      description: 'A17 Pro, 256GB, 티타늄'
    },
    {
      id: 3,
      name: 'AirPods Pro 2',
      price: 359000,
      description: 'ANC, USB-C 충전'
    },
    {
      id: 4,
      name: 'iPad Air',
      price: 929000,
      description: 'M2 칩, 11인치, Wi-Fi'
    }
  ]
  
  // 서버 시간
  const serverTime = new Date().toLocaleString('ko-KR', {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })
  
  // User Agent 정보
  const userAgent = context.req.headers['user-agent'] || 'Unknown'
  
  return {
    props: {
      products,
      serverTime,
      userAgent
    }
  }
}

export default SSRPage