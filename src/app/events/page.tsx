'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { LocalStorageService } from '@/utils/localStorage';
import { Event, User } from '@/lib/types';

// Dynamically import EventCard to ensure client-side rendering
const EventCard = dynamic(() => import('@/components/EventCard'), { ssr: false });

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [currentUser, setCurrentUser] = useState<User>();
  const router = useRouter();

  useEffect(() => {
    // Ensure this runs only on client-side
    const user = LocalStorageService.getUser();
    
    if (!user) {
      router.push('/login');
      return;
    }

    setCurrentUser(user);
    const storedEvents = LocalStorageService.getEvents();
    setEvents(storedEvents);
  }, []);

  // Render nothing on server to prevent hydration mismatches
  if (typeof window === 'undefined') {
    return null;
  }

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