import { ReactElement } from 'react'
import type { NextPageWithLayout } from '@/pages/_app'
import DefaultLayout from '@/components/layout/default-layout/DefaultLayout'
import { Button } from 'antd'

const ProductEditor: NextPageWithLayout = () => {
  return (
    <div className="product-editor">
      <h2>상품 에디터</h2>
      <div className="editor-content">
        {/* 에디터 컴포넌트 */}
        <p>상품 정보를 편집할 수 있는 에디터가 여기에 표시됩니다.</p>
        <Button color="default" variant="solid">
          Solid
        </Button>
      </div>
    </div>
  )
}

ProductEditor.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>
}

export default ProductEditor
