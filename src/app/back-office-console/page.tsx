// ...existing code...
export const dynamic = "force-dynamic";
import { redirect } from "next/navigation";

export default function AdminRootPage() {
  redirect("/back-office-console/pages");
}
