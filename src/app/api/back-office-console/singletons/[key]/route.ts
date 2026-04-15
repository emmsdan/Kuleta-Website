import { NextRequest, NextResponse } from "next/server";
import { getSingleton, setSingleton } from "@/lib/cms";

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
  return NextResponse.json({ item });
}
