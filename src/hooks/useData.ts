import { useState, useEffect } from 'react'
import type { Post, Profile, Video } from '../types'

export function usePosts() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/data/posts.json')
      .then(r => r.json())
      .then((data: Post[]) => {
        const sorted = [...data].sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        )
        setPosts(sorted)
        setLoading(false)
      })
      .catch(() => {
        setError('Maqolalar yuklanmadi')
        setLoading(false)
      })
  }, [])

  return { posts, loading, error }
}

export function usePost(id: string) {
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/data/posts.json')
      .then(r => r.json())
      .then((data: Post[]) => {
        const found = data.find(p => p.id === id) || null
        setPost(found)
        setLoading(false)
      })
      .catch(() => {
        setError('Maqola topilmadi')
        setLoading(false)
      })
  }, [id])

  return { post, loading, error }
}

export function useProfile() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/data/profile.json')
      .then(r => r.json())
      .then((data: Profile) => {
        setProfile(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  return { profile, loading }
}

export function useVideos() {
  const [videos, setVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/data/videos.json')
      .then(r => r.json())
      .then((data: Video[]) => {
        const sorted = [...data].sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        )
        setVideos(sorted)
        setLoading(false)
      })
      .catch(() => {
        setError('Videolar yuklanmadi')
        setLoading(false)
      })
  }, [])

  return { videos, loading, error }
}
