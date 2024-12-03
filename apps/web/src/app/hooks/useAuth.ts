// app/hooks/useAuth.ts
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export const useAuth = () => {
  const [loading, setLoading] = useState(true)
  const [authenticated, setAuthenticated] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setAuthenticated(true)
    } else {
      setAuthenticated(false)
      router.push('/auth/login')
    }
    setLoading(false)
  }, [router])

  return { authenticated, loading }
}
