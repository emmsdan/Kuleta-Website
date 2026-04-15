"use client";

import Link from "next/link";
import { AdminShell } from "@/components/back-office-console/AdminShell";
import { Button } from "@/components/ui/button";

const PAGE_ROWS = [
  {
    page: "Home",
    route: "/",
    singletonKey: "home.content",
    collection: "products",
  },
  {
    page: "About",
    route: "/about",
    singletonKey: "about.page",
    collection: "about.values",
  },
  {
    page: "Contact",
    route: "/contact",
    singletonKey: "contact.page",
    collection: "contact.cards",
  },
  {
    page: "FAQ",
    route: "/faq",
    singletonKey: "faq.page",
    collection: "faq.items",
  },
  {
    page: "Team",
    route: "/team",
    singletonKey: "team.page",
    collection: "team.members",
  },
  {
    page: "Advisory Board",
    route: "/advisory-board",
    singletonKey: "advisory.page",
    collection: "advisory.members",
  },
  {
    page: "Kuza Dada",
    route: "/kuza-dada",
    singletonKey: "kuza.page",
    collection: "kuza.programs",
  },
  {
    page: "Get Involved",
    route: "/get-involved",
    singletonKey: "get-involved.page",
    collection: "contact.cards",
  },
];

export default function AdminPagesPage() {
  return (
    <AdminShell
      title="Pages"
      subtitle="Manage content for each page. Edit the page content section or the items in the collection."
    >
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-sm">
          <thead>
            <tr className="border-b bg-gray-50 text-left">
              <th className="px-3 py-2">Page</th>
              <th className="px-3 py-2">Route</th>
              <th className="px-3 py-2">Content Section</th>
              <th className="px-3 py-2">Items Collection</th>
              <th className="px-3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {PAGE_ROWS.map((row) => (
              <tr key={row.page} className="border-b">
                <td className="px-3 py-2 font-medium">{row.page}</td>
                <td className="px-3 py-2">{row.route}</td>
                <td className="px-3 py-2 text-xs text-gray-600">{row.singletonKey}</td>
                <td className="px-3 py-2 text-xs text-gray-600">{row.collection}</td>
                <td className="px-3 py-2">
                  <div className="flex flex-wrap gap-2">
                    <Link href={`/back-office-console/singletons/${encodeURIComponent(row.singletonKey)}`}>
                      <Button size="sm" variant="outline">
                        Edit Content
                      </Button>
                    </Link>
                    <Link href={`/back-office-console/collections/${encodeURIComponent(row.collection)}`}>
                      <Button size="sm">Edit Items</Button>
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}
