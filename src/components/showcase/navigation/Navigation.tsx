import { useState, useRef, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import LogoImage from '@/asset/REWIND_NUGGI.png'
import { navItems } from '@/constants/navigationItems'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsOpen(false)
    }
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node) && isOpen) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  return (
    <nav className="navigation" ref={navRef}>
      <div className="navigation-container">
        <div className="navigation-content">
          <div className="navigation-logo">
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
          
          <div className="navigation-menu navigation-menu--desktop">
            {navItems.map((item) => (
              item.isExternal ? (
                <Link
                  key={item.href}
                  href={item.href}
                  className="navigation-menu-item"
                >
                  {item.label}
                </Link>
              ) : (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className="navigation-menu-item"
                >
                  {item.label}
                </button>
              )
            ))}
          </div>
          
          <button
            className="navigation-toggle"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="navigation-mobile-menu">
          <div className="navigation-mobile-content">
            {navItems.map((item) => (
              item.isExternal ? (
                <Link
                  key={item.href}
                  href={item.href}
                  className="navigation-mobile-item"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ) : (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className="navigation-mobile-item"
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