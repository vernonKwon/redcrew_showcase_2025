# CLAUDE.md

이 파일은 Claude Code (claude.ai/code)가 이 저장소의 코드를 작업할 때 참고할 가이드입니다.

## 프로젝트 개요

**RED CREW 파이널 쇼케이스 웹사이트**
- 댄스크루 레드크루의 10년간의 활동 종료를 기념하는 파이널 쇼케이스 소개 페이지
- 메인 쇼케이스 정보, 게스트 팀 소개, 인기투표 기능 포함
- 2025년 12월 14일 중랑구민회관 대공연장에서 개최 예정

## 명령어

### 개발
```bash
# 개발 서버 시작 (기본: http://localhost:3000)
yarn dev

# 프로덕션 빌드
yarn build

# 프로덕션 서버 시작
yarn start

# ESLint 실행
yarn lint

# 번들 크기 분석 (빌드 후 번들 분석기 실행)
yarn analyze
```

## 아키텍처

### 기술 스택
- **프레임워크**: Next.js 14 (Pages Router 사용)
- **상태 관리**: Redux Toolkit + Redux Saga + next-redux-wrapper
- **스타일링**: 전역 변수를 사용한 SCSS 모듈 (SSR 호환)
- **언어**: strict 모드가 활성화된 TypeScript
- **시간 처리**: dayjs (한국 시간대 지원)
- **아이콘**: Lucide React
- **UI 컴포넌트**: Ant Design (일부 기능)

### 프로젝트 구조
- `src/pages/` - 파일 기반 라우팅을 사용하는 Next.js 페이지
  - `index.tsx` - 메인 쇼케이스 페이지 (홈)
  - `vote.tsx` - 게스트 팀 인기투표 페이지
  - `_app.tsx` - Redux Provider 래퍼
  - `_document.tsx` - Ant Design CSS 추출 설정
  - `api/` - API 라우트
- `src/components/` - React 컴포넌트
  - `showcase/` - 메인 쇼케이스 관련 컴포넌트
    - `navigation/` - 네비게이션 (홈 링크 포함)
    - `hero-section/` - 메인 히어로 섹션 (D-Day 카운트다운)
    - `about-section/` - 팀 소개
    - `history-timeline/` - 10년 여정 타임라인
    - `showcase-section/` - 쇼케이스 정보
    - `guest-teams/` - 게스트 팀 소개
    - `contact-section/` - 문의 섹션
    - `footer/` - 푸터
  - `vote/` - 인기투표 관련 컴포넌트
    - `vote-section/` - 투표 메인 섹션
- `src/redux/` - 상태 관리 레이어
  - `store.ts` - Saga 미들웨어가 설정된 Redux 스토어
  - `reducer/` - Redux Toolkit을 사용한 리듀서 정의
    - `showcaseSlice.ts` - 쇼케이스 관련 상태 (문의 폼 등)
  - `saga/` - Redux Saga 사이드 이펙트
- `src/lib/` - 유틸리티 함수와 훅
  - `reduxHooks.ts` - 타입이 지정된 Redux 훅 (useAppDispatch, useAppSelector)
  - `dayjs.ts` - 한국 시간대 설정된 dayjs 유틸리티
- `src/enum/` - TypeScript 열거형
- `src/styles/` - 전역 스타일과 SCSS 변수
  - `globals.scss` - 전역 스타일 (SSR 호환)
  - `_variables.scss` - SCSS 변수 (색상, 폰트, 브레이크포인트 등)
  - `_mixins.scss` - SCSS 믹신 (반응형 등)
  - `components/` - 컴포넌트별 SCSS 파일

### Redux 패턴
프로젝트는 커스텀 타입 훅과 함께 Redux Toolkit을 사용합니다:
- Redux Toolkit의 `createSlice`를 사용하여 액션 생성
- rootReducer의 `IRootState` 인터페이스를 통한 상태 타이핑
- 타입 안정성을 위한 커스텀 훅 `useAppDispatch`와 `useAppSelector`
- 비동기 작업은 Redux Saga가 처리
- 개발 모드에서만 Logger 미들웨어 활성화

