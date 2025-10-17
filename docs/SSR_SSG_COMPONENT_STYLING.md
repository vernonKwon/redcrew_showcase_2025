# SSR/SSG에서 공통 컴포넌트 스타일 렌더링 가이드

## 개요

Next.js 프로젝트에서 Header, Footer, AdminLayout과 같은 공통 컴포넌트의 스타일을 SSR(Server-Side Rendering)과 SSG(Static Site Generation) 환경에서 JavaScript 비활성화 상태에서도 완벽하게 렌더링하는 방법을 설명합니다.

**이 프로젝트의 핵심 목표:**
- SSR/SSG/CSR 렌더링 방식을 설명하는 예제 페이지들이 모든 환경에서 완벽하게 작동
- JavaScript 비활성화 상태에서도 Header, Footer 등 공통 컴포넌트의 스타일이 완전히 적용
- 간단하고 유지보수 가능한 스타일링 아키텍처 구축

## 문제 상황

### 개발 환경에서의 문제점

1. **CSS-in-JS 의존성**: 개발 모드에서 CSS가 JavaScript 번들에 포함되어 로드됨
2. **JavaScript 비활성화 시 스타일 누락**: 클라이언트에서 JavaScript가 비활성화되면 스타일이 적용되지 않음
3. **FOUC (Flash of Unstyled Content)**: 페이지 로드 시 스타일이 적용되지 않은 상태가 잠깐 노출됨

### 프로덕션 환경에서의 요구사항

- **완전한 SSR/SSG 호환성**: 서버사이드에서 렌더링된 HTML에 스타일이 포함되어야 함
- **JavaScript 비활성화 환경 지원**: 스크린 리더, 검색 엔진 크롤러 등
- **성능 최적화**: Critical CSS가 우선 로드되어야 함

## 해결 방법

### 1. 스타일 아키텍처 설계

#### 현재 프로젝트 구조
```
src/
├── styles/
│   ├── globals.scss              # 전역 스타일 + 컴포넌트 import
│   ├── globals-loader.scss       # SSR 빌드용 스타일 로더
│   ├── _variables.scss           # SCSS 변수
│   ├── _mixins.scss             # SCSS 믹스인
│   ├── admin-layout.scss         # 어드민 레이아웃 스타일
│   ├── admin-common.scss         # 어드민 공통 스타일
│   ├── error-404.scss           # 404 페이지 스타일
│   └── error-404-realistic.scss  # 리얼리스틱 404 스타일
├── components/
│   ├── header/
│   │   ├── header.tsx           # 메인 헤더 컴포넌트
│   │   └── header.scss          # 헤더 스타일 (상세한 검색바, 카트 뱃지 등)
│   ├── footer/
│   │   ├── footer.tsx           # 메인 푸터 컴포넌트
│   │   └── footer.scss          # 푸터 스타일 (회사정보, 고객센터 등)
│   └── layout/
│       ├── default-layout/
│       │   ├── DefaultLayout.tsx
│       │   └── DefaultLayout.scss
│       ├── admin-layout/         # 어드민 전용 레이아웃
│       │   ├── AdminLayout.tsx
│       │   ├── AdminHeader.tsx
│       │   └── AdminSidebar.tsx
│       └── EmptyLayout.tsx       # 레이아웃 없는 페이지용
└── pages/
    ├── _app.tsx                 # Redux Provider + 글로벌 스타일
    ├── _document.tsx            # Ant Design CSS 추출
    ├── examples/                # SSR/SSG/CSR 설명 페이지들
    │   ├── index.tsx           # 렌더링 방식 비교 메인
    │   ├── ssr.tsx             # SSR 예제 (서버사이드 상품 데이터)
    │   ├── ssg.tsx             # SSG 예제 (빌드타임 블로그 글)
    │   └── csr.tsx             # CSR 예제 (클라이언트 사용자 데이터)
    └── admin/                   # 어드민 페이지들
        ├── index.tsx
        └── product/
            ├── index.tsx
            ├── create.tsx
            └── editor.tsx
```

### 2. 스타일 모듈화 및 Import 구조

