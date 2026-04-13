"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { Button } from "@/components/ui/button";

type SingletonItem = {
  id: string;
  key: string;
  value: unknown;
};

export default function AdminSingletonsPage() {
  const [items, setItems] = useState<SingletonItem[]>([]);

  useEffect(() => {
    void (async () => {
      const response = await fetch("/api/admin/singletons", { cache: "no-store" });
      const data = await response.json().catch(() => ({ items: [] }));
      setItems(data.items || []);
    })();
  }, []);

  return (
    <AdminShell
      title="Content Sections"
      subtitle="Each content section is a single document that controls site-wide content. Click edit to update it."
    >
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-sm">
          <thead>
            <tr className="border-b bg-gray-50 text-left">
              <th className="px-3 py-2">Key</th>
              <th className="px-3 py-2">Preview</th>
              <th className="px-3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-b align-top">
                <td className="px-3 py-2 font-medium">{item.key}</td>
                <td className="px-3 py-2 max-w-[520px]">
                  <pre className="overflow-auto rounded bg-gray-100 p-2 text-xs">
                    {JSON.stringify(item.value, null, 2)}
                  </pre>
                </td>
                <td className="px-3 py-2">
                  <Link href={`/admin/singletons/${encodeURIComponent(item.key)}`}>
                    <Button size="sm">Edit</Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}
