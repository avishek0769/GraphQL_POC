import { prisma } from "../lib/prisma.ts";

class ThreadService {
    public static async createPost(text: string, userId: string) {
        const thread = await prisma.thread.create({
            data: { text, userId }
        })
        
        return thread;
    }

    public static async editPost(text: string, userId: string) {
        const thread = await prisma.thread.update({
            where: { id: userId },
            data: { text, userId }
        })

        return thread;
    }
}

export default ThreadService;