#### globals.scss (실제 구현)
```scss
@import "./variables";
@import "./mixins";

// 레이아웃 컴포넌트 스타일 (SSR/SSG 호환)
@import "../components/header/header";
@import "../components/footer/footer";
@import "../components/layout/default-layout/DefaultLayout";

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
  min-height: 100%;
}

body {
  font-family:
    "Pretendard",
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    "Roboto",
    "Oxygen",
    "Ubuntu",
    "Cantarell",
    "Fira Sans",
    "Droid Sans",
    "Helvetica Neue",
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $font-color-primary;
}

#__next {
  min-height: 100vh;
}

// 전역 스타일을 특정 클래스 아래에만 적용
.with-global-styles {
  min-height: 100vh;
  font-family: $font-family;
  font-size: $font-size-base;
  line-height: $line-height-base;
  color: $font-color-primary;
  background-color: $background-color;

  // 기본 요소 스타일
  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    cursor: pointer;
    border: none;
    background: none;
    font-family: inherit;
  }

  input,
  textarea,
  select {
    font-family: inherit;
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  // 기본 컨테이너
  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;

    @include mobile {
      padding: 0 16px;
    }
  }

  // 컴포넌트별 스타일
  @import "./components/_home";
}

// no-global-styles 클래스를 위한 최소 스타일
.no-global-styles {
  min-height: 100vh;
}
```

**핵심 특징:**
- `.with-global-styles` 클래스를 통한 조건부 스타일 적용
- 페이지별로 전역 스타일 활성화/비활성화 가능
- 모든 컴포넌트 스타일이 한 번에 로드되어 SSR/SSG에서 완벽 작동

#### next.config.mjs (현재 구현)
```javascript
/** @type {import('next').NextConfig} */
import withBundleAnalyzer from '@next/bundle-analyzer';
import path from 'path'
import { fileURLToPath } from "url"; 

const __dirname = fileURLToPath(new URL(".", import.meta.url));

const bundleAnalyzer = withBundleAnalyzer({
	enabled: process.env.ANALYZE === 'true',
})

const nextConfig = {
  reactStrictMode: false,
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/styles')],
    prependData: `
      @import "@/styles/variables";
      @import "@/styles/mixins";
    `
  },
  transpilePackages: [
    'antd',
    '@ant-design/icons',
    '@ant-design/icons-svg',
    '@ant-design/cssinjs',
    'rc-util',
    'rc-pagination',
    'rc-picker',
    'rc-tree',
    'rc-table',
    'rc-tooltip',
    'rc-dropdown',
    'rc-menu',
    'rc-tabs',
    'rc-dialog',
    'rc-drawer',
    'rc-motion',
    'rc-steps',
    'rc-field-form',
    'rc-input',
    'rc-input-number',
    'rc-mentions',
    'rc-notification',
    'rc-progress',
    'rc-rate',
    'rc-resize-observer',
    'rc-segmented',
    'rc-select',
    'rc-slider',
    'rc-switch',
    'rc-textarea',
    'rc-upload',
    'rc-virtual-list',
    'rc-image',
    'rc-tour',
    'rc-tree-select',
    'rc-cascader',
    'rc-checkbox',
    'rc-collapse',
    'rc-trigger'
  ],
};

export default bundleAnalyzer(nextConfig)
```

**핵심 특징:**
- **번들 분석기 포함**: `ANALYZE=true yarn build`로 번들 크기 분석 가능
- **완전한 Ant Design 지원**: 모든 rc-* 컴포넌트 트랜스파일 포함
- **최소한의 설정**: Next.js 기본 CSS 추출 기능만 사용
- **ES Module 지원**: import/export 구문 사용

### 3. Next.js CSS 추출 및 SSR 최적화

#### _document.tsx 설정
```typescript
import { Html, Head, Main, NextScript } from 'next/document'
import { createCache, extractStyle, StyleProvider } from '@ant-design/cssinjs'
import Document from 'next/document'
import type { DocumentContext } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const cache = createCache()
    const originalRenderPage = ctx.renderPage
    
    const enhancedCtx = {
      ...ctx,
      renderPage: () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            (
              <StyleProvider cache={cache}>
                <App {...props} />
              </StyleProvider>
            ),
        })
    }

    const initialProps = await Document.getInitialProps(enhancedCtx)
    const style = extractStyle(cache, true)
    
    // Ant Design CSS만 추출하고, 컴포넌트 스타일은 SCSS 파일을 통해 처리
    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          <style dangerouslySetInnerHTML={{ __html: style }} />
        </>
      ),
    }
  }

  render() {
    return (
      <Html lang="ko">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
```

