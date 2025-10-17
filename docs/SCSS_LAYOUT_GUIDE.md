# SCSS 레이아웃 및 스타일 시스템 가이드

## 📍 시스템 개요

이 프로젝트는 Next.js의 Pages Router와 함께 SCSS 모듈 시스템을 사용합니다.

- **기본 레이아웃**: DefaultLayout 컴포넌트 (헤더/푸터 포함)
- **관리자 레이아웃**: AdminLayout 컴포넌트 (관리자 헤더/사이드바 포함)
- **빈 레이아웃**: EmptyLayout 컴포넌트 (공통 컴포넌트 없음)
- **전역 스타일**: `src/styles/globals.scss` 자동 적용
- **관리자 스타일**: `src/styles/admin-layout.scss`, `src/styles/admin-common.scss`
- **스타일 제어**: 페이지별로 전역 스타일 비활성화 가능

## 🎨 레이아웃 사용 패턴

### 1. 기본 사용 (DefaultLayout 자동 적용)

별도 설정 없이 페이지를 만들면 자동으로 DefaultLayout이 적용됩니다.

```typescript
// pages/example.tsx
const ExamplePage = () => {
  return <div>페이지 내용</div>
}

export default ExamplePage
```

### 2. AdminLayout 사용 (관리자 페이지 전용)

관리자 페이지에서 사용하는 레이아웃으로, 관리자 헤더와 사이드바를 포함합니다.

```typescript
// pages/admin/index.tsx
import { ReactElement } from 'react'
import type { NextPageWithLayout } from '@/pages/_app'
import AdminLayout from '@/components/layout/admin-layout/AdminLayout'

const AdminDashboard: NextPageWithLayout = () => {
  return (
    <div className="admin-dashboard">
      <h1>관리자 대시보드</h1>
      {/* 관리자 대시보드 내용 */}
    </div>
  )
}

// AdminLayout 적용으로 관리자 UI 표시
AdminDashboard.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>
}

export default AdminDashboard
```

### 3. EmptyLayout 사용 (공통 컴포넌트 제거)

헤더, 푸터 등 공통 컴포넌트 없이 페이지를 렌더링하고 싶을 때 사용합니다.

```typescript
// pages/fullscreen-editor.tsx
import { ReactElement } from 'react'
import type { NextPageWithLayout } from '@/pages/_app'
import EmptyLayout from '@/components/layout/EmptyLayout'

const FullscreenEditor: NextPageWithLayout = () => {
  return <div>에디터 콘텐츠만 표시</div>
}

// EmptyLayout 적용으로 공통 컴포넌트 제거
FullscreenEditor.getLayout = function getLayout(page: ReactElement) {
  return <EmptyLayout>{page}</EmptyLayout>
}

export default FullscreenEditor
```

### 4. 전역 스타일도 함께 비활성화

EmptyLayout과 함께 전역 스타일도 비활성화하려면:

```typescript
// pages/no-styles.tsx
import type { ReactElement } from 'react'
import type { NextPageWithLayout } from '@/pages/_app'
import EmptyLayout from '@/components/layout/EmptyLayout'

const NoStylesPage: NextPageWithLayout = () => {
  return (
    <div>
      <h1>완전히 독립적인 페이지</h1>
      <style jsx>{`
        div {
          padding: 20px;
          font-family: system-ui, -apple-system, sans-serif;
        }
      `}</style>
    </div>
  )
}

// 빈 레이아웃 사용
NoStylesPage.getLayout = function getLayout(page: ReactElement) {
  return <EmptyLayout>{page}</EmptyLayout>
}

// 전역 스타일도 비활성화
NoStylesPage.disableGlobalStyles = true

export default NoStylesPage
```

## 📋 레이아웃 선택 가이드

| 시나리오 | 레이아웃 | 헤더/푸터 | 관리자 UI | 전역 스타일 | 사용 예시 |
|---------|---------|----------|----------|------------|---------|
| 일반 페이지 | DefaultLayout | ✅ | ❌ | ✅ | 메인, 상품목록, 회원가입 |
| 관리자 페이지 | AdminLayout | ❌ | ✅ | ✅ | 관리자 대시보드, 상품관리 |
| 풀스크린 에디터 | EmptyLayout | ❌ | ❌ | ✅ | 에디터, 뷰어 |
| 완전 독립 페이지 | EmptyLayout + disableGlobalStyles | ❌ | ❌ | ❌ | 커스텀 랜딩페이지 |

## 💡 상세 사용 예시

### AdminLayout 구성 및 특징

AdminLayout은 관리자 페이지 전용 레이아웃으로 다음 구성 요소를 포함합니다:

#### 구성 요소
- **AdminHeader**: 상단 헤더 (60px 고정 높이)
  - 관리자 로고 "Admin Dashboard"
  - 사용자 정보 버튼
  - 로그아웃 버튼
