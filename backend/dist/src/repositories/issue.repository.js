"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IssueRepository = void 0;
class IssueRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll() {
        return this.prisma.issue.findMany({
            where: {
                deletedAt: null, // Only non-deleted issues
            },
            orderBy: {
                createdAt: "desc",
            },
            include: {
                assigned: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
        });
    }
    async findById(id) {
        return this.prisma.issue.findFirst({
            where: {
                id,
                deletedAt: null, // Only if not deleted
            },
            include: {
                assigned: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
        });
    }
    async create(data) {
        return this.prisma.issue.create({
            data: {
                title: data.title,
                ...(data.description !== undefined && { description: data.description }),
                type: data.type,
                ...(data.status && { status: data.status }),
                ...(data.assignedTo !== undefined && { assignedTo: data.assignedTo }),
            },
            include: {
                assigned: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
        });
    }
    async update(id, data) {
        return this.prisma.issue.update({
            where: { id },
            data: {
                ...(data.title && { title: data.title }),
                ...(data.description !== undefined && { description: data.description }),
                ...(data.type && { type: data.type }),
                ...(data.status && { status: data.status }),
                ...(data.assignedTo !== undefined && { assignedTo: data.assignedTo }),
            },
            include: {
                assigned: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
        });
    }
    async delete(id) {
        // Soft delete - set deletedAt timestamp
        await this.prisma.issue.update({
            where: { id },
            data: {
                deletedAt: new Date(),
            },
        });
    }
}
exports.IssueRepository = IssueRepository;
//# sourceMappingURL=issue.repository.js.map