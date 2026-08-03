import type { CreateUserPayload, JWTUserData } from "../graphql/user/types.ts";
import { prisma } from "../lib/prisma.ts";
import { createHmac, randomBytes } from "node:crypto";
import jwt from "jsonwebtoken";

class UserService {
    public static hashPassword(password: string, salt: string) {
        const hash = createHmac("sha256", salt).update(password).digest("hex");
        return hash;
    }

    public static generateTokens(userData: JWTUserData) {
        const accessToken = jwt.sign(userData, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: "1D" });
        const refreshToken = jwt.sign({ id: userData.id }, process.env.REFRESH_TOKEN_SECRET!, { expiresIn: "10D" });

        return { accessToken, refreshToken };
    }

    public static async getUserByIdentifier(identifier: string) {
        return await prisma.user.findFirst({
            where: {
                OR: [{ id: identifier }, { email: identifier }],
            },
        });
    }

    public static async createUser({ name, email, password }: CreateUserPayload) {
        const salt = randomBytes(32).toString("hex");
        const hashedPassword = UserService.hashPassword(password, salt);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                salt,
                refreshToken: "",
                accessToken: "",
            },
        });

        return user;
    }

    public static async loginUser({ email, password }: CreateUserPayload) {
        const user = await UserService.getUserByIdentifier(email);
        if (!user) {
            throw Error("User with this email does not exists");
        }
        const hashedPassword = UserService.hashPassword(password, user.salt);
        if (hashedPassword != user.password) {
            throw Error("Password is wrong");
        }

        const { accessToken, refreshToken } = UserService.generateTokens(user);

        const loggedInUser = await prisma.user.update({
            where: { id: user.id },
            data: {
                accessToken,
                refreshToken,
            },
        });

        return loggedInUser;
    }

    public static async changePassword(userId: string, oldPassword: string, newPassword: string) {
        const user = await UserService.getUserByIdentifier(userId);
        if (!user) {
            throw Error("User with this id does not exists");
        }

        const hashedOldPassword = UserService.hashPassword(oldPassword, user.salt);
        if (hashedOldPassword != user.password) {
            throw Error("Old Password is wrong");
        }
        
        const hashedNewPassword = UserService.hashPassword(newPassword, user.salt)
        await prisma.user.update({
            where: { id: user.id },
            data: { password: hashedNewPassword }
        });
    }

    public static async getToken(userId: string) {
        const user = await prisma.user.findUnique({
            where: { id: userId }
        })
        return { accessToken: user!.accessToken, refreshToken: user!.refreshToken }
    }
}

export default UserService;