- **AdminSidebar**: 좌측 사이드바 (240px 고정 너비)
  - 대시보드, 상품관리, 주문관리, 고객관리, 통계, 설정 메뉴
  - Ant Design Menu 컴포넌트 사용
  - 하위 메뉴 지원 (상품 관리 > 상품 목록/등록/에디터)
- **AdminMain**: 메인 콘텐츠 영역
  - 헤더/사이드바를 제외한 나머지 영역
  - 모바일에서는 사이드바가 숨겨짐

#### 실제 사용 예시

```typescript
// pages/admin/product/editor.tsx - 상품 에디터
import { ReactElement } from 'react'
import type { NextPageWithLayout } from '@/pages/_app'
import AdminLayout from '@/components/layout/admin-layout/AdminLayout'
import { Button } from 'antd'

const ProductEditor: NextPageWithLayout = () => {
  return (
    <div className="product-editor">
      <h2>상품 에디터</h2>
      <div className="editor-content">
        <p>상품 정보를 편집할 수 있는 에디터가 여기에 표시됩니다.</p>
        <Button color="default" variant="solid">
          저장
        </Button>
      </div>
    </div>
  )
}

ProductEditor.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>
}

export default ProductEditor
```

### 풀스크린 에디터
```typescript
// pages/editor/fullscreen.tsx
import { ReactElement } from 'react'
import type { NextPageWithLayout } from '@/pages/_app'
import EmptyLayout from '@/components/layout/EmptyLayout'

const FullscreenEditor: NextPageWithLayout = () => {
  return (
    <div className="fullscreen-editor">
      {/* 에디터 UI */}
    </div>
  )
}

FullscreenEditor.getLayout = function getLayout(page: ReactElement) {
  return <EmptyLayout>{page}</EmptyLayout>
}

export default FullscreenEditor
```

## 📁 SCSS 파일 구조

```
src/styles/
├── _variables.scss      # 색상, 브레이크포인트 등 변수 정의
├── _mixins.scss         # 반응형 및 재사용 가능한 믹스인
├── globals.scss         # 전역 스타일 (reset, 기본 스타일)
├── globals-loader.scss  # 전역 스타일 로더
├── admin-layout.scss    # 관리자 레이아웃 전용 스타일
├── admin-common.scss    # 관리자 페이지 공통 컴포넌트 스타일
├── error-404.scss       # 404 에러 페이지 스타일
├── error-404-realistic.scss # 현실적인 404 에러 페이지 스타일
└── components/
    ├── header/footer.scss           # 헤더/푸터 스타일
    └── layout/DefaultLayout.scss    # 기본 레이아웃 스타일
```

### 스타일 적용 방식

프로젝트는 **자동 전역 스타일 적용** 방식을 사용합니다:

1. **전역 스타일**: `src/styles/globals.scss`가 모든 페이지에 자동 적용
2. **관리자 스타일**: `admin-layout.scss`, `admin-common.scss`가 관리자 페이지에 자동 적용
3. **컴포넌트 스타일**: className으로 직접 참조 (예: `className="container"`)
4. **별도 import 불필요**: SCSS 파일을 명시적으로 import하지 않아도 자동 적용

## 💡 SCSS 모듈 사용법

### 컴포넌트 스타일 파일 작성

```scss
// Component.module.scss
@import '@/styles/variables';
@import '@/styles/mixins';

.container {
  color: $primary;
  padding: $spacing-md;
  
  // 반응형 스타일
  @include mobile {
    font-size: 14px;
    padding: $spacing-sm;
  }
  
  @include tablet {
    font-size: 16px;
    padding: $spacing-md;
  }
  
  @include desktop {
    font-size: 18px;
    padding: $spacing-lg;
  }
}

.title {
  color: $text-primary;
  margin-bottom: $spacing-md;
  
  &:hover {
    color: $primary;
  }
}
```

### 컴포넌트에서 사용

```typescript
import styles from './Component.module.scss'

export default function Component() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>제목</h1>
    </div>
  )
}
```

## 🔧 관리자 스타일 시스템

### admin-layout.scss - 레이아웃 구조

관리자 레이아웃의 기본 구조와 배치를 정의합니다:

```scss
// 레이아웃 구조
.admin-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f5f5f5;
}

.admin-header {
  position: fixed;           // 상단 고정
  top: 0;
  height: 60px;             // 헤더 높이
  background-color: #fff;
  z-index: 100;
}

.admin-sidebar {
  position: fixed;           // 좌측 고정
  top: 60px;
  width: 240px;             // 사이드바 너비
  background-color: #fff;
}

.admin-main {
  margin-left: 240px;       // 사이드바 너비만큼 여백
  padding-top: 60px;        // 헤더 높이만큼 여백
  padding: 24px;
  min-height: calc(100vh - 60px);
}
```

