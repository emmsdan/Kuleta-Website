import { NextRequest, NextResponse } from "next/server";
import { getCollection, getSingleton } from "@/lib/cms";

export async function GET(request: NextRequest) {
  const key = request.nextUrl.searchParams.get("key");
  const collection = request.nextUrl.searchParams.get("collection");

  if (key) {
    const value = await getSingleton(key, null);
    return NextResponse.json({ key, value });
  }

  if (collection) {
    const items = await getCollection(collection);
    return NextResponse.json({ collection, items });
  }

  return NextResponse.json(
    { error: "Provide ?key=... or ?collection=..." },
    { status: 400 }
  );
}
