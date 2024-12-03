'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import ProtectedRoute from '@/components/ProtectedRoute'

const CreateEvent = () => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')
  const [location, setLocation] = useState('')
  const [price, setPrice] = useState('')
  const [availableSeats, setAvailableSeats] = useState('')
  const router = useRouter()

  const handleCreateEvent = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      alert('You must be logged in as an organizer')
      return
    }

    const eventData = {
      name,
      description,
      date,
      location,
      price,
      availableSeats,
    }

    const response = await fetch('/api/organizer/create', {  // Ganti dengan API untuk membuat event
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(eventData),
    })

    const data = await response.json()

    if (response.ok) {
      router.push('/organizer/dashboard')  // Setelah berhasil, arahkan ke Dashboard
    } else {
      alert(data.message)
    }
  }

  return (
    <ProtectedRoute allowedRoles={['organizer']}>  {/* Melindungi route untuk organizer */}
      <div className="max-w-md mx-auto p-6">
        <h2 className="text-2xl font-semibold mb-4">Create New Event</h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Event Name"
            className="w-full p-2 border rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <textarea
            placeholder="Event Description"
            className="w-full p-2 border rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="date"
            className="w-full p-2 border rounded"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <input
            type="text"
            placeholder="Event Location"
            className="w-full p-2 border rounded"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <input
            type="number"
            placeholder="Ticket Price (IDR)"
            className="w-full p-2 border rounded"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <input
            type="number"
            placeholder="Available Seats"
            className="w-full p-2 border rounded"
            value={availableSeats}
            onChange={(e) => setAvailableSeats(e.target.value)}
          />
          <button
            onClick={handleCreateEvent}
            className="w-full bg-blue-500 text-white p-2 rounded"
          >
            Create Event
          </button>
        </div>
      </div>
    </ProtectedRoute>
  )
}

export default CreateEvent
