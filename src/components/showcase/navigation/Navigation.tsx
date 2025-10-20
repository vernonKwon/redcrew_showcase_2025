import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import LogoImage from '@/asset/REWIND_NUGGI.png'

interface NavItem {
  href: string
  label: string
  isExternal?: boolean
}

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems: NavItem[] = [
    { href: '#about', label: '팀 소개' },
    { href: '#history', label: '10년의 여정' },
    { href: '#showcase', label: '쇼케이스' },
    { href: '#teams', label: '게스트 팀' },
    { href: '/vote', label: '인기투표', isExternal: true },
    { href: '#contact', label: '문의' },
  ]

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsOpen(false)
    }
  }

  return (
    <nav className="navigation">
      <div className="navigation__container">
        <div className="navigation__content">
          <div className="navigation__logo">
            <Link href="/">
              <Image 
                src={LogoImage} 
                alt="REWIND - RED CREW 10th Anniversary Showcase" 
                width={150}
                height={40}
                priority
              />
            </Link>
          </div>
          
          <div className="navigation__menu navigation__menu--desktop">
            {navItems.map((item) => (
              item.isExternal ? (
                <Link
                  key={item.href}
                  href={item.href}
                  className="navigation__menu-item"
                >
                  {item.label}
                </Link>
              ) : (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className="navigation__menu-item"
                >
                  {item.label}
                </button>
              )
            ))}
          </div>
          
          <button
            className="navigation__toggle"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="navigation__mobile-menu">
          <div className="navigation__mobile-content">
            {navItems.map((item) => (
              item.isExternal ? (
                <Link
                  key={item.href}
                  href={item.href}
                  className="navigation__mobile-item"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ) : (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className="navigation__mobile-item"
                >
                  {item.label}
                </button>
              )
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}