**핵심 포인트:**
- **인라인 CSS 제거**: Critical CSS를 인라인으로 삽입하지 않고 SCSS 파일을 통해서만 관리
- **Next.js 기본 CSS 추출**: 복잡한 webpack 설정 없이 Next.js 기본 기능으로 모든 스타일이 별도 CSS 파일로 추출됨
- **Ant Design CSS만 처리**: `_document.tsx`는 Ant Design 컴포넌트의 CSS만 추출하고, 나머지는 SCSS 파일이 담당

### 4. 실제 컴포넌트 구현 예시

#### Header 컴포넌트 (src/components/header/header.tsx)
```typescript
import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

// 간단한 아이콘 컴포넌트들
const SearchIcon = () => '🔍'
const CartIcon = () => '🛒'
const UserIcon = () => '👤'

const Header = () => {
  const router = useRouter()
  const cartItemCount = 1

  const navLinks = [
    { name: '전체상품', href: '/products' },
    { name: '문구류', href: '/stationery' },
    { name: '사무기기', href: '/equipment' },
    { name: '인테리어', href: '/interior' },
  ]

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <Link href="/">OFFICELAB</Link>
        </div>

        <nav className="nav">
          <ul>
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className={router.pathname === link.href ? 'active' : ''}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="utils">
          <form className="search-form">
            <input type="text" placeholder="원하는 상품을 검색하세요" />
            <button type="submit">
              <SearchIcon />
            </button>
          </form>
          <div className="icon-links">
            <Link href="/cart" className="cart-link">
              <CartIcon />
              {cartItemCount > 0 && (
                <span className="cart-badge">{cartItemCount}</span>
              )}
            </Link>
            <Link href="/my-page">
              <UserIcon />
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
```

#### Header 스타일 (src/components/header/header.scss)
```scss
.header {
    width: 100%;
    background-color: $background-color;
    border-bottom: 1px solid $border-color;
    padding: 0 $spacing-large;
    box-sizing: border-box;

    .header-container {
        max-width: 1200px;
        height: 80px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .logo {
            a {
                font-size: 24px;
                font-weight: 700;
                color: $font-color-primary;
                text-decoration: none;
            }
        }

        .nav {
            ul {
                display: flex;
                gap: $spacing-large * 2;
                list-style: none;
                margin: 0;
                padding: 0;
            }

            a {
                font-size: 16px;
                font-weight: 600;
                color: $font-color-primary;
                text-decoration: none;
                padding: $spacing-small 0;
                transition: color 0.2s;

                &:hover {
                    color: $primary-color;
                }

                &.active {
                    color: $primary-color;
                    border-bottom: 2px solid $primary-color;
                }
            }
        }
    }
}

// Utils 영역 (검색바, 아이콘 등)
.utils {
    display: flex;
    align-items: center;
    gap: $spacing-large;

    .search-form {
        position: relative;

        input {
            border: 1px solid $border-color;
            border-radius: 20px;
            padding: 8px 40px 8px 16px;
            width: 240px;
            transition: border-color 0.2s;

            &:focus {
                outline: none;
                border-color: $primary-color;
            }
        }

        button {
            position: absolute;
            right: 10px;
            top: 50%;
            transform: translateY(-50%);
            background: none;
            border: none;
            cursor: pointer;
            font-size: 18px;
            color: $font-color-secondary;
        }
    }

    .icon-links {
        display: flex;
        align-items: center;
        gap: $spacing-medium;
        font-size: 24px;

        a {
            color: $font-color-primary;
            text-decoration: none;
            position: relative;
        }

        .cart-link {
            .cart-badge {
                position: absolute;
                top: -4px;
                right: -8px;
                background-color: $primary-color;
                color: white;
                border-radius: 50%;
                width: 18px;
                height: 18px;
                font-size: 11px;
                font-weight: bold;
                display: flex;
                justify-content: center;
                align-items: center;
                line-height: 1;
            }
        }
    }
}
```

**핵심 특징:**
- **완전한 검색바 구현**: placeholder, 포커스 스타일, 아이콘 위치
- **장바구니 뱃지**: 동적 아이템 개수 표시
- **활성 네비게이션**: router.pathname 기반 활성 상태
- **반응형 대응**: 모바일에서 네비게이션 숨김

### 5. 빌드 및 CSS 추출 확인

#### 프로덕션 빌드
```bash
yarn build
```

