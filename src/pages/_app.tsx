import '@/styles/globals.scss'
import '@/styles/globals-loader.scss'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { wrapper } from '@/redux/store'
import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import DefaultLayout from '@/components/layout/default-layout/DefaultLayout'
import { ConfigProvider } from 'antd'

// 페이지 컴포넌트 타입 (레이아웃과 스타일 옵션 포함)
export type NextPageWithLayout<P = unknown, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
  disableGlobalStyles?: boolean
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({ Component, ...rest }: AppPropsWithLayout) {
  const { store, props } = wrapper.useWrappedStore(rest)
  const { pageProps } = props

  // 클라이언트 사이드에서만 로깅
  if (typeof window !== 'undefined')
    // eslint-disable-next-line no-console
    console.log('🟢 _app.tsx: 클라이언트 스토어 상태:', store.getState())

  // 페이지별 레이아웃 또는 기본 레이아웃 사용
  const getLayout =
    Component.getLayout ??
    ((page: ReactElement) => <DefaultLayout>{page}</DefaultLayout>)

  // 전역 스타일을 비활성화하려면 페이지에서 disableGlobalStyles: true 설정
  const pageClassName = Component.disableGlobalStyles
    ? 'no-global-styles'
    : 'with-global-styles'

  return (
    <Provider store={store}>
      <div className={pageClassName}>
        {getLayout(
          <ConfigProvider>
            <Component {...pageProps} />
          </ConfigProvider>,
        )}
      </div>
    </Provider>
  )
}
