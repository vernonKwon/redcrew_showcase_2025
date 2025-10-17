import { ReactElement } from 'react'
import type { NextPageWithLayout } from '@/pages/_app'
import DefaultLayout from '@/components/layout/default-layout/DefaultLayout'
import Link from 'next/link'

const ProductList: NextPageWithLayout = () => {
  return (
    <div className="product-list">
      <div className="page-header">
        <h1>상품 관리</h1>
        <Link href="/admin/product/create" className="btn-primary">
          새 상품 등록
        </Link>
      </div>
      
      <div className="filter-section">
        <input 
          type="text" 
          placeholder="상품명으로 검색..." 
          className="search-input"
        />
        <select className="filter-select">
          <option>전체 카테고리</option>
          <option>의류</option>
          <option>전자제품</option>
          <option>식품</option>
        </select>
      </div>
      
      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>상품명</th>
            <th>카테고리</th>
            <th>가격</th>
            <th>재고</th>
            <th>상태</th>
            <th>작업</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>#001</td>
            <td>샘플 상품 1</td>
            <td>의류</td>
            <td>₩29,000</td>
            <td>45</td>
            <td>판매중</td>
            <td>
              <Link href="/admin/product/editor">편집</Link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

ProductList.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>
}

export default ProductList