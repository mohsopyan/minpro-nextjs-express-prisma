'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const Register = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [referralCode, setReferralCode] = useState('')
  const [role, setRole] = useState<'attendee' | 'organizer'>('attendee')  // Role baru
  const router = useRouter()

  const handleRegister = async () => {
    const response = await fetch('/api/register', {  // Ganti dengan endpoint registrasi backend nanti
      method: 'POST',
      body: JSON.stringify({ email, password, referralCode, role }),  // Kirim role ke backend
      headers: { 'Content-Type': 'application/json' },
    })

    const data = await response.json()

    if (response.ok) {
      router.push('/auth/login')  // Arahkan ke halaman login setelah registrasi
    } else {
      alert(data.message)
    }
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Register</h2>
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
        <input
          type="text"
          className="w-full mb-4 p-2 border"
          placeholder="Referral Code (optional)"
          value={referralCode}
          onChange={(e) => setReferralCode(e.target.value)}
        />
        <select
          className="w-full mb-4 p-2 border"
          value={role}
          onChange={(e) => setRole(e.target.value as 'attendee' | 'organizer')}
        >
          <option value="attendee">Attendee</option>
          <option value="organizer">Organizer</option>
        </select>
        <button
          onClick={handleRegister}
          className="w-full p-2 bg-blue-500 text-white rounded"
        >
          Register
        </button>
      </div>
    </div>
  )
}

export default Register
