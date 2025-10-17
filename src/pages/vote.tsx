import Head from 'next/head'
import { NextPageWithLayout } from './_app'
import VoteSection from '@/components/vote/vote-section/VoteSection'

const VotePage: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>RED CREW - 게스트 팀 인기투표</title>
        <meta name="description" content="파이널 쇼케이스를 함께할 최고의 게스트 팀들에게 투표해주세요" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="vote-page">
        <VoteSection />
      </div>
    </>
  )
}

// 이 페이지는 기본 레이아웃을 사용하지 않음
VotePage.getLayout = (page) => page

export default VotePage