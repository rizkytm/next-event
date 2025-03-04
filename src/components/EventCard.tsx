'use client';

import { Event } from '@/lib/types';
import { LocalStorageService } from '@/utils/localStorage';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface EventCardProps {
  event: Event;
  canManage?: boolean;
}

export default function EventCard({ event, canManage = false }: EventCardProps) {
  const router = useRouter();
  const currentUser = LocalStorageService.getUser();

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this event?')) {
      LocalStorageService.deleteEvent(event.id);
      router.push('/events');
    }
  };

  const handleRegister = () => {
    if (!currentUser) {
      router.push('/login');
      return;
    }

    const events = LocalStorageService.getEvents();
    const updatedEvent = events.find((e: Event) => e.id === event.id);
    
    if (updatedEvent) {
      updatedEvent.registeredUsers = updatedEvent.registeredUsers || [];
      
      if (!updatedEvent.registeredUsers.includes(currentUser.id)) {
        updatedEvent.registeredUsers.push(currentUser.id);
        LocalStorageService.updateEvent(updatedEvent);
        alert('Successfully registered for the event!');
      } else {
        alert('You are already registered for this event.');
      }
    }
  };

  const handleCancelRegistration = () => {
    if (!currentUser) return;

    const events = LocalStorageService.getEvents();
    const updatedEvent = events.find((e: Event) => e.id === event.id);
    
    if (updatedEvent) {
      updatedEvent.registeredUsers = updatedEvent.registeredUsers?.filter(
        (userId: string) => userId !== currentUser.id
      );
      LocalStorageService.updateEvent(updatedEvent);
      alert('Registration cancelled successfully.');
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-4">
      <h2 className="text-2xl font-bold mb-2">{event.name}</h2>
      <p className="text-gray-600 mb-2">{event.description}</p>
      <div className="mb-2">
        <strong>Location:</strong> {event.location}
      </div>
      <div className="mb-2">
        <strong>Date:</strong> {new Date(event.datetime).toLocaleString()}
      </div>

      <div className="mt-4 flex space-x-2">
        <Link 
          href={`/events/${event.id}`} 
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          View Details
        </Link>

        {currentUser && (
          <>
            {event.registeredUsers?.includes(currentUser.id) ? (
              <button 
                onClick={handleCancelRegistration}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Cancel Registration
              </button>
            ) : (
              <button 
                onClick={handleRegister}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Register
              </button>
            )}
          </>
        )}

        {canManage && (
          <button 
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Delete Event
          </button>
        )}
      </div>
    </div>
  );
}