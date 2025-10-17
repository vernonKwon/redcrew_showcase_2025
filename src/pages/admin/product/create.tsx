import { ReactElement } from 'react'
import type { NextPageWithLayout } from '@/pages/_app'
import AdminLayout from '@/components/layout/admin-layout/AdminLayout'

const ProductCreate: NextPageWithLayout = () => {
  return (
    <div className="product-create">
      <h1>새 상품 등록</h1>
      
      <form className="product-form">
        <div className="form-group">
          <label htmlFor="name">상품명</label>
          <input type="text" id="name" className="form-input" />
        </div>
        
        <div className="form-group">
          <label htmlFor="category">카테고리</label>
          <select id="category" className="form-select">
            <option>카테고리 선택</option>
            <option>의류</option>
            <option>전자제품</option>
            <option>식품</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="price">가격</label>
          <input type="number" id="price" className="form-input" />
        </div>
        
        <div className="form-group">
          <label htmlFor="stock">재고</label>
          <input type="number" id="stock" className="form-input" />
        </div>
        
        <div className="form-group">
          <label htmlFor="description">상품 설명</label>
          <textarea id="description" className="form-textarea" rows={5}></textarea>
        </div>
        
        <div className="form-actions">
          <button type="button" className="btn-secondary">취소</button>
          <button type="submit" className="btn-primary">등록</button>
        </div>
      </form>
    </div>
  )
}

ProductCreate.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>
}

export default ProductCreate