'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: string[];  // Definisikan tipe 'allowedRoles' sebagai array string
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const router = useRouter()
  const [isAuthorized, setIsAuthorized] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const role = localStorage.getItem('role') // Ambil role dari localStorage

    // Cek apakah token ada dan apakah role termasuk dalam allowedRoles
    if (token && allowedRoles.includes(role || '')) {
      setIsAuthorized(true)
    } else {
      router.push('/login')  // Jika tidak terotorisasi, arahkan ke login
    }
  }, [router])

  if (!isAuthorized) return <div>Loading...</div>  // Menunggu status autentikasi

  return <>{children}</>  // Jika terotorisasi, render children (konten halaman)
}

export default ProtectedRoute