#### CSS 파일 확인
```bash
# 생성된 CSS 파일 확인
ls -la .next/static/css/

# CSS 내용 확인 (Header/Footer 스타일 포함 여부)
head -50 .next/static/css/*.css
```

빌드 후 생성되는 CSS 파일에는 다음 스타일들이 포함되어야 합니다:
- `.header` 스타일
- `.footer` 스타일
- `.main-layout-container` 스타일
- 반응형 미디어 쿼리

## 검증 방법

### 1. JavaScript 비활성화 테스트

1. **브라우저 설정**:
   - Chrome: 개발자도구 → Settings → Preferences → Debugger → Disable JavaScript
   - Firefox: about:config → javascript.enabled = false

2. **페이지 로드 테스트**:
   ```bash
   # 프로덕션 서버 시작
   yarn build
   yarn start
   
   # 브라우저에서 JavaScript 비활성화 후 접속
   # http://localhost:3000
   ```

3. **확인 사항**:
   - Header와 Footer의 레이아웃이 정상적으로 표시되는가?
   - 기본 스타일링(색상, 폰트, 간격)이 적용되는가?
   - 반응형 디자인이 작동하는가?

### 2. 실제 구현된 예제 페이지로 검증

이 프로젝트는 SSR, SSG, CSR의 차이점을 명확히 보여주는 예제 페이지들을 포함하고 있습니다.

#### SSR 페이지 (/examples/ssr)
- **서버에서 실시간 데이터 생성**: 상품 목록과 서버 시간
- **매 요청마다 새로운 HTML**: 새로고침할 때마다 서버 시간 변경
- **완전한 SSR 스타일링**: Header/Footer가 서버에서 렌더링되어 포함

```bash
# SSR 페이지 HTML 소스 확인
curl -s http://localhost:3000/examples/ssr | grep -A 5 -B 5 "header\|footer"
```

#### SSG 페이지 (/examples/ssg)
- **빌드 시점 데이터 생성**: 블로그 글 목록과 빌드 시간
- **정적 HTML 제공**: 빌드 시간이 고정되어 변경되지 않음
- **완전한 SSG 스타일링**: 모든 스타일이 CSS 파일로 추출

```bash
# SSG 페이지 HTML 소스 확인
curl -s http://localhost:3000/examples/ssg | grep -A 5 -B 5 "header\|footer"
```

#### CSR 페이지 (/examples/csr)
- **클라이언트 데이터 로딩**: JavaScript로 사용자 목록 생성
- **로딩 상태 표시**: 1.5초 지연으로 CSR 특성 시연
- **동적 인터랙션**: 실시간 댓글 추가 기능

```bash
# CSR 페이지 초기 HTML (데이터 없음)
curl -s http://localhost:3000/examples/csr | grep -A 10 "loading\|데이터를 불러오는"
```

#### 확인 사항
- HTML 소스에 `<style>` 태그가 포함되어 있는가?
- Critical CSS가 `<head>` 섹션에 삽입되어 있는가?
- CSS 파일 링크가 올바르게 포함되어 있는가?

## 트러블슈팅

### 1. 스타일이 적용되지 않는 경우

**문제**: JavaScript 비활성화 시 스타일이 누락됨

**해결책**:
1. `globals.scss`의 import 경로 확인  
2. 빌드된 CSS 파일에 해당 스타일 포함 여부 확인
3. SCSS 파일이 올바르게 컴파일되고 있는지 확인
4. Next.js 기본 CSS 추출 동작 확인

### 2. 중복된 스타일 로드

**문제**: 같은 스타일이 여러 곳에서 중복 로드됨

**해결책**:
1. `globals.scss`와 개별 컴포넌트 파일의 중복 제거
2. `globals-loader.scss`에서 불필요한 import 제거
3. 모듈화된 import 구조 사용

### 3. 개발/프로덕션 환경 차이

**문제**: 개발 환경에서는 작동하지만 프로덕션에서 문제 발생

**해결책**:
1. SCSS 파일 구조 및 import 경로 검토
2. 프로덕션 빌드에서 CSS 추출 확인
3. 빌드된 CSS 파일에 모든 컴포넌트 스타일 포함 확인
4. Next.js 기본 CSS 처리 과정 검토

## 성능 최적화

### 1. CSS 추출 및 최적화

