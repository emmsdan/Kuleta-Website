import { NextResponse } from "next/server";
import { ensureCmsSeeded } from "@/lib/cms";
import { prisma } from "@/lib/prisma";

export async function GET() {
  await ensureCmsSeeded();
  const items = await prisma.cmsSingleton.findMany({ orderBy: { key: "asc" } });
  return NextResponse.json({ items });
}
