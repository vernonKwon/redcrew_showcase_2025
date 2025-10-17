import React from 'react'
import Footer from '../../footer/footer'
import Header from '../../header/header'

interface DefaultLayoutProps {
  children: React.ReactNode
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  return (
    <div className="main-layout-container">
      <Header />

      <main className="main">{children}</main>

      <Footer />
    </div>
  )
}

export default DefaultLayout
