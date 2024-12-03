'use client'

import { useEffect, useState } from 'react'
import ProtectedRoute from '@/components/ProtectedRoute'

const Profile = () => {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  // Ambil data pengguna setelah login
  useEffect(() => {
    const token = localStorage.getItem('token')

    if (token) {
      fetch('/api/profile', {  // Ganti dengan endpoint untuk mengambil profile backend nanti
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setUser(data)
          setLoading(false)
        })
        .catch((error) => {
          console.error('Error fetching profile:', error)
          setLoading(false)
        })
    } else {
      setLoading(false)
    }
  }, [])

  if (loading) return <div>Loading...</div>
  if (!user) return <div>You need to login to view this page.</div>

  return (
    <ProtectedRoute allowedRoles={['attendee']}> {/* Menggunakan 'attendee' role */}
      <div className="max-w-md mx-auto p-6">
        <h2 className="text-2xl font-semibold mb-4">Profile</h2>
        <p>Email: {user.email}</p>
        <p>Referral Code: {user.referralCode}</p>
        <p>Points Balance: {user.pointsBalance}</p>
      </div>
    </ProtectedRoute>
  )
}

export default Profile
