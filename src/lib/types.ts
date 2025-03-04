export interface User {
    id: string;
    name: string;
    email: string;
}
  
export interface Event {
    id: string;
    name: string;
    description: string;
    location: string;
    datetime: string;
    creatorId: string;
    registeredUsers?: string[];
}