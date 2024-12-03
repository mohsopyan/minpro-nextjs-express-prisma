'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleLogin = async () => {
    const response = await fetch('/api/login', {  // Ganti dengan endpoint login backend nanti
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    })

    const data = await response.json()

    if (response.ok) {
      localStorage.setItem('token', data.token)
      localStorage.setItem('role', data.role)  // Simpan role yang baru

      // Arahkan pengguna sesuai role mereka
      if (data.role === 'organizer') {
        router.push('/organizer/dashboard')
      } else {
        router.push('/profile')
      }
    } else {
      alert(data.message)
    }
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Login</h2>
      <div>
        <input
          type="email"
          className="w-full mb-4 p-2 border"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="w-full mb-4 p-2 border"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleLogin}
          className="w-full p-2 bg-blue-500 text-white rounded"
        >
          Login
        </button>
      </div>
    </div>
  )
}

export default Login
