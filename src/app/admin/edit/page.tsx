import { redirect } from "next/navigation";

export default function AdminEditRedirectPage() {
  redirect("/admin/pages");
}
