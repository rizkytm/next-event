'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import EventCard from '@/components/EventCard';
import EventForm from '@/components/EventForm';
import { LocalStorageService } from '@/utils/localStorage';
import { Event } from '@/lib/types';

export default function EventDetailPage() {
  const [event, setEvent] = useState<Event | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();
  const params = useParams();
  const currentUser = LocalStorageService.getUser();

  useEffect(() => {
    if (!currentUser) {
      router.push('/login');
      return;
    }

    const events = LocalStorageService.getEvents();
    const foundEvent = events.find(e => e.id === params.id);
    
    if (foundEvent) {
      setEvent(foundEvent);
    } else {
      router.push('/events');
    }
  }, [params.id]);

  if (!event) return null;

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