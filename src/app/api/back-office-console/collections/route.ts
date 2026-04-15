import { NextResponse } from "next/server";
import { ensureCmsSeeded } from "@/lib/cms";
import { prisma } from "@/lib/prisma";

export async function GET() {
  await ensureCmsSeeded();
  const collections = await prisma.cmsCollectionItem.groupBy({ by: ["collection"] });
  return NextResponse.json({
    collections: collections
      .map((item: { collection: string }) => item.collection)
      .sort(),
  });
}
