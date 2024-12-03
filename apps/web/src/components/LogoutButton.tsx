'use client'

import { useRouter } from 'next/navigation'

const LogoutButton = () => {
  const router = useRouter()

  const handleLogout = () => {
    // Hapus token dari localStorage
    localStorage.removeItem('token')
    // Arahkan pengguna ke halaman login
    router.push('/auth/login')
  }

  return (
    <button onClick={handleLogout} className="text-red-500">
      Logout
    </button>
  )
}

export default LogoutButton
