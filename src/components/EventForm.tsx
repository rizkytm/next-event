'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { LocalStorageService } from '@/utils/localStorage';
import { Event } from '@/lib/types';

interface EventFormProps {
  initialEvent?: Event;
}

export default function EventForm({ initialEvent }: EventFormProps) {
  const [name, setName] = useState(initialEvent?.name || '');
  const [description, setDescription] = useState(initialEvent?.description || '');
  const [location, setLocation] = useState(initialEvent?.location || '');
  const [datetime, setDatetime] = useState(
    initialEvent?.datetime 
      ? new Date(initialEvent.datetime).toISOString().slice(0, 16) 
      : ''
  );

  const router = useRouter();
  const currentUser = LocalStorageService.getUser();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!currentUser) {
      router.push('/login');
      return;
    }

    const eventData: Event = {
      id: initialEvent?.id || Date.now().toString(),
      name,
      description,
      location,
      datetime: new Date(datetime).toISOString(),
      creatorId: currentUser.id,
      registeredUsers: initialEvent?.registeredUsers || []
    };

    if (initialEvent) {
      // Update existing event
      LocalStorageService.updateEvent(eventData);
    } else {
      // Create new event
      LocalStorageService.addEvent(eventData);
    }

    router.push('/events');
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {initialEvent ? 'Edit Event' : 'Create Event'}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Event Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Date and Time</label>
          <input
            type="datetime-local"
            value={datetime}
            onChange={(e) => setDatetime(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          {initialEvent ? 'Update Event' : 'Create Event'}
        </button>
      </form>
    </div>
  );
}