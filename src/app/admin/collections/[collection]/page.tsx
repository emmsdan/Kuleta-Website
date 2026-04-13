"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { Button } from "@/components/ui/button";

type CollectionItem = {
  id: string;
  collection: string;
  slug: string | null;
  title: string;
  subtitle: string | null;
  sortOrder: number;
  isPublished: boolean;
};

export default function AdminCollectionItemsPage() {
  const params = useParams<{ collection: string }>();
  const collection = useMemo(() => decodeURIComponent(params.collection), [params.collection]);
  const [items, setItems] = useState<CollectionItem[]>([]);

  useEffect(() => {
    void (async () => {
      const response = await fetch(`/api/admin/collections/${encodeURIComponent(collection)}`, {
        cache: "no-store",
      });
      const data = await response.json().catch(() => ({ items: [] }));
      setItems(data.items || []);
    })();
  }, [collection]);

  return (
    <AdminShell
      title={`Collection: ${collection}`}
      subtitle="Items are listed in a table. Open any item to edit on a standalone page."
    >
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <Link href="/admin/collections">
          <Button variant="outline">Back to Collections</Button>
        </Link>
        <Link href={`/admin/collections/${encodeURIComponent(collection)}/new`}>
          <Button>Create New Item</Button>
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-sm">
          <thead>
            <tr className="border-b bg-gray-50 text-left">
              <th className="px-3 py-2">Title</th>
              <th className="px-3 py-2">Slug</th>
              <th className="px-3 py-2">Subtitle</th>
              <th className="px-3 py-2">Sort</th>
              <th className="px-3 py-2">Published</th>
              <th className="px-3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-b">
                <td className="px-3 py-2 font-medium">{item.title}</td>
                <td className="px-3 py-2">{item.slug || "-"}</td>
                <td className="px-3 py-2">{item.subtitle || "-"}</td>
                <td className="px-3 py-2">{item.sortOrder}</td>
                <td className="px-3 py-2">{item.isPublished ? "Yes" : "No"}</td>
                <td className="px-3 py-2">
                  <Link href={`/admin/collections/${encodeURIComponent(collection)}/${item.id}`}>
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
