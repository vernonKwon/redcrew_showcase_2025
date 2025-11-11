import { Mail, Instagram, LucideProps } from 'lucide-react'

export interface ContactInfo {
  icon: React.ComponentType<LucideProps>
  title: string
  value: string
  href: string
}

export const contactInfo: ContactInfo[] = [
  {
    icon: Mail,
    title: '이메일',
    value: 'redcrew_@naver.com',
    href: 'mailto:redcrew_@naver.com',
  },
  {
    icon: Instagram,
    title: '인스타그램',
    value: '@redcrew_korea',
    href: 'https://www.instagram.com/redcrew_korea',
  },
]
