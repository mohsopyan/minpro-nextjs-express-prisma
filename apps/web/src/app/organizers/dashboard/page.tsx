'use client'

import { useEffect, useState } from 'react'
import ProtectedRoute from '@/components/ProtectedRoute'
import { useRouter } from 'next/navigation'

const OrganizerDashboard = () => {
  const [events, setEvents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  // Ambil data event dari API untuk organizer
  useEffect(() => {
    const token = localStorage.getItem('token')
    const role = localStorage.getItem('role')

    if (token && role === 'organizer') {
      fetch('/api/organizer/events', {  // Ganti dengan API yang sesuai
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setEvents(data)
          setLoading(false)
        })
        .catch((error) => {
          console.error('Error fetching events:', error)
          setLoading(false)
        })
    } else {
      setLoading(false)
    }
  }, [])

  if (loading) return <div>Loading...</div>
  if (!events.length) return <div>No events found.</div>

  return (
    <ProtectedRoute allowedRoles={['organizer']}>  {/* Melindungi route untuk organizer */}
      <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-2xl font-semibold mb-4">Organizer Dashboard</h2>
        <button
          className="bg-blue-500 text-white p-2 rounded mb-4"
          onClick={() => window.location.href = '/organizer/create'}  // Menuju halaman create event
        >
          Create New Event
        </button>

        <div className="space-y-4">
          {events.map((event) => (
            <div key={event.id} className="p-4 border rounded shadow-md">
              <h3 className="text-lg font-semibold">{event.name}</h3>
              <p>Date: {event.date}</p>
              <p>Location: {event.location}</p>
              <button
                onClick={() => window.location.href = `/organizer/event/${event.id}`}
                className="mt-2 bg-yellow-500 text-white p-2 rounded"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  )
}

export default OrganizerDashboard
