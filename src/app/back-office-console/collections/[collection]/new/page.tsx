"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { AdminShell } from "@/components/back-office-console/AdminShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toSentenceCase } from "@/lib/string";
import { X } from "lucide-react";

type MetadataField = {
  key: string;
  value: string;
  type: "text" | "multiline";
};

function getCollectionFormName(collection: string): string {
  return toSentenceCase(collection.replace(/-/g, " "));
}

function fieldsToMetadata(fields: MetadataField[]): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const field of fields) {
    if (field.key) {
      result[field.key] = field.value;
    }
  }
  return result;
}

export default function AdminCollectionCreateItemPage() {
  const params = useParams<{ collection: string }>();
  const router = useRouter();
  const collection = useMemo(() => decodeURIComponent(params.collection), [params.collection]);
  const collectionFormName = useMemo(() => getCollectionFormName(collection), [collection]);
  
  const [form, setForm] = useState({
    slug: "",
    title: "",
    subtitle: "",
    body: "",
    imageUrl: "",
    linkUrl: "",
    sortOrder: 0,
    isPublished: true,
  });

  const [metadataFields, setMetadataFields] = useState<MetadataField[]>([]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const response = await fetch(`/api/back-office-console/collections/${encodeURIComponent(collection)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        slug: form.slug || undefined,
        title: form.title,
        subtitle: form.subtitle || undefined,
        body: form.body || undefined,
        imageUrl: form.imageUrl || undefined,
        linkUrl: form.linkUrl || undefined,
        metadata: fieldsToMetadata(metadataFields),
        sortOrder: Number(form.sortOrder || 0),
        isPublished: form.isPublished,
      }),
    });

    if (!response.ok) {
      toast.error(`Failed to create ${collectionFormName} item.`);
      return;
    }

    toast.success(`${collectionFormName} item created successfully.`);
    router.replace(`/back-office-console/collections/${encodeURIComponent(collection)}`);
    router.refresh();
  }

  return (
    <AdminShell title={`Create New ${collectionFormName} Item`} subtitle="Fill in the details below to add a new item.">
      <div className="mb-4">
        <Link href={`/back-office-console/collections/${encodeURIComponent(collection)}`}>
          <Button variant="outline">Back to {collectionFormName}</Button>
        </Link>
      </div>

      <form className="grid gap-4 md:grid-cols-2" onSubmit={onSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Slug (URL identifier)
          </label>
          <Input
            placeholder="e.g., john-doe"
            value={form.slug}
            onChange={(event) => setForm((prev) => ({ ...prev, slug: event.target.value }))}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title (Required)
          </label>
          <Input
            placeholder="Enter title"
            required
            value={form.title}
            onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Subtitle
          </label>
          <Input
            placeholder="Enter subtitle"
            value={form.subtitle}
            onChange={(event) => setForm((prev) => ({ ...prev, subtitle: event.target.value }))}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Image URL
          </label>
          <Input
            placeholder="https://example.com/image.jpg"
            value={form.imageUrl}
            onChange={(event) => setForm((prev) => ({ ...prev, imageUrl: event.target.value }))}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Link URL
          </label>
          <Input
            placeholder="https://example.com"
            value={form.linkUrl}
            onChange={(event) => setForm((prev) => ({ ...prev, linkUrl: event.target.value }))}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Sort Order
          </label>
          <Input
            type="number"
            placeholder="0"
            value={String(form.sortOrder)}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, sortOrder: Number(event.target.value) || 0 }))
            }
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Body / Description
          </label>
          <Textarea
            placeholder="Enter detailed content..."
            className="min-h-[120px]"
            value={form.body}
            onChange={(event) => setForm((prev) => ({ ...prev, body: event.target.value }))}
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Additional Metadata Fields
          </label>
          <div className="border rounded-md p-4 bg-gray-50 space-y-3">
            {metadataFields.length === 0 ? (
              <p className="text-sm text-gray-500">No additional metadata fields yet.</p>
            ) : (
              metadataFields.map((field, index) => (
                <div key={index} className="flex gap-2 items-start bg-white p-3 rounded border">
                  <div className="flex-1">
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Field Name
                    </label>
                    <Input
                      placeholder="e.g., author, category"
                      value={field.key}
                      onChange={(e) => {
                        const updated = [...metadataFields];
                        updated[index].key = e.target.value;
                        setMetadataFields(updated);
                      }}
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Type
                    </label>
                    <select
                      value={field.type}
                      onChange={(e) => {
                        const updated = [...metadataFields];
                        updated[index].type = e.target.value as "text" | "multiline";
                        setMetadataFields(updated);
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-[#025143] focus:border-transparent"
                    >
                      <option value="text">Single Line</option>
                      <option value="multiline">Multiline</option>
                    </select>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setMetadataFields(metadataFields.filter((_, i) => i !== index));
                    }}
                    className="mt-6"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))
            )}
            
            {metadataFields.map((field, index) => (
              <div key={`value-${index}`} className="space-y-1">
                <label className="block text-xs font-medium text-gray-600">
                  {field.key || "Field Value"}
                </label>
                {field.type === "multiline" ? (
                  <Textarea
                    placeholder="Enter value..."
                    value={field.value}
                    onChange={(e) => {
                      const updated = [...metadataFields];
                      updated[index].value = e.target.value;
                      setMetadataFields(updated);
                    }}
                    className="min-h-[80px]"
                  />
                ) : (
                  <Input
                    placeholder="Enter value..."
                    value={field.value}
                    onChange={(e) => {
                      const updated = [...metadataFields];
                      updated[index].value = e.target.value;
                      setMetadataFields(updated);
                    }}
                  />
                )}
              </div>
            ))}

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                setMetadataFields([...metadataFields, { key: "", value: "", type: "text" }]);
              }}
            >
              + Add Metadata Field
            </Button>
          </div>
        </div>

        <div className="md:col-span-2 flex items-center gap-2">
          <label className="inline-flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.isPublished}
              onChange={(event) => setForm((prev) => ({ ...prev, isPublished: event.target.checked }))}
            />
            <span>Publish this item</span>
          </label>
        </div>

        <div className="md:col-span-2">
          <Button type="submit" className="w-full md:w-auto">Create {collectionFormName} Item</Button>
        </div>
      </form>
    </AdminShell>
  );
}
