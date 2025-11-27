export interface AuthUser {
    id: number;
    name: string;
    email: string;
}

export interface Notepads {
    id: string;
    title: string;
    content: string;
    category: string;
    created_at: string;
}

export interface NotepadsLike {
    notepad_id: string;
}

export interface Category {
    category: string;
    count: number;
}
