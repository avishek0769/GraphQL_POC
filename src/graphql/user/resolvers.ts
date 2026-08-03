import asyncHandler from "../../lib/asyncHandler.ts";
import UserService from "../../services/user.ts";
import type { ChangePasswordPayload, CreateUserPayload, GetUserTokenPayload, JWTUserData } from "./types.ts";

const queries = {
    getUserToken: (_: any, payload: GetUserTokenPayload) => {},

    getCurrentUser: (_: any, payload: any, context: JWTUserData) => {},

    getUsers: () => {},
};

const mutations = {
    createUser: asyncHandler(async (_: any, payload: CreateUserPayload) => {
        const user = await UserService.createUser(payload);
        return user.id;
    }),

    loginUser: asyncHandler(async (_: any, payload: CreateUserPayload) => {
        const user = await UserService.loginUser(payload);
        return user;
    }),

    changePassword: asyncHandler(async (_: any, payload: ChangePasswordPayload, context: JWTUserData) => {
        await UserService.changePassword(context.id, payload.oldPassword, payload.newPassword);
        return true;
    }),
};

export const resolvers = { queries, mutations };
