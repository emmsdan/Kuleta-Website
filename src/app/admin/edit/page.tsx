"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type SingletonItem = {
  id: string;
  key: string;
  value: unknown;
};

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

type AdminUser = {
  id: string;
  email: string;
  name: string | null;
  isActive: boolean;
  createdAt: string;
  lastLoginAt: string | null;
};

type CurrentAdmin = {
  id: string;
  email: string;
  name: string | null;
};

const INITIAL_ITEM: Omit<CollectionItem, "id" | "collection"> = {
  slug: "",
  title: "",
  subtitle: "",
  body: "",
  imageUrl: "",
  linkUrl: "",
  metadata: {},
  sortOrder: 0,
  isPublished: true,
};

const INITIAL_ADMIN_FORM = {
  name: "",
  email: "",
  password: "",
};

export default function AdminPage() {
  const router = useRouter();
  const [singletons, setSingletons] = useState<SingletonItem[]>([]);
  const [collections, setCollections] = useState<string[]>([]);
  const [activeSingletonKey, setActiveSingletonKey] = useState("");
  const [singletonEditor, setSingletonEditor] = useState("{}");
  const [activeCollection, setActiveCollection] = useState("");
  const [collectionItems, setCollectionItems] = useState<CollectionItem[]>([]);
  const [draftItem, setDraftItem] = useState(INITIAL_ITEM);
  const [status, setStatus] = useState("");
  const [currentAdmin, setCurrentAdmin] = useState<CurrentAdmin | null>(null);
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);
  const [adminForm, setAdminForm] = useState(INITIAL_ADMIN_FORM);

  const activeSingleton = useMemo(
    () => singletons.find((item) => item.key === activeSingletonKey),
    [singletons, activeSingletonKey]
  );

  async function loadCurrentAdmin() {
    const response = await fetch("/api/admin/auth/me", { cache: "no-store" });
    if (response.status === 401) {
      router.replace("/admin/login");
      return;
    }

    const data = await response.json();
    setCurrentAdmin(data.user || null);
  }

  async function loadSingletons() {
    const response = await fetch("/api/admin/singletons", { cache: "no-store" });
    const data = await response.json();
    setSingletons(data.items || []);
    if (!activeSingletonKey && data.items?.length) {
      setActiveSingletonKey(data.items[0].key);
      setSingletonEditor(JSON.stringify(data.items[0].value, null, 2));
    }
  }

  async function loadCollections() {
    const response = await fetch("/api/admin/collections", { cache: "no-store" });
    const data = await response.json();
    setCollections(data.collections || []);
    if (!activeCollection && data.collections?.length) {
      setActiveCollection(data.collections[0]);
    }
  }

  async function loadCollectionItems(collection: string) {
    if (!collection) {
      return;
    }
    const response = await fetch(`/api/admin/collections/${encodeURIComponent(collection)}`, {
      cache: "no-store",
    });
    const data = await response.json();
    setCollectionItems(data.items || []);
  }

  async function loadAdminUsers() {
    const response = await fetch("/api/admin/users", { cache: "no-store" });
    if (!response.ok) {
      return;
    }
    const data = await response.json();
    setAdminUsers(data.users || []);
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    void loadCurrentAdmin();
    void loadSingletons();
    void loadCollections();
    void loadAdminUsers();
  }, []);

  useEffect(() => {
    if (!activeCollection) {
      return;
    }
    void loadCollectionItems(activeCollection);
  }, [activeCollection]);

  useEffect(() => {
    if (activeSingleton) {
      setSingletonEditor(JSON.stringify(activeSingleton.value, null, 2));
    }
  }, [activeSingleton]);

  async function saveSingleton() {
    if (!activeSingletonKey) {
      return;
    }

    try {
      const value = JSON.parse(singletonEditor);
      await fetch(`/api/admin/singletons/${encodeURIComponent(activeSingletonKey)}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ value }),
      });
      setStatus("Singleton updated.");
      await loadSingletons();
    } catch {
      setStatus("Invalid JSON in singleton editor.");
    }
  }

  async function createItem() {
    if (!activeCollection || !draftItem.title.trim()) {
      setStatus("Collection item title is required.");
      return;
    }

    let parsedMetadata: unknown = {};
    try {
      parsedMetadata =
        typeof draftItem.metadata === "string"
          ? JSON.parse(draftItem.metadata)
          : draftItem.metadata;
    } catch {
      setStatus("Metadata must be valid JSON.");
      return;
    }

    await fetch(`/api/admin/collections/${encodeURIComponent(activeCollection)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...draftItem,
        metadata: parsedMetadata,
      }),
    });

    setDraftItem(INITIAL_ITEM);
    setStatus("Collection item created.");
    await loadCollectionItems(activeCollection);
  }

  async function saveItem(item: CollectionItem) {
    let parsedMetadata: unknown = item.metadata;
    try {
      if (typeof item.metadata === "string") {
        parsedMetadata = JSON.parse(item.metadata);
      }
    } catch {
      setStatus(`Invalid metadata JSON for ${item.title}.`);
      return;
    }

    await fetch(`/api/admin/collections/${encodeURIComponent(item.collection)}/${item.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        slug: item.slug || undefined,
        title: item.title,
        subtitle: item.subtitle || undefined,
        body: item.body || undefined,
        imageUrl: item.imageUrl || undefined,
        linkUrl: item.linkUrl || undefined,
        metadata: parsedMetadata,
        sortOrder: Number(item.sortOrder || 0),
        isPublished: item.isPublished,
      }),
    });

    setStatus(`Saved ${item.title}.`);
    await loadCollectionItems(activeCollection);
  }

  async function removeItem(item: CollectionItem) {
    await fetch(`/api/admin/collections/${encodeURIComponent(item.collection)}/${item.id}`, {
      method: "DELETE",
    });
    setStatus(`Deleted ${item.title}.`);
    await loadCollectionItems(activeCollection);
  }

  async function createAdminUser() {
    if (!adminForm.email.trim() || adminForm.password.length < 8) {
      setStatus("Admin email and password (min 8 chars) are required.");
      return;
    }

    const response = await fetch("/api/admin/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(adminForm),
    });

    const data = await response.json().catch(() => null);
    if (!response.ok) {
      setStatus(data?.error || "Unable to create admin user.");
      return;
    }

    setAdminForm(INITIAL_ADMIN_FORM);
    setStatus(`Admin user ${data.user.email} created.`);
    await loadAdminUsers();
  }

  async function logout() {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-4 space-y-8">
        <section className="bg-white border rounded-xl p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl mb-2">CMS Admin Dashboard</h1>
              <p className="text-gray-600">
                Manage all page content, links, contact details, and media metadata from one place.
              </p>
              {currentAdmin ? (
                <p className="text-sm text-gray-500 mt-2">
                  Signed in as {currentAdmin.name || currentAdmin.email}
                </p>
              ) : null}
            </div>
            <Button variant="outline" onClick={logout}>
              Log Out
            </Button>
          </div>
          {status ? <p className="mt-3 text-sm text-[#025143]">{status}</p> : null}
        </section>

        <section className="bg-white border rounded-xl p-6 space-y-4">
          <h2 className="text-2xl">Admin Users</h2>
          <p className="text-sm text-gray-600">
            Create additional admins who can log in and manage the CMS.
          </p>

          <div className="grid md:grid-cols-3 gap-3 border rounded-lg p-4 bg-gray-50">
            <Input
              placeholder="Name (optional)"
              value={adminForm.name}
              onChange={(event) => setAdminForm((prev) => ({ ...prev, name: event.target.value }))}
            />
            <Input
              placeholder="Email"
              type="email"
              value={adminForm.email}
              onChange={(event) =>
                setAdminForm((prev) => ({ ...prev, email: event.target.value.toLowerCase() }))
              }
            />
            <Input
              placeholder="Password"
              type="password"
              value={adminForm.password}
              onChange={(event) =>
                setAdminForm((prev) => ({ ...prev, password: event.target.value }))
              }
            />
            <div className="md:col-span-3">
              <Button onClick={createAdminUser}>Create Admin</Button>
            </div>
          </div>

          <div className="space-y-2">
            {adminUsers.map((user) => (
              <article key={user.id} className="border rounded-lg p-3 text-sm">
                <p className="font-medium">{user.name || user.email}</p>
                <p className="text-gray-600">{user.email}</p>
                <p className="text-gray-500">
                  Created {new Date(user.createdAt).toLocaleString()}
                  {user.lastLoginAt
                    ? ` | Last login ${new Date(user.lastLoginAt).toLocaleString()}`
                    : " | Never logged in"}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-white border rounded-xl p-6 space-y-4">
          <h2 className="text-2xl">Singleton Content</h2>
          <p className="text-sm text-gray-600">
            Use singleton keys for global and page-level JSON content blocks.
          </p>
          <select
            value={activeSingletonKey}
            onChange={(event) => setActiveSingletonKey(event.target.value)}
            className="w-full rounded-md border px-3 py-2"
          >
            {singletons.map((item) => (
              <option key={item.id} value={item.key}>
                {item.key}
              </option>
            ))}
          </select>
          <Textarea
            value={singletonEditor}
            onChange={(event) => setSingletonEditor(event.target.value)}
            className="min-h-[320px] font-mono text-sm"
          />
          <Button onClick={saveSingleton}>Save Singleton</Button>
        </section>

        <section className="bg-white border rounded-xl p-6 space-y-6">
          <h2 className="text-2xl">Collection Content</h2>

          <select
            value={activeCollection}
            onChange={(event) => setActiveCollection(event.target.value)}
            className="w-full rounded-md border px-3 py-2"
          >
            {collections.map((collection) => (
              <option key={collection} value={collection}>
                {collection}
              </option>
            ))}
          </select>

          <div className="grid md:grid-cols-2 gap-4 border rounded-lg p-4 bg-gray-50">
            <Input
              placeholder="Slug"
              value={String(draftItem.slug || "")}
              onChange={(event) => setDraftItem((prev) => ({ ...prev, slug: event.target.value }))}
            />
            <Input
              placeholder="Title"
              value={draftItem.title}
              onChange={(event) => setDraftItem((prev) => ({ ...prev, title: event.target.value }))}
            />
            <Input
              placeholder="Subtitle"
              value={String(draftItem.subtitle || "")}
              onChange={(event) =>
                setDraftItem((prev) => ({ ...prev, subtitle: event.target.value }))
              }
            />
            <Input
              placeholder="Image URL"
              value={String(draftItem.imageUrl || "")}
              onChange={(event) =>
                setDraftItem((prev) => ({ ...prev, imageUrl: event.target.value }))
              }
            />
            <Input
              placeholder="Link URL"
              value={String(draftItem.linkUrl || "")}
              onChange={(event) =>
                setDraftItem((prev) => ({ ...prev, linkUrl: event.target.value }))
              }
            />
            <Input
              type="number"
              placeholder="Sort Order"
              value={String(draftItem.sortOrder || 0)}
              onChange={(event) =>
                setDraftItem((prev) => ({ ...prev, sortOrder: Number(event.target.value) || 0 }))
              }
            />
            <div className="md:col-span-2">
              <Textarea
                placeholder="Body"
                value={String(draftItem.body || "")}
                onChange={(event) => setDraftItem((prev) => ({ ...prev, body: event.target.value }))}
                className="min-h-[110px]"
              />
            </div>
            <div className="md:col-span-2">
              <Textarea
                placeholder="Metadata (JSON)"
                value={JSON.stringify(draftItem.metadata, null, 2)}
                onChange={(event) =>
                  setDraftItem((prev) => ({ ...prev, metadata: event.target.value }))
                }
                className="min-h-[110px] font-mono text-sm"
              />
            </div>
            <div>
              <label className="inline-flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={draftItem.isPublished}
                  onChange={(event) =>
                    setDraftItem((prev) => ({ ...prev, isPublished: event.target.checked }))
                  }
                />
                Published
              </label>
            </div>
            <div className="md:col-span-2">
              <Button onClick={createItem}>Create Item</Button>
            </div>
          </div>

          <div className="space-y-4">
            {collectionItems.map((item) => (
              <article key={item.id} className="border rounded-lg p-4 space-y-3">
                <div className="grid md:grid-cols-2 gap-3">
                  <Input
                    value={item.slug || ""}
                    placeholder="Slug"
                    onChange={(event) =>
                      setCollectionItems((prev) =>
                        prev.map((entry) =>
                          entry.id === item.id ? { ...entry, slug: event.target.value } : entry
                        )
                      )
                    }
                  />
                  <Input
                    value={item.title}
                    placeholder="Title"
                    onChange={(event) =>
                      setCollectionItems((prev) =>
                        prev.map((entry) =>
                          entry.id === item.id ? { ...entry, title: event.target.value } : entry
                        )
                      )
                    }
                  />
                  <Input
                    value={item.subtitle || ""}
                    placeholder="Subtitle"
                    onChange={(event) =>
                      setCollectionItems((prev) =>
                        prev.map((entry) =>
                          entry.id === item.id ? { ...entry, subtitle: event.target.value } : entry
                        )
                      )
                    }
                  />
                  <Input
                    value={item.imageUrl || ""}
                    placeholder="Image URL"
                    onChange={(event) =>
                      setCollectionItems((prev) =>
                        prev.map((entry) =>
                          entry.id === item.id ? { ...entry, imageUrl: event.target.value } : entry
                        )
                      )
                    }
                  />
                  <Input
                    value={item.linkUrl || ""}
                    placeholder="Link URL"
                    onChange={(event) =>
                      setCollectionItems((prev) =>
                        prev.map((entry) =>
                          entry.id === item.id ? { ...entry, linkUrl: event.target.value } : entry
                        )
                      )
                    }
                  />
                  <Input
                    type="number"
                    value={String(item.sortOrder)}
                    placeholder="Sort Order"
                    onChange={(event) =>
                      setCollectionItems((prev) =>
                        prev.map((entry) =>
                          entry.id === item.id
                            ? { ...entry, sortOrder: Number(event.target.value) || 0 }
                            : entry
                        )
                      )
                    }
                  />
                </div>
                <Textarea
                  value={item.body || ""}
                  placeholder="Body"
                  onChange={(event) =>
                    setCollectionItems((prev) =>
                      prev.map((entry) =>
                        entry.id === item.id ? { ...entry, body: event.target.value } : entry
                      )
                    )
                  }
                />
                <Textarea
                  value={JSON.stringify(item.metadata, null, 2)}
                  placeholder="Metadata JSON"
                  className="font-mono text-sm"
                  onChange={(event) =>
                    setCollectionItems((prev) =>
                      prev.map((entry) =>
                        entry.id === item.id ? { ...entry, metadata: event.target.value } : entry
                      )
                    )
                  }
                />
                <div className="flex items-center justify-between">
                  <label className="inline-flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={item.isPublished}
                      onChange={(event) =>
                        setCollectionItems((prev) =>
                          prev.map((entry) =>
                            entry.id === item.id
                              ? { ...entry, isPublished: event.target.checked }
                              : entry
                          )
                        )
                      }
                    />
                    Published
                  </label>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => removeItem(item)}>
                      Delete
                    </Button>
                    <Button onClick={() => saveItem(item)}>Save</Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
