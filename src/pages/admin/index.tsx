import { ReactElement } from 'react'
import type { NextPageWithLayout } from '@/pages/_app'
import DefaultLayout from '@/components/layout/default-layout/DefaultLayout'

const AdminDashboard: NextPageWithLayout = () => {
  return (
    <div className="admin-dashboard">
      <h1>관리자 대시보드</h1>
      
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3>오늘의 주문</h3>
          <p className="dashboard-value">24</p>
        </div>
        
        <div className="dashboard-card">
          <h3>오늘의 매출</h3>
          <p className="dashboard-value">₩1,234,000</p>
        </div>
        
        <div className="dashboard-card">
          <h3>신규 회원</h3>
          <p className="dashboard-value">12</p>
        </div>
        
        <div className="dashboard-card">
          <h3>상품 재고</h3>
          <p className="dashboard-value">342</p>
        </div>
      </div>
      
      <div className="recent-section">
        <h2>최근 주문</h2>
        <table className="admin-table">
          <thead>
            <tr>
              <th>주문번호</th>
              <th>고객명</th>
              <th>금액</th>
              <th>상태</th>
              <th>날짜</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>#2024001</td>
              <td>홍길동</td>
              <td>₩89,000</td>
              <td>배송중</td>
              <td>2024-01-15</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

AdminDashboard.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>
}

export default AdminDashboard