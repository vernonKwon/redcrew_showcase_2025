import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

// 아이콘 관련 코드는 이전과 동일
const SearchIcon = () => '🔍'
const CartIcon = () => '🛒'
const UserIcon = () => '👤'

const Header = () => {
  const router = useRouter()
  const cartItemCount = 1

  const navLinks = [
    { name: '전체상품', href: '/products' },
    { name: '문구류', href: '/stationery' },
    { name: '사무기기', href: '/equipment' },
    { name: '인테리어', href: '/interior' },
  ]

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <Link href="/">OFFICELAB</Link>
        </div>

        <nav className="nav">
          <ul>
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className={router.pathname === link.href ? 'active' : ''}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="utils">
          <form className="search-form">
            <input type="text" placeholder="원하는 상품을 검색하세요" />
            <button type="submit">
              <SearchIcon />
            </button>
          </form>
          <div className="icon-links">
            <Link href="/cart" className="cart-link">
              <CartIcon />
              {cartItemCount > 0 && (
                <span className="cart-badge">{cartItemCount}</span>
              )}
            </Link>
            <Link href="/my-page">
              <UserIcon />
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
