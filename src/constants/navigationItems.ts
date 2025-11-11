export interface NavItem {
  href: string
  label: string
  isExternal?: boolean
}

export const navItems: NavItem[] = [
  { href: '#about', label: '팀 소개' },
  { href: '#history', label: '10년의 여정' },
  { href: '#showcase', label: '쇼케이스' },
  { href: '#teams', label: '게스트 팀' },
  { href: '#contact', label: '문의' },
]
