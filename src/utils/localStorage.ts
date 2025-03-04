import { Event, User } from "@/lib/types";

export const LocalStorageService = {
    // User Authentication
    setUser: (user: User) => {
      localStorage.setItem('user', JSON.stringify(user));
    },
    
    getUser: (): User | null => {
      const userStr = localStorage.getItem('user');
      return userStr ? JSON.parse(userStr) : null;
    },
    
    removeUser: () => {
      localStorage.removeItem('user');
    },
  
    // Events Management
    getEvents: (): Event[] => {
      const events = localStorage.getItem('events');
      return events ? JSON.parse(events) : [];
    },
  
    setEvents: (events: Event[]) => {
      localStorage.setItem('events', JSON.stringify(events));
    },
  
    addEvent: (event: Event) => {
      const events = LocalStorageService.getEvents();
      events.push(event);
      LocalStorageService.setEvents(events);
    },
  
    updateEvent: (updatedEvent: Event) => {
      const events = LocalStorageService.getEvents().map(event => 
        event.id === updatedEvent.id ? updatedEvent : event
      );
      LocalStorageService.setEvents(events);
    },
  
    deleteEvent: (eventId: string) => {
      const events = LocalStorageService.getEvents().filter(event => event.id !== eventId);
      LocalStorageService.setEvents(events);
    }
  };