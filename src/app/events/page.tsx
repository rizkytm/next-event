'use client';

import { useState, useEffect } from 'react';
import EventCard from '@/components/EventCard';
import { LocalStorageService } from '@/utils/localStorage';
import { Event } from '@/lib/types';
import { useRouter } from 'next/navigation';

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const router = useRouter();
  const currentUser = LocalStorageService.getUser();

  useEffect(() => {
    if (!currentUser) {
      router.push('/login');
      return;
    }

    const storedEvents = LocalStorageService.getEvents();
    setEvents(storedEvents);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Upcoming Events</h1>
      {events.length === 0 ? (
        <p className="text-gray-600">No events found. Create your first event!</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {events.map(event => (
            <EventCard 
              key={event.id} 
              event={event} 
              canManage={event.creatorId === currentUser?.id} 
            />
          ))}
        </div>
      )}
    </div>
  );
}