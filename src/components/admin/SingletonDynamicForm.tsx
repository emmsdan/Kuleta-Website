"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toSentenceCase } from "@/lib/string";

type JsonPrimitive = string | number | boolean | null;
type JsonValue = JsonPrimitive | JsonValue[] | { [key: string]: JsonValue };
type PathPart = string | number;

type SingletonDynamicFormProps = {
  value: JsonValue;
  onChange: (nextValue: JsonValue) => void;
};

function isObjectValue(value: JsonValue): value is { [key: string]: JsonValue } {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isPrimitive(value: JsonValue): value is JsonPrimitive {
  return value === null || ["string", "number", "boolean"].includes(typeof value);
}

function setAtPath(root: JsonValue, path: PathPart[], nextValue: JsonValue): JsonValue {
  if (path.length === 0) {
    return nextValue;
  }

  const [head, ...rest] = path;

  if (Array.isArray(root) && typeof head === "number") {
    const clone = [...root];
    clone[head] = setAtPath(clone[head] as JsonValue, rest, nextValue);
    return clone;
  }

  if (isObjectValue(root) && typeof head === "string") {
    const clone: Record<string, JsonValue> = { ...root };
    const current = clone[head] ?? "";
    clone[head] = setAtPath(current, rest, nextValue);
    return clone;
  }

  return root;
}

function removeArrayIndex(root: JsonValue, path: PathPart[], indexToRemove: number): JsonValue {
  const target = path.reduce<JsonValue | undefined>((acc, part) => {
    if (acc === undefined) {
      return undefined;
    }

    if (Array.isArray(acc) && typeof part === "number") {
      return acc[part] as JsonValue;
    }

    if (isObjectValue(acc) && typeof part === "string") {
      return acc[part] as JsonValue;
    }

    return undefined;
  }, root);

  if (!Array.isArray(target)) {
    return root;
  }

  const next = target.filter((_, index) => index !== indexToRemove);
  return setAtPath(root, path, next as JsonValue);
}

function pushToArray(root: JsonValue, path: PathPart[], item: JsonValue): JsonValue {
  const target = path.reduce<JsonValue | undefined>((acc, part) => {
    if (acc === undefined) {
      return undefined;
    }

    if (Array.isArray(acc) && typeof part === "number") {
      return acc[part] as JsonValue;
    }

    if (isObjectValue(acc) && typeof part === "string") {
      return acc[part] as JsonValue;
    }

    return undefined;
  }, root);

  if (!Array.isArray(target)) {
    return root;
  }

  const next = [...target, item];
  return setAtPath(root, path, next as JsonValue);
}

function defaultArrayItem(source: JsonValue[]): JsonValue {
  const sample = source[0];
  if (sample === undefined) {
    return "";
  }
  if (typeof sample === "string") {
    return "";
  }
  if (typeof sample === "number") {
    return 0;
  }
  if (typeof sample === "boolean") {
    return false;
  }
  if (Array.isArray(sample)) {
    return [];
  }
  if (isObjectValue(sample)) {
    const shape: Record<string, JsonValue> = {};
    Object.keys(sample).forEach((key) => {
      const val = sample[key];
      if (typeof val === "string") {
        shape[key] = "";
      } else if (typeof val === "number") {
        shape[key] = 0;
      } else if (typeof val === "boolean") {
        shape[key] = false;
      } else if (Array.isArray(val)) {
        shape[key] = [];
      } else {
        shape[key] = null;
      }
    });
    return shape;
  }

  return "";
}

function labelFromPath(path: PathPart[]) {
  if (path.length === 0) {
    return "N/A";
  }
  return toSentenceCase(String(path[path.length - 1]));
}

export function SingletonDynamicForm({ value, onChange }: SingletonDynamicFormProps) {
  function renderNode(node: JsonValue, path: PathPart[], depth: number): React.ReactNode {
    if (depth > 4) {
      return (
        <Textarea
          value={JSON.stringify(node, null, 2)}
          onChange={(event) => {
            try {
              const parsed = JSON.parse(event.target.value) as JsonValue;
              onChange(setAtPath(value, path, parsed));
            } catch {
              // ignore invalid intermediate JSON
            }
          }}
          className="font-mono text-sm min-h-[100px]"
        />
      );
    }

    if (isPrimitive(node)) {
      if (typeof node === "string") {
        const shouldUseTextarea = node.length > 80 || node.includes("\n");
        if (shouldUseTextarea) {
          return (
            <Textarea
              value={node}
              onChange={(event) => onChange(setAtPath(value, path, event.target.value))}
              className="min-h-[90px]"
            />
          );
        }

        return (
          <Input
            value={node}
            onChange={(event) => onChange(setAtPath(value, path, event.target.value))}
          />
        );
      }

      if (typeof node === "number") {
        return (
          <Input
            type="number"
            value={Number.isFinite(node) ? String(node) : "0"}
            onChange={(event) =>
              onChange(setAtPath(value, path, Number(event.target.value || "0")))
            }
          />
        );
      }

      if (typeof node === "boolean") {
        return (
          <label className="inline-flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={node}
              onChange={(event) => onChange(setAtPath(value, path, event.target.checked))}
            />
            <span>Enabled</span>
          </label>
        );
      }

      return (
        <Input
          value=""
          placeholder="null"
          onChange={(event) => onChange(setAtPath(value, path, event.target.value))}
        />
      );
    }

    if (Array.isArray(node)) {
      const allPrimitive = node.every((item) => isPrimitive(item));

      if (allPrimitive) {
        return (
          <div className="space-y-2 rounded-md border p-3">
            {node.map((item, index) => {
              const itemPath = [...path, index];
              const itemLabel = `${labelFromPath(path)}[${index}]`;

              return (
                <div key={itemLabel} className="flex items-start gap-2">
                  <div className="flex-1">
                    <p className="mb-1 text-xs text-gray-500">{toSentenceCase(itemLabel)}

                    </p>
                    {renderNode((item as JsonValue) ?? "", itemPath, depth + 1)}
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => onChange(removeArrayIndex(value, path, index))}
                  >
                    Remove
                  </Button>
                </div>
              );
            })}
            <Button
              type="button"
              variant="outline"
              onClick={() => onChange(pushToArray(value, path, defaultArrayItem(node)))}
            >
              Add Item
            </Button>
          </div>
        );
      }

      return (
        <div className="space-y-3 rounded-md border p-3">
          {node.map((item, index) => (
            <div key={`${labelFromPath(path)}-${index}`} className="rounded-md border p-3 bg-gray-50">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-sm font-medium">{labelFromPath(path)}[{index}]</p>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onChange(removeArrayIndex(value, path, index))}
                >
                  Remove
                </Button>
              </div>
              {renderNode(item as JsonValue, [...path, index], depth + 1)}
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            onClick={() => onChange(pushToArray(value, path, defaultArrayItem(node)))}
          >
            Add Item
          </Button>
        </div>
      );
    }

    return (
      <div className="space-y-3 rounded-md border p-3">
        {Object.entries(node).map(([key, child]) => (
          <div key={key} className="space-y-1">
            <p className="text-sm font-medium text-gray-700">
                {toSentenceCase(key)}

            </p>
            {renderNode(child, [...path, key], depth + 1)}
          </div>
        ))}
      </div>
    );
  }

  return <div className="space-y-4">{renderNode(value, [], 0)}</div>;
}
