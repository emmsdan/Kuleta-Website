import { NextResponse } from "next/server";
import { getCategoriesWithFallback } from "@/app/lib/catalog-api";

export async function GET() {
  const result = await getCategoriesWithFallback();
  return NextResponse.json(result);
}
