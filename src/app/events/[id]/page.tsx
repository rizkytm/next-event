'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import { LocalStorageService } from '@/utils/localStorage';
import { Event, User } from '@/lib/types';

// Dynamically import components
const EventCard = dynamic(() => import('@/components/EventCard'), { ssr: false });
const EventForm = dynamic(() => import('@/components/EventForm'), { ssr: false });

export default function EventDetailPage() {
  const [event, setEvent] = useState<Event | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState<User>();
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    // Ensure this runs only on client-side
    const user = LocalStorageService.getUser();
    
    if (!user) {
      router.push('/login');
      return;
    }

    setCurrentUser(user);

    const events = LocalStorageService.getEvents();
    const foundEvent = events.find((e: Event) => e.id === params.id);
    
    if (foundEvent) {
      setEvent(foundEvent);
    } else {
      router.push('/events');
    }
  }, [params.id]);

  // Render nothing on server to prevent hydration mismatches
  if (typeof window === 'undefined' || !event) {
    return null;
  }

  // Only allow editing by the event creator
  const canEdit = currentUser?.id === event.creatorId;

  return (
    <div className="container mx-auto px-4 py-8">
      {isEditing && canEdit ? (
        <EventForm initialEvent={event} />
      ) : (
        <>
          <EventCard 
            event={event} 
            canManage={canEdit} 
          />
          {canEdit && (
            <div className="mt-4 text-center">
              <button 
                onClick={() => setIsEditing(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Edit Event
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}