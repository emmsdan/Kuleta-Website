
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/admin-auth";
import { DEFAULT_COLLECTION_ITEMS, DEFAULT_SINGLETONS } from "../src/lib/cms/default-content";

async function seedDefaultAdmin() {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase() || "e@kuleta.io.admin";
  const password = process.env.ADMIN_PASSWORD || "e@kuleta.io.admin";
  const name = process.env.ADMIN_NAME?.trim() || "Primary Admin";

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

async function main() {
  await seedDefaultAdmin();
  await prisma.cmsSingleton.deleteMany();
  await prisma.cmsCollectionItem.deleteMany();

  await prisma.cmsSingleton.createMany({ data: DEFAULT_SINGLETONS });
  await prisma.cmsCollectionItem.createMany({ data: DEFAULT_COLLECTION_ITEMS });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
