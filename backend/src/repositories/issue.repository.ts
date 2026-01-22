// Concrete implementation of IssueRepository
import { PrismaClient } from "@prisma/client";
import { IIssueRepository } from "../interfaces/IIssueRepository";
import { CreateIssueDto, UpdateIssueDto } from "../dtos/issue.dto";

export class IssueRepository implements IIssueRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findAll() {
    return this.prisma.issue.findMany({
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
    return this.prisma.issue.findUnique({
      where: { id },
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
    await this.prisma.issue.delete({
      where: { id },
    });
  }
}
