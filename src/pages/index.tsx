import Head from 'next/head'
import { NextPageWithLayout } from './_app'
import Navigation from '@/components/showcase/navigation/Navigation'
import HeroSection from '@/components/showcase/hero-section/HeroSection'
import HistoryTimeline from '@/components/showcase/history-timeline/HistoryTimeline'
import ShowcaseSection from '@/components/showcase/showcase-section/ShowcaseSection'
import GuestTeams from '@/components/showcase/guest-teams/GuestTeams'
import LocationSection from '@/components/showcase/location-section/LocationSection'
import ContactSection from '@/components/showcase/contact-section/ContactSection'
import Footer from '@/components/showcase/footer/Footer'

const HomePage: NextPageWithLayout = () => {
  const siteUrl = 'https://redcrew.link' // 실제 도메인으로 변경 필요
  const title = 'RED CREW 파이널 쇼케이스 - 청춘 그 자체였던 10년간의 활동'
  const description =
    '댄스크루 레드크루의 10년 여정을 마무리하는 파이널 쇼케이스. 2025년 12월 14일 중랑구민회관 대공연장에서 개최됩니다. PRE-BXXCH, PENTAGON, ONESHOT CREW, Art company SOUL과 함께합니다.'
  const keywords =
    '레드크루, RED CREW, 댄스크루, 쇼케이스, 파이널쇼케이스, 댄스공연, 힙합댄스, 중랑구민회관, 게스트팀, PRE-BXXCH, PENTAGON, ONESHOT CREW'
  const ogImage = `${siteUrl}/og-image.jpg` // public 폴더에 이미지 추가 필요

  return (
    <>
      <Head>
        {/* 기본 메타 태그 */}
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content="RED CREW" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href={siteUrl} />

        {/* Open Graph (Facebook, LinkedIn 등) */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="RED CREW 파이널 쇼케이스" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="RED CREW 파이널 쇼케이스" />
        <meta property="og:locale" content="ko_KR" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />
        <meta name="twitter:image:alt" content="RED CREW 파이널 쇼케이스" />

        {/* 추가 SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <meta name="format-detection" content="telephone=no" />

        {/* JSON-LD 구조화된 데이터 (이벤트) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'DanceEvent',
              name: 'RED CREW 파이널 쇼케이스',
              description: description,
              startDate: '2025-12-14T14:00:00+09:00',
              endDate: '2025-12-14T17:00:00+09:00',
              eventStatus: 'https://schema.org/EventScheduled',
              eventAttendanceMode:
                'https://schema.org/OfflineEventAttendanceMode',
              location: {
                '@type': 'Place',
                name: '중랑구민회관 대공연장',
                address: {
                  '@type': 'PostalAddress',
                  addressLocality: '서울특별시',
                  addressRegion: '중랑구',
                  addressCountry: 'KR',
                },
              },
              image: [ogImage],
              organizer: {
                '@type': 'Organization',
                name: 'RED CREW',
                url: siteUrl,
              },
              performer: [
                {
                  '@type': 'PerformingGroup',
                  name: 'RED CREW',
                },
                {
                  '@type': 'PerformingGroup',
                  name: 'PRE-BXXCH',
                },
                {
                  '@type': 'PerformingGroup',
                  name: 'PENTAGON',
                },
                {
                  '@type': 'PerformingGroup',
                  name: 'ONESHOT CREW',
                },
                {
                  '@type': 'PerformingGroup',
                  name: 'Art company SOUL',
                },
              ],
            }),
          }}
        />
      </Head>

      <div className="showcase-page">
        <Navigation />
        <HeroSection />
        <HistoryTimeline />
        <ShowcaseSection />
        <GuestTeams />
        <LocationSection />
        <ContactSection />
        <Footer />
      </div>
    </>
  )
}

// 이 페이지는 기본 레이아웃을 사용하지 않음
HomePage.getLayout = (page) => page

export default HomePage
