import { useState, useEffect } from 'react'

interface User {
  id: number
  name: string
  email: string
  role: string
  lastLogin: string
}

interface Comment {
  id: number
  user: string
  text: string
  timestamp: string
}

const CSRPage = () => {
  const [users, setUsers] = useState<User[]>([])
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [newComment, setNewComment] = useState('')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // 컴포넌트 마운트 확인
    setMounted(true)
    
    // 클라이언트에서만 실행되는 데이터 로딩 시뮬레이션
    // eslint-disable-next-line no-console
    console.log('💻 CSR: useEffect에서 데이터 로딩')
    
    // 로딩 지연 시뮬레이션
    setTimeout(() => {
      // 가상의 사용자 데이터 생성
      const mockUsers: User[] = [
        {
          id: 1,
          name: '홍길동',
          email: 'hong@example.com',
          role: '관리자',
          lastLogin: new Date(Date.now() - 3600000).toLocaleString('ko-KR')
        },
        {
          id: 2,
          name: '김철수',
          email: 'kim@example.com',
          role: '사용자',
          lastLogin: new Date(Date.now() - 7200000).toLocaleString('ko-KR')
        },
        {
          id: 3,
          name: '이영희',
          email: 'lee@example.com',
          role: '에디터',
          lastLogin: new Date(Date.now() - 86400000).toLocaleString('ko-KR')
        }
      ]
      
      // 가상의 댓글 데이터
      const mockComments: Comment[] = [
        {
          id: 1,
          user: '홍길동',
          text: 'CSR은 초기 로딩은 빠르지만 데이터 로딩이 별도로 필요합니다.',
          timestamp: new Date(Date.now() - 1800000).toLocaleString('ko-KR')
        },
        {
          id: 2,
          user: '김철수',
          text: 'SPA에서 주로 사용되는 방식이네요!',
          timestamp: new Date(Date.now() - 900000).toLocaleString('ko-KR')
        }
      ]
      
      setUsers(mockUsers)
      setComments(mockComments)
      setLoading(false)
    }, 1500) // 1.5초 지연
  }, [])

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: comments.length + 1,
        user: '현재 사용자',
        text: newComment,
        timestamp: new Date().toLocaleString('ko-KR')
      }
      setComments([...comments, comment])
      setNewComment('')
    }
  }

  return (
    <div className="container" style={{ padding: '2rem' }}>
      <h1>💻 CSR (Client-Side Rendering) 예제</h1>
      
      <div className="info-section" style={{ 
        background: '#fff0f5', 
        padding: '1.5rem', 
        borderRadius: '8px',
        marginTop: '1rem'
      }}>
        <h2>📋 CSR 특징</h2>
        <ul>
          <li>JavaScript가 브라우저에서 실행되어 콘텐츠 생성</li>
          <li>초기 HTML은 거의 비어있음</li>
          <li>SPA (Single Page Application)에서 주로 사용</li>
          <li>동적 인터랙션이 많은 앱에 적합</li>
          <li>SEO에 불리 (검색 엔진이 콘텐츠를 보지 못할 수 있음)</li>
        </ul>
      </div>

      <div className="mount-info" style={{ 
        background: '#e6f3ff', 
        padding: '1rem', 
        borderRadius: '8px',
        marginTop: '1rem'
      }}>
        <h3>🖥️ 클라이언트 상태</h3>
        <p><strong>컴포넌트 마운트:</strong> {mounted ? '✅ 마운트됨' : '⏳ 대기중'}</p>
        <p><strong>현재 시간:</strong> {mounted ? new Date().toLocaleString('ko-KR') : '로딩중...'}</p>
        <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.5rem' }}>
          💡 이 페이지의 모든 데이터는 브라우저에서 JavaScript로 생성됩니다.
        </p>
      </div>

      {loading ? (
        <div style={{ 
          textAlign: 'center', 
          padding: '3rem',
          marginTop: '2rem'
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⏳</div>
          <p>데이터를 불러오는 중...</p>
          <p style={{ fontSize: '0.9rem', color: '#666' }}>
            (클라이언트에서 데이터 로딩 시뮬레이션)
          </p>
        </div>
      ) : (
        <>
          <div className="users-section" style={{ marginTop: '2rem' }}>
            <h2>👥 사용자 목록 (클라이언트에서 로드)</h2>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '1rem',
              marginTop: '1rem'
            }}>
              {users.map(user => (
                <div 
                  key={user.id}
                  onClick={() => setSelectedUser(user)}
                  style={{ 
                    border: '1px solid #ddd',
                    padding: '1rem',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    background: selectedUser?.id === user.id ? '#ffe6f0' : '#fff',
                    transition: 'all 0.3s'
                  }}
                >
                  <h4 style={{ marginTop: 0 }}>{user.name}</h4>
                  <p style={{ fontSize: '0.9rem' }}>📧 {user.email}</p>
                  <p style={{ fontSize: '0.9rem' }}>🏷️ {user.role}</p>
                  <p style={{ fontSize: '0.85rem', color: '#666' }}>
                    마지막 로그인: {user.lastLogin}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="comments-section" style={{ marginTop: '2rem' }}>
            <h2>💬 실시간 댓글 (클라이언트 상태)</h2>
            
            <div style={{ marginBottom: '1rem' }}>
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddComment()}
                placeholder="댓글을 입력하세요..."
                style={{
                  width: '70%',
                  padding: '0.5rem',
                  marginRight: '0.5rem',
                  borderRadius: '4px',
                  border: '1px solid #ddd'
                }}
              />
              <button
                onClick={handleAddComment}
                style={{
                  padding: '0.5rem 1rem',
                  background: '#0066cc',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                댓글 추가
              </button>
            </div>

            <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
              {comments.map(comment => (
                <div key={comment.id} style={{
                  background: '#f9f9f9',
                  padding: '0.8rem',
                  marginBottom: '0.5rem',
                  borderRadius: '6px',
                  borderLeft: '3px solid #0066cc'
                }}>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    marginBottom: '0.3rem'
                  }}>
                    <strong>{comment.user}</strong>
                    <span style={{ fontSize: '0.85rem', color: '#666' }}>
                      {comment.timestamp}
                    </span>
                  </div>
                  <p style={{ margin: 0 }}>{comment.text}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {selectedUser && (
        <div style={{ 
          marginTop: '2rem',
          padding: '1rem',
          background: '#f8f9fa',
          borderRadius: '8px'
        }}>
          <h3>선택한 사용자</h3>
          <p>{selectedUser.name} ({selectedUser.role})</p>
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
          <li>페이지 소스를 보면 초기 HTML에는 데이터가 없습니다</li>
          <li>새로고침할 때마다 로딩 상태가 표시됩니다</li>
          <li>Network 탭에서 별도의 데이터 요청 없이 JS에서 처리됨을 확인</li>
          <li>댓글 추가는 즉시 반영되며 서버 요청이 없습니다</li>
          <li>React DevTools에서 모든 상태를 확인할 수 있습니다</li>
        </ol>
      </div>
    </div>
  )
}

export default CSRPage