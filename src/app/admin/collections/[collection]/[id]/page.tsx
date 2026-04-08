"use client";

import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type CollectionItem = {
  id: string;
  collection: string;
  slug: string | null;
  title: string;
  subtitle: string | null;
  body: string | null;
  imageUrl: string | null;
  linkUrl: string | null;
  metadata: unknown;
  sortOrder: number;
  isPublished: boolean;
};

export default function AdminCollectionEditItemPage() {
  const params = useParams<{ collection: string; id: string }>();
  const router = useRouter();
  const collection = useMemo(() => decodeURIComponent(params.collection), [params.collection]);
  const id = params.id;

  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState<CollectionItem | null>(null);
  const [metadataText, setMetadataText] = useState("{}");

  useEffect(() => {
    void (async () => {
      const response = await fetch(`/api/admin/collections/${encodeURIComponent(collection)}`, {
        cache: "no-store",
      });
      const data = await response.json().catch(() => ({ items: [] }));
      const found = (data.items || []).find((entry: CollectionItem) => entry.id === id) || null;
      setItem(found);
      setMetadataText(JSON.stringify(found?.metadata ?? {}, null, 2));
      setLoading(false);
    })();
  }, [collection, id]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!item) {
      return;
    }

    let metadata: unknown = {};
    try {
      metadata = JSON.parse(metadataText || "{}");
    } catch {
      setStatus("Metadata JSON is invalid.");
      return;
    }

    const response = await fetch(
      `/api/admin/collections/${encodeURIComponent(collection)}/${item.id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: item.slug || undefined,
          title: item.title,
          subtitle: item.subtitle || undefined,
          body: item.body || undefined,
          imageUrl: item.imageUrl || undefined,
          linkUrl: item.linkUrl || undefined,
          metadata,
          sortOrder: Number(item.sortOrder || 0),
          isPublished: item.isPublished,
        }),
      }
    );

    if (!response.ok) {
      setStatus("Failed to save item.");
      return;
    }

    setStatus("Item saved.");
  }

  async function removeItem() {
    if (!item) {
      return;
    }

    const response = await fetch(
      `/api/admin/collections/${encodeURIComponent(collection)}/${item.id}`,
      { method: "DELETE" }
    );

    if (!response.ok) {
      setStatus("Failed to delete item.");
      return;
    }

    router.replace(`/admin/collections/${encodeURIComponent(collection)}`);
    router.refresh();
  }

  return (
    <AdminShell title={`Edit Item: ${collection}`} subtitle="Update item fields and save changes.">
      <div className="mb-4 flex flex-wrap gap-2">
        <Link href={`/admin/collections/${encodeURIComponent(collection)}`}>
          <Button variant="outline">Back to Collection</Button>
        </Link>
        <Button variant="outline" onClick={removeItem}>
          Delete Item
        </Button>
      </div>

      {status ? <p className="mb-3 text-sm text-[#025143]">{status}</p> : null}
      {loading ? <p className="text-sm text-gray-500">Loading item...</p> : null}
      {!loading && !item ? <p className="text-sm text-red-600">Item not found.</p> : null}

      {item ? (
        <form className="grid gap-3 md:grid-cols-2" onSubmit={onSubmit}>
          <Input
            placeholder="Slug"
            value={item.slug || ""}
            onChange={(event) => setItem((prev) => (prev ? { ...prev, slug: event.target.value } : prev))}
          />
          <Input
            placeholder="Title"
            required
            value={item.title}
            onChange={(event) => setItem((prev) => (prev ? { ...prev, title: event.target.value } : prev))}
          />
          <Input
            placeholder="Subtitle"
            value={item.subtitle || ""}
            onChange={(event) =>
              setItem((prev) => (prev ? { ...prev, subtitle: event.target.value } : prev))
            }
          />
          <Input
            placeholder="Image URL"
            value={item.imageUrl || ""}
            onChange={(event) =>
              setItem((prev) => (prev ? { ...prev, imageUrl: event.target.value } : prev))
            }
          />
          <Input
            placeholder="Link URL"
            value={item.linkUrl || ""}
            onChange={(event) =>
              setItem((prev) => (prev ? { ...prev, linkUrl: event.target.value } : prev))
            }
          />
          <Input
            type="number"
            placeholder="Sort Order"
            value={String(item.sortOrder)}
            onChange={(event) =>
              setItem((prev) =>
                prev ? { ...prev, sortOrder: Number(event.target.value) || 0 } : prev
              )
            }
          />
          <div className="md:col-span-2">
            <Textarea
              placeholder="Body"
              className="min-h-[120px]"
              value={item.body || ""}
              onChange={(event) => setItem((prev) => (prev ? { ...prev, body: event.target.value } : prev))}
            />
          </div>
          <div className="md:col-span-2">
            <Textarea
              placeholder="Metadata JSON"
              className="min-h-[120px] font-mono text-sm"
              value={metadataText}
              onChange={(event) => setMetadataText(event.target.value)}
            />
          </div>
          <label className="inline-flex items-center gap-2 text-sm md:col-span-2">
            <input
              type="checkbox"
              checked={item.isPublished}
              onChange={(event) =>
                setItem((prev) => (prev ? { ...prev, isPublished: event.target.checked } : prev))
              }
            />
            Published
          </label>
          <div className="md:col-span-2">
            <Button type="submit">Save Item</Button>
          </div>
        </form>
      ) : null}
    </AdminShell>
  );
}
