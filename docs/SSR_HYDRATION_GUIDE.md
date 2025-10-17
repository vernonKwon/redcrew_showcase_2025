# SSR 및 Hydration 가이드

## 🔬 Next.js SSR과 Hydration 이해하기

### SSR (Server-Side Rendering) 동작 과정

1. **서버에서 HTML 생성**: getServerSideProps에서 데이터 페칭
2. **Redux Store 초기화**: 서버에서 Redux 상태 설정
3. **HTML 렌더링**: React 컴포넌트를 HTML 문자열로 변환
4. **클라이언트 전송**: 완성된 HTML과 초기 상태를 브라우저로 전송

### Hydration 과정

1. **초기 HTML 렌더링**: 서버에서 받은 HTML 즉시 표시
2. **React 로드**: JavaScript 번들 로드 및 실행
3. **상태 복원**: 서버에서 전달받은 초기 상태로 Redux Store 재구성
4. **이벤트 바인딩**: 정적 HTML에 React 이벤트 핸들러 연결

## 📊 Redux와 SSR 통합 (next-redux-wrapper)

### getServerSideProps에서 Redux 사용

```typescript
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { wrapper } from '@/redux/store'
import { changeNickname } from '@/redux/reducer/user'
import { useAppDispatch, useAppSelector } from '@/lib/reduxHooks'

interface Props {
  serverTime: string
  randomNumber: number
}

export default function SSRPage({ serverTime, randomNumber }: Props) {
  const dispatch = useAppDispatch()
  const counter = useAppSelector((state) => state.counter.number)
  const userName = useAppSelector((state) => state.user.name)
  
  return (
    <div>
      <h1>SSR 페이지</h1>
      <p>서버 렌더링 시각: {serverTime}</p>
      <p>카운터: {counter}</p>
      <p>사용자: {userName}</p>
      <button onClick={() => dispatch(increment())}>
        카운터 증가
      </button>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = 
  wrapper.getServerSideProps(
    (store) => async (context: GetServerSidePropsContext) => {
      console.log('🟦 서버: getServerSideProps 실행')
      
      // User-Agent 확인 (봇 감지 등)
      const userAgent = context.req.headers['user-agent']
      console.log(`User-Agent: ${userAgent}`)
      
      // 서버에서 Redux 상태 초기화
      const serverTime = new Date().toISOString()
      const randomNumber = Math.floor(Math.random() * 1000)
      
      // Redux 액션 디스패치
      store.dispatch(changeNickname(`서버 유저 ${randomNumber}`))
      
      // 카운터 초기값 설정
      for (let i = 0; i < 100; i++) {
        store.dispatch({ type: 'counter/incrementSuccess' })
      }
      
      // 서버 상태 로깅
      console.log('🟦 서버 Redux 상태:', store.getState())
      
      return {
        props: {
          serverTime,
          randomNumber,
        },
      }
    }
  )
```

## 🧪 Hydration 테스트 방법

### 1. 서버 렌더링 확인

```typescript
const [isClient, setIsClient] = useState(false)

useEffect(() => {
  // 클라이언트에서만 실행
  setIsClient(true)
}, [])

return (
  <div>
    <p>렌더링 위치: {isClient ? '✅ 클라이언트' : '🔷 서버'}</p>
  </div>
)
```

### 2. Hydration 시점 추적

```typescript
const [clientTime, setClientTime] = useState('')

useEffect(() => {
  setClientTime(new Date().toISOString())
  
  console.log('🔵 클라이언트 마운트 시점:', {
    redux상태: store.getState(),
    timestamp: new Date().toISOString(),
  })
}, [])
```

### 3. 디버깅 체크리스트

#### 브라우저에서 확인할 사항:

1. **페이지 소스 보기**
   - 우클릭 → "페이지 소스 보기"
   - 서버에서 렌더링된 초기 HTML 확인
   - Redux 초기 상태가 포함되어 있는지 확인

2. **개발자 도구 콘솔**
   - Hydration 경고 메시지 확인
   - 서버/클라이언트 로그 비교

3. **Redux DevTools**
   - `__NEXT_REDUX_WRAPPER_HYDRATE__` 액션 확인
   - 초기 상태와 hydration 후 상태 비교

4. **Network 탭**
   - HTML 응답 확인
   - `__NEXT_DATA__` 스크립트 태그 내용 확인

## ⚠️ Hydration Mismatch 방지

### 일반적인 원인과 해결법

#### 1. 날짜/시간 불일치

❌ 문제 코드:
```typescript
function Component() {
  return <div>{new Date().toString()}</div>
}
```

✅ 해결:
```typescript
function Component() {
  const [currentTime, setCurrentTime] = useState(null)
  
  useEffect(() => {
    setCurrentTime(new Date().toString())
  }, [])
  
  return <div>{currentTime || 'Loading...'}</div>
}
```

#### 2. 랜덤 값 사용

❌ 문제 코드:
```typescript
function Component() {
  const randomId = Math.random()
  return <div id={`item-${randomId}`}>내용</div>
}
```

✅ 해결:
```typescript
// getServerSideProps에서 생성
export const getServerSideProps = async () => {
  return {
    props: {
      randomId: Math.random()
    }
  }
}

function Component({ randomId }) {
  return <div id={`item-${randomId}`}>내용</div>
}
```

#### 3. 브라우저 전용 API 사용

❌ 문제 코드:
```typescript
function Component() {
  const width = window.innerWidth
  return <div>화면 너비: {width}px</div>
}
```

✅ 해결:
```typescript
function Component() {
  const [width, setWidth] = useState(null)
  
  useEffect(() => {
    setWidth(window.innerWidth)
  }, [])
  
  return <div>화면 너비: {width ? `${width}px` : '측정중...'}</div>
}
```

## 🎯 베스트 프랙티스

### 1. 서버/클라이언트 조건부 렌더링

```typescript
import { useEffect, useState } from 'react'

function useIsClient() {
  const [isClient, setIsClient] = useState(false)
  
  useEffect(() => {
    setIsClient(true)
  }, [])
  
  return isClient
}

// 사용 예
function Component() {
  const isClient = useIsClient()
  
  if (!isClient) {
    return <div>서버 렌더링 중...</div>
  }
  
  return <div>클라이언트 전용 컨텐츠</div>
}
```

### 2. Redux 상태 초기화 패턴

```typescript
// store.ts
export const wrapper = createWrapper(makeStore, {
  debug: process.env.NODE_ENV === 'development',
})

// 페이지 컴포넌트
export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    // 1. 데이터 페칭
    const data = await fetchData()
    
    // 2. Redux 상태 설정
    store.dispatch(setData(data))
    
    // 3. props 반환
    return { props: { /* 추가 props */ } }
  }
)
```

### 3. Hydration 에러 디버깅

```typescript
// 개발 환경에서만 Hydration 검증
if (process.env.NODE_ENV === 'development') {
  const useHydrationCheck = () => {
    useEffect(() => {
      const serverHTML = document.documentElement.innerHTML
      console.log('서버 HTML:', serverHTML)
      
      // React가 재렌더링한 후 비교
      setTimeout(() => {
        const clientHTML = document.documentElement.innerHTML
        if (serverHTML !== clientHTML) {
          console.warn('⚠️ Hydration mismatch detected!')
        }
      }, 0)
    }, [])
  }
}
```

## 📚 참고 자료

- [Next.js SSR 문서](https://nextjs.org/docs/basic-features/pages#server-side-rendering)
- [next-redux-wrapper 문서](https://github.com/kirill-konshin/next-redux-wrapper)
- [React Hydration 문서](https://react.dev/reference/react-dom/client/hydrateRoot)