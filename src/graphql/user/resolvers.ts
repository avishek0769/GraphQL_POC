import ThreadService from "../../services/thread.ts";
import UserService from "../../services/user.ts";
import type { ChangePasswordPayload, CreateUserPayload, GetUserTokenPayload, JWTUserData, User } from "./types.ts";

const nested = {
    threads: async (user: User) => {
        return await ThreadService.getThreadsByUser(user.id);
    }
}

const queries = {
    getCurrentUser: async (_: any, payload: any, context: JWTUserData) => {
        if(!context.validAuth) throw new Error("Not authenticated");

        const user = await UserService.getUserByIdentifier(context.id);
        return user;
    },
};

const mutations = {
    createUser: async (_: any, payload: CreateUserPayload) => {
        const user = await UserService.createUser(payload);
        return user.id;
    },

    loginUser: async (_: any, payload: CreateUserPayload) => {
        const user = await UserService.loginUser(payload);
        return user;
    },

    changePassword: async (_: any, payload: ChangePasswordPayload, context: JWTUserData) => {
        if(!context.validAuth) throw new Error("Not authenticated");

        await UserService.changePassword(context.id, payload.oldPassword, payload.newPassword);
        return true;
    },
};

export const resolvers = { queries, mutations, nested };
