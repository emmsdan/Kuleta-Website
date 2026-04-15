import { NextResponse } from "next/server";
import { getAdminSessionFromCookies } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getAdminSessionFromCookies();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const admin = await prisma.adminUser.findUnique({
    where: { id: session.adminId },
    select: { id: true, email: true, name: true, isActive: true },
  });

  if (!admin || !admin.isActive) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({ user: admin });
}