- SCSS 파일을 통한 스타일 관리로 인라인 CSS 제거
- Next.js 기본 기능을 통한 효율적인 CSS 파일 추출
- 모든 스타일을 별도 CSS 파일로 분리하여 캐싱 최적화
- 불필요한 복잡성 제거

### 2. 코드 분리

- 컴포넌트별로 스타일 파일 분리
- 페이지별 스타일 분리
- 공통 스타일과 특화 스타일 구분

### 3. 빌드 최적화

```javascript
// next.config.mjs - 간소화된 최종 설정
const nextConfig = {
  reactStrictMode: false,
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/styles')],
    prependData: `
      @import "@/styles/variables";
      @import "@/styles/mixins";
    `
  },
  transpilePackages: [
    'antd',
    '@ant-design/icons',
    // ... 기타 Ant Design 패키지들
  ],
}
```

**최적화 원칙:**
- **Next.js 기본 기능 활용**: 복잡한 webpack 설정 대신 Next.js 내장 CSS 처리 사용
- **최소 설정**: SCSS 컴파일과 Ant Design 지원만을 위한 필수 설정
- **유지보수성**: 간단하고 이해하기 쉬운 설정으로 장기적 관리 용이

## 현재 프로젝트의 성과

이 프로젝트에서 구현된 스타일링 시스템의 주요 성과:

### ✅ 완벽한 렌더링 지원
- **SSR 페이지**: `/examples/ssr`에서 서버 데이터와 함께 완전한 스타일 렌더링
- **SSG 페이지**: `/examples/ssg`에서 빌드타임 데이터와 정적 스타일 제공
- **CSR 페이지**: `/examples/csr`에서 클라이언트 인터랙션과 스타일 일관성
- **어드민 페이지**: `/admin` 경로에서 별도 레이아웃과 스타일 시스템

### ✅ JavaScript 비활성화 완벽 지원
```bash
# 확인 방법: 브라우저에서 JavaScript 비활성화 후 테스트
# 1. Chrome: DevTools > Settings > Preferences > Debugger > Disable JavaScript
# 2. Firefox: about:config > javascript.enabled = false
# 3. 각 예제 페이지 접속하여 Header/Footer 스타일 확인
```

### ✅ 실용적인 컴포넌트 구현
- **Header**: 상세한 검색바, 네비게이션, 장바구니 뱃지
- **Footer**: 회사 정보, 고객센터, 소셜 링크, 결제 아이콘
- **AdminLayout**: 사이드바, 헤더가 포함된 어드민 전용 레이아웃
- **DefaultLayout**: 일반 페이지용 기본 레이아웃

### ✅ 유연한 스타일 시스템
- **조건부 전역 스타일**: `.with-global-styles` / `.no-global-styles` 클래스 기반
- **페이지별 커스터마이징**: `disableGlobalStyles` 속성으로 페이지별 제어
- **모듈화된 SCSS**: 컴포넌트별 스타일 파일 분리
- **SCSS 변수/믹스인**: 전역 사용으로 일관성 유지

### ✅ 성능 최적화
- **CSS 파일 분리**: 모든 스타일이 별도 CSS 파일로 추출
- **번들 분석**: `ANALYZE=true yarn build`로 번들 크기 모니터링
- **Ant Design 최적화**: 완전한 트랜스파일 설정으로 호환성 확보
- **캐싱 최적화**: 정적 CSS 파일로 CDN 캐싱 가능

### ✅ 개발자 경험
- **명확한 예제**: SSR/SSG/CSR 차이를 실제 코드로 설명
- **간단한 설정**: 최소한의 Next.js 설정으로 복잡성 제거
- **타입 안전성**: TypeScript로 모든 컴포넌트 타입 정의
- **린트/포맷팅**: ESLint + Prettier로 코드 품질 관리

### 🎯 핵심 달성 목표
1. **교육 목적**: SSR/SSG/CSR 렌더링 방식을 명확히 이해할 수 있는 실습 프로젝트
2. **실무 적용**: 실제 쇼핑몰 수준의 Header/Footer 컴포넌트와 스타일링
3. **완벽한 호환성**: JavaScript 비활성화 환경에서도 완전한 사용자 경험
4. **확장 가능성**: 어드민 페이지까지 포함한 다양한 레이아웃 지원

**이를 통해 모든 환경에서 일관되고 완벽한 사용자 경험을 제공하는 Next.js 애플리케이션을 구축했습니다.**