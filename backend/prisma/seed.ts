import { PrismaClient, IssueStatus, IssueType } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import "dotenv/config";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding database...");

  // Create users
  const alice = await prisma.user.create({
    data: {
      name: "Alice",
      email: "alice@example.com",
    },
  });

  const bob = await prisma.user.create({
    data: {
      name: "Bob",
      email: "bob@example.com",
    },
  });

  // Create issues
  await prisma.issue.createMany({
    data: [
      {
        title: "Login button not working",
        description: "Clicking login does nothing on Chrome",
        status: IssueStatus.OPEN,
        type: IssueType.BUG,
        assignedTo: alice.id,
      },
      {
        title: "Add dark mode",
        description: "Users want dark mode support",
        status: IssueStatus.IN_PROGRESS,
        type: IssueType.FEATURE,
        assignedTo: bob.id,
      },
      {
        title: "Set up CI pipeline",
        description: "Configure GitHub Actions",
        status: IssueStatus.CLOSED,
        type: IssueType.TASK,
      },
    ],
  });

  console.log("✅ Database seeded successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
