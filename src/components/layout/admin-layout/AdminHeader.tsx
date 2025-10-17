import { useRouter } from 'next/router'

const AdminHeader = () => {
  const router = useRouter()

  const handleLogout = () => {
    router.push('/')
  }

  return (
    <header className="admin-header">
      <div className="admin-header-content">
        <div className="admin-logo">
          <h1>Admin Dashboard</h1>
        </div>
        <nav className="admin-nav">
          <button className="admin-user-menu">
            <span className="admin-user-name">관리자</span>
          </button>
          <button className="admin-logout" onClick={handleLogout}>
            로그아웃
          </button>
        </nav>
      </div>
    </header>
  )
}

export default AdminHeader