import { NextResponse } from "next/server";
import { getCategoriesWithFallback } from "@/lib/catalog-api";

export async function GET() {
  const result = await getCategoriesWithFallback();
  return NextResponse.json(result);
}
