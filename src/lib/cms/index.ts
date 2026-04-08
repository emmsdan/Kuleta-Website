import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { DEFAULT_COLLECTION_ITEMS, DEFAULT_SINGLETONS } from "@/lib/cms/default-content";

export type CmsSingletonRecord = {
  key: string;
  value: unknown;
};

export type CmsCollectionRecord = {
  id: string;
  collection: string;
  slug: string | null;
  title: string;
  subtitle: string | null;
  body: string | null;
  imageUrl: string | null;
  linkUrl: string | null;
  metadata: unknown;
  sortOrder: number;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type CmsCollectionItemInput = {
  id?: string;
  slug?: string;
  title: string;
  subtitle?: string;
  body?: string;
  imageUrl?: string;
  linkUrl?: string;
  metadata?: Prisma.InputJsonValue;
  sortOrder?: number;
  isPublished?: boolean;
};

export async function ensureCmsSeeded() {
  try {
    const singletonCount = await prisma.cmsSingleton.count();
    const collectionCount = await prisma.cmsCollectionItem.count();

    if (singletonCount === 0) {
      await prisma.cmsSingleton.createMany({
        data: DEFAULT_SINGLETONS,
      });
    }

    if (collectionCount === 0) {
      await prisma.cmsCollectionItem.createMany({
        data: DEFAULT_COLLECTION_ITEMS,
      });
    }
  } catch {
    // Graceful fallback when database is not configured.
  }
}

export async function getSingleton<T>(key: string, fallback: T): Promise<T> {
  try {
    await ensureCmsSeeded();
    const record = await prisma.cmsSingleton.findUnique({ where: { key } });
    if (!record) {
      return fallback;
    }
    return record.value as T;
  } catch {
    const seeded = DEFAULT_SINGLETONS.find((item) => item.key === key);
    if (seeded) {
      return seeded.value as T;
    }
    return fallback;
  }
}

export async function setSingleton(key: string, value: Prisma.InputJsonValue) {
  return prisma.cmsSingleton.upsert({
    where: { key },
    create: { key, value },
    update: { value },
  });
}

export async function getCollection(collection: string): Promise<CmsCollectionRecord[]> {
  try {
    await ensureCmsSeeded();
    return (await prisma.cmsCollectionItem.findMany({
      where: { collection },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    })) as CmsCollectionRecord[];
  } catch {
    return DEFAULT_COLLECTION_ITEMS.filter((item) => item.collection === collection).map((item, index) => ({
      id: `seed-${collection}-${index}`,
      collection: item.collection,
      slug: item.slug || null,
      title: item.title,
      subtitle: item.subtitle || null,
      body: item.body || null,
      imageUrl: item.imageUrl || null,
      linkUrl: item.linkUrl || null,
      metadata: item.metadata || null,
      sortOrder: item.sortOrder,
      isPublished: true,
      createdAt: new Date(0),
      updatedAt: new Date(0),
    }));
  }
}

export async function createCollectionItem(collection: string, input: CmsCollectionItemInput) {
  return prisma.cmsCollectionItem.create({
    data: {
      collection,
      slug: input.slug,
      title: input.title,
      subtitle: input.subtitle,
      body: input.body,
      imageUrl: input.imageUrl,
      linkUrl: input.linkUrl,
      metadata: input.metadata,
      sortOrder: input.sortOrder ?? 0,
      isPublished: input.isPublished ?? true,
    },
  });
}

export async function updateCollectionItem(id: string, input: Partial<CmsCollectionItemInput>) {
  return prisma.cmsCollectionItem.update({
    where: { id },
    data: {
      slug: input.slug,
      title: input.title,
      subtitle: input.subtitle,
      body: input.body,
      imageUrl: input.imageUrl,
      linkUrl: input.linkUrl,
      metadata: input.metadata,
      sortOrder: input.sortOrder,
      isPublished: input.isPublished,
    },
  });
}

export async function deleteCollectionItem(id: string) {
  return prisma.cmsCollectionItem.delete({ where: { id } });
}
