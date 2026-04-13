"use client";

import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { AdminShell } from "@/components/admin/AdminShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toSentenceCase } from "@/lib/string";
import { X } from "lucide-react";

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

type MetadataField = {
  key: string;
  value: string;
  type: "text" | "multiline";
};

function getCollectionFormName(collection: string): string {
  // Convert collection name to friendly form (e.g., "team-members" -> "Team members")
  return toSentenceCase(collection.replace(/-/g, " "));
}

function metadataToFields(
  metadata: unknown
): MetadataField[] {
  if (typeof metadata !== "object" || metadata === null) return [];
  const fields: MetadataField[] = [];
  for (const [key, value] of Object.entries(metadata)) {
    const isMultiline =
      typeof value === "string" &&
      (value.length > 80 || value.includes("\n"));
    fields.push({
      key,
      value: typeof value === "string" ? value : JSON.stringify(value),
      type: isMultiline ? "multiline" : "text",
    });
  }
  return fields;
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

export default function AdminCollectionEditItemPage() {
  const params = useParams<{ collection: string; id: string }>();
  const router = useRouter();
  const collection = useMemo(() => decodeURIComponent(params.collection), [params.collection]);
  const collectionFormName = useMemo(() => getCollectionFormName(collection), [collection]);
  const id = params.id;

  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState<CollectionItem | null>(null);
  const [metadataFields, setMetadataFields] = useState<MetadataField[]>([]);

  useEffect(() => {
    void (async () => {
      const response = await fetch(`/api/admin/collections/${encodeURIComponent(collection)}`, {
        cache: "no-store",
      });
      const data = await response.json().catch(() => ({ items: [] }));
      const found = (data.items || []).find((entry: CollectionItem) => entry.id === id) || null;
      setItem(found);
      setMetadataFields(metadataToFields(found?.metadata));
      setLoading(false);
    })();
  }, [collection, id]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!item) {
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
          metadata: fieldsToMetadata(metadataFields),
          sortOrder: Number(item.sortOrder || 0),
          isPublished: item.isPublished,
        }),
      }
    );

    if (!response.ok) {
      toast.error(`Failed to save ${collectionFormName} item.`);
      return;
    }

    toast.success(`${collectionFormName} item saved successfully.`);
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
      toast.error(`Failed to delete ${collectionFormName} item.`);
      return;
    }

    toast.success(`${collectionFormName} item deleted.`);
    router.replace(`/admin/collections/${encodeURIComponent(collection)}`);
    router.refresh();
  }

  return (
    <AdminShell title={`Edit ${collectionFormName} Item`} subtitle="Update item fields and save changes.">
      <div className="mb-4 flex flex-wrap gap-2">
        <Link href={`/admin/collections/${encodeURIComponent(collection)}`}>
          <Button variant="outline">Back to {collectionFormName}</Button>
        </Link>
        <Button variant="outline" onClick={removeItem}>
          Delete Item
        </Button>
      </div>

      {loading ? <p className="text-sm text-gray-500">Loading item...</p> : null}
      {!loading && !item ? <p className="text-sm text-red-600">Item not found.</p> : null}

      {item ? (
        <form className="grid gap-4 md:grid-cols-2" onSubmit={onSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Slug (URL identifier)
            </label>
            <Input
              placeholder="e.g., john-doe"
              value={item.slug || ""}
              onChange={(event) => setItem((prev) => (prev ? { ...prev, slug: event.target.value } : prev))}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title (Required)
            </label>
            <Input
              placeholder="Enter title"
              required
              value={item.title}
              onChange={(event) => setItem((prev) => (prev ? { ...prev, title: event.target.value } : prev))}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Subtitle
            </label>
            <Input
              placeholder="Enter subtitle"
              value={item.subtitle || ""}
              onChange={(event) =>
                setItem((prev) => (prev ? { ...prev, subtitle: event.target.value } : prev))
              }
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image URL
            </label>
            <Input
              placeholder="https://example.com/image.jpg"
              value={item.imageUrl || ""}
              onChange={(event) =>
                setItem((prev) => (prev ? { ...prev, imageUrl: event.target.value } : prev))
              }
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Link URL
            </label>
            <Input
              placeholder="https://example.com"
              value={item.linkUrl || ""}
              onChange={(event) =>
                setItem((prev) => (prev ? { ...prev, linkUrl: event.target.value } : prev))
              }
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sort Order
            </label>
            <Input
              type="number"
              placeholder="0"
              value={String(item.sortOrder)}
              onChange={(event) =>
                setItem((prev) =>
                  prev ? { ...prev, sortOrder: Number(event.target.value) || 0 } : prev
                )
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
              value={item.body || ""}
              onChange={(event) => setItem((prev) => (prev ? { ...prev, body: event.target.value } : prev))}
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
                checked={item.isPublished}
                onChange={(event) =>
                  setItem((prev) => (prev ? { ...prev, isPublished: event.target.checked } : prev))
                }
              />
              <span>Publish this item</span>
            </label>
          </div>
          
          <div className="md:col-span-2">
            <Button type="submit" className="w-full md:w-auto">Save {collectionFormName} Item</Button>
          </div>
        </form>
      ) : null}
    </AdminShell>
  );
}
