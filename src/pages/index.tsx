import Head from 'next/head'
import { NextPageWithLayout } from './_app'
import Navigation from '@/components/showcase/navigation/Navigation'
import HeroSection from '@/components/showcase/hero-section/HeroSection'
import AboutSection from '@/components/showcase/about-section/AboutSection'
import HistoryTimeline from '@/components/showcase/history-timeline/HistoryTimeline'
import ShowcaseSection from '@/components/showcase/showcase-section/ShowcaseSection'
import GuestTeams from '@/components/showcase/guest-teams/GuestTeams'
import LocationSection from '@/components/showcase/location-section/LocationSection'
import ContactSection from '@/components/showcase/contact-section/ContactSection'
import Footer from '@/components/showcase/footer/Footer'

const HomePage: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>RED CREW - 댄서들의 축제, 10년간의 활동 종료</title>
        <meta name="description" content="레드크루 파이널 쇼케이스 - 10년의 열정, 하나의 무대" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="showcase-page">
        <Navigation />
        <HeroSection />
        <AboutSection />
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