### 코드 스타일
- **Prettier**: 세미콜론 없음, 작은따옴표, 후행 쉼표 사용
- **ESLint**: React hooks 규칙 적용, 프로덕션에서 console.log 금지
- **TypeScript**: 경로 별칭 `@/`는 `src/` 디렉토리에 매핑
- **Redux**: Redux Toolkit 리듀서에서 Immer를 통한 상태 변경 허용
- **커밋 메시지**: 모든 커밋 메시지는 한글로 작성

### 스타일링 적용 방식
이 프로젝트는 **글로벌 SCSS** 방식을 사용합니다:

1. **SCSS 파일 구조**:
   - 모든 SCSS 파일은 `globals.scss`에서 import되어 전역적으로 로드됨
   - 컴포넌트별 SCSS 파일을 별도로 import하지 않음
   - SSR 호환을 위해 전역 레벨에서 CSS 추출

2. **className 적용**:
   - CSS Modules 방식이 아닌 일반 className 사용
   - BEM 네이밍 컨벤션: `component__element--modifier`
   - 예시: `className="hero-section__title"`, `className="navigation__menu-item"`

3. **변수 및 믹신**:
   - `_variables.scss`: 색상, 폰트, 브레이크포인트 등
   - `_mixins.scss`: 반응형 믹신 (`@include mobile`, `@include tablet`, `@include desktop`)
   - 모든 SCSS 파일에서 자동으로 사용 가능 (next.config.mjs 설정)

4. **SSR 호환성**:
   - 개발 모드: CSS가 JavaScript로 로드 (HMR 지원)
   - 프로덕션 모드: CSS가 별도 파일로 추출되어 SSR 지원
   - JavaScript 비활성화 시에도 스타일 정상 적용

## 주요 기능

### 메인 쇼케이스 페이지 (`/`)
- **HeroSection**: D-Day 카운트다운 (2025-12-14 14:00 KST 기준)
- **AboutSection**: 레드크루 팀 소개 및 성취
- **HistoryTimeline**: 2015년부터 2024년까지 10년 여정
- **ShowcaseSection**: 공연 정보 (일정, 장소, 티켓)
- **GuestTeams**: 참가 게스트 팀 4개 소개 (PRE-BXXCH, PENTAGON, ONESHOT CREW, Art company SOUL)
- **ContactSection**: 문의 폼 (Redux로 상태 관리)
- **Footer**: 연락처 및 소셜 링크

### 인기투표 페이지 (`/vote`)
- **3개 투표 카테고리**:
  1. 가장 기대되는 게스트 팀 (6개 팀)
  2. 최고의 콜라보레이션 기대 (4가지 조합)
  3. 라이징 스타 팀 (3개 신예팀)
- **투표 기능**: 카테고리별 1표, 실시간 결과 표시
- **게스트 팀 정보**: 지역, 스타일, 설립년도 포함

### 시간 관리
- **dayjs 기반**: 한국 시간대(KST) 강제 적용
- **SSR 호환**: `typeof window` 체크로 서버/클라이언트 분기 처리
- **실시간 카운트다운**: 1초마다 업데이트

## 중요 주의사항

### 개발 환경
- **서버 실행**: 사용자가 직접 `yarn dev`를 실행하여 항시 서버를 켜두고 있음
- **서버 명령어 금지**: Claude가 서버 관련 명령어를 직접 실행하지 말 것

### 파일 관리
- **절대 기존 파일을 삭제하지 마세요**: 파일을 이동하거나 리팩토링할 때도 기존 파일은 유지하고 필요시 복사본을 만드세요
- **파일 구조 변경 시**: 사용자의 명시적 요청이 없는 한 기존 파일과 폴더 구조를 유지하세요
- **컴포넌트 이동**: 컴포넌트를 다른 위치로 이동할 때는 원본을 삭제하지 말고 이동만 수행하세요

### SCSS 작업 시 주의사항
- **새로운 컴포넌트 SCSS 추가 시**: `globals.scss`에 import 추가 필요
- **변수 사용**: `$red-primary`, `$dark-bg`, `$white` 등 기존 변수 활용
- **반응형**: `@include mobile`, `@include tablet`, `@include desktop` 믹신 사용
- **BEM 네이밍**: `component__element--modifier` 방식 준수

### TypeScript 타입 정의
- **Lucide 아이콘**: `React.ComponentType<LucideProps>` 사용
- **Redux 훅**: `useAppDispatch`, `useAppSelector` 사용
- **any 타입 금지**: ESLint 규칙으로 any 타입 사용 금지