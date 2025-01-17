import prisma from "./prisma";

export const fetchLatestTasks = () => {
    return prisma.task.findMany({
        where: {
            isDone: false
        },
        take: 5,
        orderBy: {
            createdAt: 'desc'
        }
    })
}

export const createTask = (title: string, description: string) => {
    return prisma.task.create({
        data: {
            title,
            description
        }
    })
}

export const markTaskAsDone = (id: string) => {
    return prisma.task.update({
        where: {
            id
        },
        data: {
            isDone: true
        }
    })
}