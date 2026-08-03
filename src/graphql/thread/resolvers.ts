import asyncHandler from "../../lib/asyncHandler.ts";
import ThreadService from "../../services/thread.ts";
import type { } from "./types.ts";

const queries = {
    getThreadsByUser: asyncHandler(async (_: any, payload: any) => {
        
    }),
};

const mutations = {
    createPost: asyncHandler(async (_: any, payload: any) => {
        
    })
};

export const resolvers = { queries, mutations };