### admin-common.scss - 공통 컴포넌트

관리자 페이지에서 자주 사용되는 UI 컴포넌트들을 정의합니다:

#### 대시보드 카드
```scss
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.dashboard-card {
  background: #fff;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
```

#### 관리자 테이블
```scss
.admin-table {
  width: 100%;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  
  thead th {
    background-color: #f8f9fa;
    padding: 16px;
    font-weight: 600;
  }
  
  tbody td {
    padding: 16px;
    border-bottom: 1px solid #f0f0f0;
  }
}
```

#### 폼 컴포넌트
```scss
.product-form {
  background: #fff;
  padding: 32px;
  border-radius: 8px;
  max-width: 800px;
}

.form-group {
  margin-bottom: 24px;
  
  label {
    display: block;
    margin-bottom: 8px;
    font-weight: 600;
  }
  
  .form-input {
    width: 100%;
    padding: 10px 16px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
}
```

### 관리자 페이지에서 스타일 사용하기

관리자 페이지에서는 다음과 같이 클래스명을 직접 사용합니다:

```typescript
// pages/admin/index.tsx
const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <h1>관리자 대시보드</h1>
      
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3>오늘의 주문</h3>
          <p className="dashboard-value">24</p>
        </div>
      </div>
      
      <table className="admin-table">
        <thead>
          <tr>
            <th>주문번호</th>
            <th>고객명</th>
          </tr>
        </thead>
      </table>
    </div>
  )
}
```

## 🎯 브레이크포인트 사용법

프로젝트에 정의된 반응형 브레이크포인트:

- **Mobile**: 최대 768px
- **Tablet**: 769px ~ 1024px  
- **Desktop**: 1025px 이상

```scss
// 모바일 우선 접근법
.element {
  // 기본 (모바일) 스타일
  font-size: 14px;
  
  @include tablet {
    font-size: 16px;
  }
  
  @include desktop {
    font-size: 18px;
  }
}
```

## 🔧 자주 사용하는 SCSS 변수

```scss
// 색상
$primary: #007bff;
$secondary: #6c757d;
$success: #28a745;
$danger: #dc3545;
$warning: #ffc107;

// 텍스트 색상
$text-primary: #333;
$text-secondary: #666;
$text-muted: #999;

// 간격
$spacing-xs: 0.25rem;
$spacing-sm: 0.5rem;
$spacing-md: 1rem;
$spacing-lg: 1.5rem;
$spacing-xl: 2rem;

// 그림자
$shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.1);
$shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
$shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
```

## ⚡ 최적화 팁

### 일반 컴포넌트
1. **SCSS 모듈 사용**: 전역 네임스페이스 오염 방지
2. **변수와 믹스인 활용**: 일관된 디자인 시스템 유지
3. **중복 import 피하기**: _app.tsx에서 전역 스타일은 한 번만 import
4. **조건부 스타일링**: 필요시 classnames 라이브러리 활용

```typescript
import cn from 'classnames'
import styles from './Component.module.scss'

function Component({ isActive, variant }) {
  return (
    <div className={cn(
      styles.container,
      { [styles.active]: isActive },
      styles[variant]
    )}>
      내용
    </div>
  )
}
```

### 관리자 페이지 최적화
1. **AdminLayout 재사용**: 모든 관리자 페이지에서 동일한 레이아웃 사용
2. **전역 관리자 스타일 활용**: `admin-common.scss` 클래스 적극 활용
3. **Ant Design 컴포넌트**: 사이드바 메뉴, 버튼 등에 Ant Design 활용
4. **모바일 반응형**: 관리자 레이아웃도 모바일 대응 고려

```typescript
// 관리자 페이지 컴포넌트 예시
import { ReactElement } from 'react'
import type { NextPageWithLayout } from '@/pages/_app'
import AdminLayout from '@/components/layout/admin-layout/AdminLayout'

const AdminPage: NextPageWithLayout = () => {
  return (
    <div className="admin-dashboard">  {/* admin-common.scss 클래스 */}
      <div className="page-header">
        <h1>페이지 제목</h1>
      </div>
      <div className="admin-table">     {/* 공통 테이블 스타일 */}
        {/* 테이블 내용 */}
      </div>
    </div>
  )
}

AdminPage.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>
}

export default AdminPage
```

### 성능 고려사항
- **코드 분할**: 관리자 페이지는 일반 사용자에게 로드되지 않음
- **스타일 분리**: 관리자 스타일은 관리자 페이지에서만 로드
- **Ant Design 최적화**: 필요한 컴포넌트만 import하여 번들 크기 최소화