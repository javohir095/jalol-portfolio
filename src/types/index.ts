export interface Post {
  id: string
  title: string
  excerpt: string
  content: string
  date: string
  imageUrl: string
  tags: string[]
  readTime: number
}

export interface SocialLinks {
  github?: string
  telegram?: string
  email?: string
  linkedin?: string
}

export interface Skill {
  name: string
  level: number
}

export interface Video {
  id: string
  name: string
  description: string
  url: string
  poster?: string
  date: string
  category: 'loyiha' | 'dars' | 'qisqa' | 'boshqa'
  duration?: string
}

export interface Profile {
  name: string
  nameEn: string
  role: string
  tagline: string
  taglineEn: string
  bio: string
  birthYear: number
  location: string
  email: string
  phone: string
  socialLinks: SocialLinks
  skills: Skill[]
  currentFocus: string
  openToWork: boolean
}
