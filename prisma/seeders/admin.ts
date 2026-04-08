import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/admin-auth";

const email =
  process.env.ADMIN_EMAIL?.trim().toLowerCase() || "e@kuleta.io.admin";
const password = process.env.ADMIN_PASSWORD || "e@kuleta.io.admin";
const name = process.env.ADMIN_NAME?.trim() || "Primary Admin";

const admins = [
  { email, password, name },
  {
    name: "Manda Admin",
    email: "manda@kuleta.io.admin",
    password: "Manda@2025",
  },
  {
    name: "Administra Admin",
    email: "administra@kuleta.io.admin",
    password: "Administra@2025",
  }
];

export async function seedDefaultAdmin() {
  for (const { email, password, name } of admins) {
    if (!email || !password) {
      return;
    }

    const passwordHash = await hashPassword(password);
    await prisma.adminUser.upsert({
      where: { email },
      update: { passwordHash, name, isActive: true },
      create: { email, name, passwordHash, isActive: true },
    });
  }
}
