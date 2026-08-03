import asyncHandler from "../../lib/asyncHandler.ts";
import UserService from "../../services/user.ts";
import type { ChangePasswordPayload, CreateUserPayload, GetUserTokenPayload, JWTUserData } from "./types.ts";

const queries = {
    getUserToken: asyncHandler(async (_: any, payload: GetUserTokenPayload) => {
        const tokens = await UserService.getToken(payload.id);
        return tokens;
    }),

    getCurrentUser: asyncHandler(async (_: any, payload: any, context: JWTUserData) => {
        const user = await UserService.getUserByIdentifier(context.id);
        return user;
    }),
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
