"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { AdminShell } from "@/components/admin/AdminShell";
import { SingletonDynamicForm } from "@/components/admin/SingletonDynamicForm";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toSentenceCase } from "@/lib/string";

type JsonPrimitive = string | number | boolean | null;
type JsonValue = JsonPrimitive | JsonValue[] | { [key: string]: JsonValue };

function getFormName(key: string): string {
  // Convert keys like "home.page" to "Home page"
  // and "get-involved.page" to "Get involved page"
  return toSentenceCase(key.replace(/\./g, " ").replace(/-/g, " "));
}

export default function AdminSingletonDetailPage() {
  const params = useParams<{ key: string }>();
  const key = useMemo(() => decodeURIComponent(params.key), [params.key]);
  const formName = useMemo(() => getFormName(key), [key]);
  const [value, setValue] = useState<JsonValue | null>(null);
  const [rawMode, setRawMode] = useState(false);
  const [rawText, setRawText] = useState("");

  useEffect(() => {
    void (async () => {
      const response = await fetch(`/api/admin/singletons/${encodeURIComponent(key)}`, {
        cache: "no-store",
      });
      const data = await response.json().catch(() => ({ value: null }));
      setValue((data.value ?? {}) as JsonValue);
      setRawText(JSON.stringify(data.value ?? {}, null, 2));
    })();
  }, [key]);

  async function save() {
    if (value === null) {
      return;
    }

    const response = await fetch(`/api/admin/singletons/${encodeURIComponent(key)}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ value }),
    });

    if (!response.ok) {
      toast.error(`Failed to save ${formName}.`);
      return;
    }

    toast.success(`${formName} updated successfully.`);
  }

  function saveRawJson() {
    try {
      const parsed = JSON.parse(rawText) as JsonValue;
      setValue(parsed);
      toast.info("Raw JSON parsed. Click save to persist changes.");
    } catch {
      toast.error("Invalid JSON in raw mode.");
    }
  }

  const ActionBar = ( <div className="my-4 flex flex-wrap items-center gap-2">
        <Link href="/admin/singletons">
          <Button variant="outline">Back to Content Sections</Button>
        </Link>
        <Button variant={rawMode ? "outline" : "default"} onClick={() => setRawMode(false)}>
          Form Mode
        </Button>
        <Button variant={rawMode ? "default" : "outline"} onClick={() => setRawMode(true)}>
          Raw JSON Mode
        </Button>
        <Button onClick={save}>Save {formName}</Button>
      </div>)

  return (
    <AdminShell
      title={`Edit ${formName}`}
      subtitle="Form fields are auto-generated from the content structure. You can switch to raw JSON mode when needed."
    >
     {ActionBar}

      {value === null ? (
        <p className="text-sm text-gray-500">Loading singleton...</p>
      ) : rawMode ? (
        <div className="space-y-3">
          <Textarea
            value={rawText}
            onChange={(event) => setRawText(event.target.value)}
            className="min-h-[380px] font-mono text-sm"
          />
          <Button variant="outline" onClick={saveRawJson}>
            Apply JSON to Form
          </Button>
        </div>
      ) : (
        <SingletonDynamicForm
          value={value}
          onChange={(next) => {
            setValue(next);
            setRawText(JSON.stringify(next, null, 2));
          }}
        />
      )}
     {value !== null && ActionBar}

    </AdminShell>
  );
}
