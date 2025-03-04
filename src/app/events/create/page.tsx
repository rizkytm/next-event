'use client';

import EventForm from '@/components/EventForm';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LocalStorageService } from '@/utils/localStorage';

export default function CreateEventPage() {
  const router = useRouter();

  useEffect(() => {
    const currentUser = LocalStorageService.getUser();
    if (!currentUser) {
      router.push('/login');
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <EventForm />
    </div>
  );
}