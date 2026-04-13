import { NextResponse } from "next/server";
import { getHomeCategoriesWithFallback } from "@/lib/catalog-api";

export async function GET() {
  const result = await getHomeCategoriesWithFallback();
  return NextResponse.json(result);
}
