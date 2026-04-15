"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AdminShell } from "@/components/back-office-console/AdminShell";
import { Button } from "@/components/ui/button";

type CollectionRow = {
  name: string;
};

export default function AdminCollectionsPage() {
  const [collections, setCollections] = useState<CollectionRow[]>([]);

  useEffect(() => {
    void (async () => {
      const response = await fetch("/api/back-office-console/collections", { cache: "no-store" });
      const data = await response.json().catch(() => ({ collections: [] }));
      setCollections((data.collections || []).map((name: string) => ({ name })));
    })();
  }, []);

  return (
    <AdminShell
      title="Collections"
      subtitle="Collections are lists of items you can manage. Click on a collection to view and edit its items."
    >
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-sm">
          <thead>
            <tr className="border-b bg-gray-50 text-left">
              <th className="px-3 py-2">Collection Name</th>
              <th className="px-3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {collections.map((collection) => (
              <tr key={collection.name} className="border-b">
                <td className="px-3 py-2 font-medium">{collection.name}</td>
                <td className="px-3 py-2">
                  <Link href={`/back-office-console/collections/${encodeURIComponent(collection.name)}`}>
                    <Button size="sm">Open Table</Button>
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
