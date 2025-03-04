'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LocalStorageService } from '@/utils/localStorage';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const user = LocalStorageService.getUser();
    setIsLoggedIn(!!user);
  }, [pathname]);

  const handleLogout = () => {
    LocalStorageService.removeUser();
    router.push('/login');
  };

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">Event Manager</Link>
        <div className="space-x-4">
          {!isLoggedIn ? (
            <>
              <Link href="/login" className="hover:underline">Login</Link>
              <Link href="/register" className="hover:underline">Register</Link>
            </>
          ) : (
            <>
              <Link href="/events" className="hover:underline">Events</Link>
              <Link href="/events/create" className="hover:underline">Create Event</Link>
              <button onClick={handleLogout} className="hover:underline">Logout</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}