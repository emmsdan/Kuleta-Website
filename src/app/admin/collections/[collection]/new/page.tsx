"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function AdminCollectionCreateItemPage() {
  const params = useParams<{ collection: string }>();
  const router = useRouter();
  const collection = useMemo(() => decodeURIComponent(params.collection), [params.collection]);
  const [status, setStatus] = useState("");
  const [form, setForm] = useState({
    slug: "",
    title: "",
    subtitle: "",
    body: "",
    imageUrl: "",
    linkUrl: "",
    metadata: "{}",
    sortOrder: 0,
    isPublished: true,
  });

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    let metadata: unknown = {};
    try {
      metadata = JSON.parse(form.metadata || "{}");
    } catch {
      setStatus("Metadata JSON is invalid.");
      return;
    }

    const response = await fetch(`/api/admin/collections/${encodeURIComponent(collection)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        slug: form.slug || undefined,
        title: form.title,
        subtitle: form.subtitle || undefined,
        body: form.body || undefined,
        imageUrl: form.imageUrl || undefined,
        linkUrl: form.linkUrl || undefined,
        metadata,
        sortOrder: Number(form.sortOrder || 0),
        isPublished: form.isPublished,
      }),
    });

    if (!response.ok) {
      setStatus("Failed to create item.");
      return;
    }

    router.replace(`/admin/collections/${encodeURIComponent(collection)}`);
    router.refresh();
  }

  return (
    <AdminShell title={`Create Item: ${collection}`} subtitle="Add a new collection item.">
      <div className="mb-4">
        <Link href={`/admin/collections/${encodeURIComponent(collection)}`}>
          <Button variant="outline">Back to Collection</Button>
        </Link>
      </div>

      {status ? <p className="mb-3 text-sm text-red-600">{status}</p> : null}

      <form className="grid gap-3 md:grid-cols-2" onSubmit={onSubmit}>
        <Input
          placeholder="Slug"
          value={form.slug}
          onChange={(event) => setForm((prev) => ({ ...prev, slug: event.target.value }))}
        />
        <Input
          placeholder="Title"
          required
          value={form.title}
          onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
        />
        <Input
          placeholder="Subtitle"
          value={form.subtitle}
          onChange={(event) => setForm((prev) => ({ ...prev, subtitle: event.target.value }))}
        />
        <Input
          placeholder="Image URL"
          value={form.imageUrl}
          onChange={(event) => setForm((prev) => ({ ...prev, imageUrl: event.target.value }))}
        />
        <Input
          placeholder="Link URL"
          value={form.linkUrl}
          onChange={(event) => setForm((prev) => ({ ...prev, linkUrl: event.target.value }))}
        />
        <Input
          type="number"
          placeholder="Sort Order"
          value={String(form.sortOrder)}
          onChange={(event) =>
            setForm((prev) => ({ ...prev, sortOrder: Number(event.target.value) || 0 }))
          }
        />
        <div className="md:col-span-2">
          <Textarea
            placeholder="Body"
            className="min-h-[120px]"
            value={form.body}
            onChange={(event) => setForm((prev) => ({ ...prev, body: event.target.value }))}
          />
        </div>
        <div className="md:col-span-2">
          <Textarea
            placeholder="Metadata JSON"
            className="min-h-[120px] font-mono text-sm"
            value={form.metadata}
            onChange={(event) => setForm((prev) => ({ ...prev, metadata: event.target.value }))}
          />
        </div>
        <label className="inline-flex items-center gap-2 text-sm md:col-span-2">
          <input
            type="checkbox"
            checked={form.isPublished}
            onChange={(event) => setForm((prev) => ({ ...prev, isPublished: event.target.checked }))}
          />
          Published
        </label>
        <div className="md:col-span-2">
          <Button type="submit">Create Item</Button>
        </div>
      </form>
    </AdminShell>
  );
}
