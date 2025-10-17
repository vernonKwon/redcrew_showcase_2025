import Head from 'next/head'
import type { NextPageWithLayout } from './_app'

// 기본 레이아웃을 사용하는 페이지 (DefaultLayout 자동 적용)
// SCSS는 전역으로 자동 적용되므로 별도 import 불필요
const HomePage: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Shop - Home</title>
        <meta name="description" content="Welcome to our shop" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container">
        <h1 className="home-title">홈 페이지</h1>
        <p className="home-description">
          이 페이지는 기본 레이아웃(DefaultLayout)과 전역 스타일이 적용됩니다.
        </p>

        <div className="home-features">
          <div className="home-card">
            <h3>기능 1</h3>
            <p>기본 레이아웃 사용</p>
          </div>
          <div className="home-card">
            <h3>기능 2</h3>
            <p>전역 스타일 적용</p>
          </div>
          <div className="home-card">
            <h3>기능 3</h3>
            <p>SCSS 자동 적용</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default HomePage
