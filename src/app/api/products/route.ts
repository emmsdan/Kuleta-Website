import { NextResponse } from "next/server";
import { getProductsWithFallback } from "@/app/lib/catalog-api";

export async function GET() {
  const result = await getProductsWithFallback();
  return NextResponse.json(result);
}
