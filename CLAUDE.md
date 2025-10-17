# CLAUDE.md

이 파일은 Claude Code (claude.ai/code)가 이 저장소의 코드를 작업할 때 참고할 가이드입니다.

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
- **스타일링**: 전역 변수를 사용한 SCSS 모듈
- **언어**: strict 모드가 활성화된 TypeScript

### 프로젝트 구조
- `src/pages/` - 파일 기반 라우팅을 사용하는 Next.js 페이지
  - `_app.tsx` - Redux Provider 래퍼
  - `api/` - API 라우트
- `src/redux/` - 상태 관리 레이어
  - `store.ts` - Saga 미들웨어가 설정된 Redux 스토어
  - `reducer/` - Redux Toolkit을 사용한 리듀서 정의
  - `saga/` - Redux Saga 사이드 이펙트
- `src/lib/` - 유틸리티 함수와 훅
  - `reduxHooks.ts` - 타입이 지정된 Redux 훅 (useAppDispatch, useAppSelector)
- `src/enum/` - TypeScript 열거형
- `src/styles/` - 전역 스타일과 SCSS 변수

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

### 스타일링 적용 방식
특별한 사항이 없을 시, 다음과 같은 방식으로 스타일링을 적용합니다:
1. **별도로 SCSS를 import하지 않을 것**: 별도의 명시적 import 없이도 적용되도록 설정되어 있음
2. **className 적용**: style.something이 아닌 문자열을 직접 입력하여 스타일링 적용 (예: `className="container"`, `className="button-primary"`)

## 중요 주의사항

### 파일 관리
- **절대 기존 파일을 삭제하지 마세요**: 파일을 이동하거나 리팩토링할 때도 기존 파일은 유지하고 필요시 복사본을 만드세요
- **파일 구조 변경 시**: 사용자의 명시적 요청이 없는 한 기존 파일과 폴더 구조를 유지하세요
- **컴포넌트 이동**: 컴포넌트를 다른 위치로 이동할 때는 원본을 삭제하지 말고 이동만 수행하세요