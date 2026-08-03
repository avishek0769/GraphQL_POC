import type { User } from "../user/types.ts";

export interface Thread {
    id: string;
    text: string;
    timestamp: number;
    userId: string;
    user: User 
}

export interface CreatePostPayload {
    text: string;
}