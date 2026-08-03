import asyncHandler from "../../lib/asyncHandler.ts";
import ThreadService from "../../services/thread.ts";
import type { JWTUserData } from "../user/types.ts";
import type { CreatePostPayload } from "./types.ts";

const queries = {
    getThreadsByUser: asyncHandler(async (_: any, payload: any) => {
        
    }),

    getCurrentUserThreads: asyncHandler(async (_: any, payload: any) => {
        
    }),
};

const mutations = {
    createThread: asyncHandler(async (_: any, { text }: CreatePostPayload, { id }: JWTUserData) => {
        const thread = await ThreadService.createPost(text, id);
        return thread;
    }),

    editThread: asyncHandler(async (_: any, { text }: CreatePostPayload, { id }: JWTUserData) => {
        const thread = await ThreadService.editPost(text, id);
        return thread;
    })
};

export const resolvers = { queries, mutations };
