export interface AuthUser {
    id: number;
    name: string;
    email: string;
}

export interface Room {
    room_id: string;
    title: string;
}

export interface Message {
    id: number | null;
    role: 'user' | 'model';
    text: string;
}

export interface Notepad {
    id: number;
    text: string;
    category?: string;
}

export interface Categories {
    room_id: number;
    category: string;
}
