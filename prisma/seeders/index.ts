import { prisma } from "@/lib/prisma";
import { DEFAULT_COLLECTION_ITEMS, DEFAULT_SINGLETONS } from "../../src/lib/cms/default-content";
import { seedDefaultAdmin } from "./admin";

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
