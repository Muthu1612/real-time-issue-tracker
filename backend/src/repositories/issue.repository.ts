// Concrete implementation of IssueRepository
import { PrismaClient } from "@prisma/client";
import { IIssueRepository } from "../interfaces/IIssueRepository";
import { CreateIssueDto, UpdateIssueDto } from "../dtos/issue.dto";

export class IssueRepository implements IIssueRepository {
  constructor(private readonly prisma: PrismaClient) {}

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

  async findById(id: number) {
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

  async create(data: CreateIssueDto) {
    return this.prisma.issue.create({
      data: {
        title: data.title,
        ...(data.description !== undefined && { description: data.description }),
        type: data.type as any,
        ...(data.status && { status: data.status as any }),
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

  async update(id: number, data: UpdateIssueDto) {
    return this.prisma.issue.update({
      where: { id },
      data: {
        ...(data.title && { title: data.title }),
        ...(data.description !== undefined && { description: data.description }),
        ...(data.type && { type: data.type as any }),
        ...(data.status && { status: data.status as any }),
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

  async delete(id: number) {
    // Soft delete - set deletedAt timestamp
    await this.prisma.issue.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
