import { prisma } from "../lib/prisma.ts";

class ThreadService {
    public static async createThread(text: string, userId: string) {
        const thread = await prisma.thread.create({
            data: { text, userId, timestamp: Date.now().toLocaleString() }
        })

        return thread;
    }

    public static async editThread(text: string, threadId: string) {
        const thread = await prisma.thread.update({
            where: { id: threadId },
            data: { text }
        })

        return thread;
    }

    public static async deleteThread(threadId: string) {
        const thread = await prisma.thread.delete({
            where: { id: threadId }
        })

        return thread;
    }

    public static async getThreadsByUser(userId: string) {
        const thread = await prisma.thread.findMany({
            where: { userId }
        })

        return thread;
    }
}

export default ThreadService;