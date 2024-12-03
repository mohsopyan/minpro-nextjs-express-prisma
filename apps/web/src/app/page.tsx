// src/app/page.tsx
import React from 'react';
import '../styles/globals.css';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white text-center py-16 px-4">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold sm:text-5xl">
            Welcome to the Event Platform
          </h1>
          <p className="mt-4 text-lg sm:text-xl">
            Browse and register for exciting upcoming events. Get ready to
            experience the best events around!
          </p>
          <div className="mt-8">
            <a
              href="#events"
              className="inline-block bg-yellow-500 text-blue-800 py-2 px-6 rounded-full text-lg font-semibold hover:bg-yellow-400 transition-all"
            >
              Explore Events
            </a>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section id="events" className="py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Upcoming Events</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Event 1 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src="https://via.placeholder.com/400x250"
                alt="Event 1"
                className="w-full h-56 object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-4">Event Title 1</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Description of event 1 goes here. A short summary of what
                  attendees can expect.
                </p>
                <a
                  href="#"
                  className="inline-block bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-400 transition-all"
                >
                  Register Now
                </a>
              </div>
            </div>
            {/* Event 2 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src="https://via.placeholder.com/400x250"
                alt="Event 2"
                className="w-full h-56 object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-4">Event Title 2</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Description of event 2 goes here. A short summary of what
                  attendees can expect.
                </p>
                <a
                  href="#"
                  className="inline-block bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-400 transition-all"
                >
                  Register Now
                </a>
              </div>
            </div>
            {/* Event 3 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src="https://via.placeholder.com/400x250"
                alt="Event 3"
                className="w-full h-56 object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-4">Event Title 3</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Description of event 3 goes here. A short summary of what
                  attendees can expect.
                </p>
                <a
                  href="#"
                  className="inline-block bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-400 transition-all"
                >
                  Register Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
