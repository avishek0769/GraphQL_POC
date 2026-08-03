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
}

export interface ChangePasswordPayload {
    oldPassword: string;
    newPassword: string;
}