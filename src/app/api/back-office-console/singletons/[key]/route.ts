import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { getSingleton, setSingleton, CMS_CACHE_TAG } from "@/lib/cms";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ key: string }> }
) {
  const { key } = await params;
  const value = await getSingleton(key, null);
  return NextResponse.json({ key, value });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ key: string }> }
) {
  const { key } = await params;
  const body = await request.json();
  const item = await setSingleton(key, body.value);
  revalidateTag(CMS_CACHE_TAG);
  return NextResponse.json({ item });
}
