import type { Thread } from "../thread/types.ts";

export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    salt: string;
    refreshToken: string;
    accessToken: string;
    threads: [Thread]
}

export interface GetUserTokenPayload {
    id: string
}

export interface CreateUserPayload {
    name: string;
    email: string
    password: string;
}

export interface JWTUserData {
    id: string;
    name: string;
    email: string;
    validAuth?: boolean;
}

export interface ChangePasswordPayload {
    oldPassword: string;
    newPassword: string;
}