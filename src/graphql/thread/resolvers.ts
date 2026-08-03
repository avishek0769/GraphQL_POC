import ThreadService from "../../services/thread.ts";
import UserService from "../../services/user.ts";
import type { JWTUserData } from "../user/types.ts";
import type { CreatePostPayload, Thread } from "./types.ts";

const nested = {
    user: async (thread: Thread) => {
        return await UserService.getUserByIdentifier(thread.userId);
    }
}

const queries = {
    getThreadsByUser: async (_: any, { id }: { id: string }) => {
        const threads = await ThreadService.getThreadsByUser(id);
        return threads;
    },

    getCurrentUserThreads: async (_: any, payload: any, { id }: JWTUserData) => {
        const threads = await ThreadService.getThreadsByUser(id);
        return threads;
    },
};

const mutations = {
    createThread: async (_: any, { text }: CreatePostPayload, { id }: JWTUserData) => {
        const thread = await ThreadService.createPost(text, id);
        return thread;
    },

    editThread: async (_: any, { text }: CreatePostPayload, { id }: JWTUserData) => {
        const thread = await ThreadService.editPost(text, id);
        return thread;
    }
};

export const resolvers = { queries, mutations, nested };
