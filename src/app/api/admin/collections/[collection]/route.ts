import { NextRequest, NextResponse } from "next/server";
import { createCollectionItem, getCollection } from "@/lib/cms";

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
  return NextResponse.json({ item }, { status: 201 });
}
