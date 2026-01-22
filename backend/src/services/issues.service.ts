import prisma from "../prisma";

export async function getAllIssues() {
  return prisma.issue.findMany({
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
