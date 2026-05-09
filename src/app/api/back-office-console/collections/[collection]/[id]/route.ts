import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { deleteCollectionItem, updateCollectionItem, CMS_CACHE_TAG } from "@/lib/cms";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();
  const item = await updateCollectionItem(id, body);
  revalidateTag(CMS_CACHE_TAG);
  return NextResponse.json({ item });
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await deleteCollectionItem(id);
  revalidateTag(CMS_CACHE_TAG);
  return NextResponse.json({ success: true });
}
