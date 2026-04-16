import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { createCollectionItem, getCollection, CMS_CACHE_TAG } from "@/lib/cms";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ collection: string }> }
) {
  const { collection } = await params;
  const items = await getCollection(collection);
  return NextResponse.json({ items });
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ collection: string }> }
) {
  const { collection } = await params;
  const body = await request.json();
  const item = await createCollectionItem(collection, body);
  revalidateTag(CMS_CACHE_TAG, {});
  return NextResponse.json({ item }, { status: 201 });
}
