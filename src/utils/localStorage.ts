import { Event, User } from "@/lib/types";

export const LocalStorageService = {
  // User Authentication
  setUser: (user: User) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(user));
    }
  },
  
  getUser: () => {
    if (typeof window !== 'undefined') {
      const userStr = localStorage.getItem('user');
      return userStr ? JSON.parse(userStr) : null;
    }
    return null;
  },
  
  removeUser: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user');
    }
  },

  // Events Management
  getEvents: () => {
    if (typeof window !== 'undefined') {
      const events = localStorage.getItem('events');
      return events ? JSON.parse(events) : [];
    }
    return [];
  },

  setEvents: (events: Event[]) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('events', JSON.stringify(events));
    }
  },

  addEvent: (event: Event) => {
    if (typeof window !== 'undefined') {
      const events = LocalStorageService.getEvents();
      events.push(event);
      LocalStorageService.setEvents(events);
    }
  },

  updateEvent: (updatedEvent: Event) => {
    if (typeof window !== 'undefined') {
      const events = LocalStorageService.getEvents().map((event: Event) => 
        event.id === updatedEvent.id ? updatedEvent : event
      );
      LocalStorageService.setEvents(events);
    }
  },

  deleteEvent: (eventId: string) => {
    if (typeof window !== 'undefined') {
      const events = LocalStorageService.getEvents().filter((event: Event) => event.id !== eventId);
      LocalStorageService.setEvents(events);
    }
  }
};