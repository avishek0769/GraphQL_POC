import type { User } from "../user/types.ts";

export interface Thread {
    id: string;
    text: string;
    timestamp: string;
    userId: string;
    user: User 
}

export interface CreatePostPayload {
    text: string;
}

export interface EditPostPayload {
    threadId: string;
    text: string;
}

export interface DeletePostPayload {
    threadId: string;
}