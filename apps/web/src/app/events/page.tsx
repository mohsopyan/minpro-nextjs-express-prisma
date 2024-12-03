'use client'

import { useState, useEffect } from 'react'

const Events = () => {
  const [events, setEvents] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await fetch(`/api/events?search=${searchTerm}`)
      const data = await response.json()
      setEvents(data)
      setLoading(false)
    }

    fetchEvents()
  }, [searchTerm])

  if (loading) return <div>Loading...</div>
  if (!events.length) return <div>No events found.</div>

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Upcoming Events</h2>
      <input
        type="text"
        placeholder="Search for events"
        className="w-full p-2 border rounded-md mb-4"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="space-y-4">
        {events.map((event) => (
          <div key={event.id} className="p-4 border rounded-md">
            <h3 className="text-xl font-semibold">{event.name}</h3>
            <p>{event.date}</p>
            <p>{event.location}</p>
            <p>{event.description}</p>
            <button className="mt-4 py-2 px-4 bg-blue-500 text-white rounded-md">
              Buy Tickets
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Events
