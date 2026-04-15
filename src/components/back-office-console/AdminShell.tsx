"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";

type CurrentAdmin = {
  id: string;
  email: string;
  name: string | null;
};

type AdminShellProps = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
};

const NAV_ITEMS = [
  { label: "Pages", href: "/back-office-console/pages" },
  { label: "Main Content Area", href: "/back-office-console/singletons" },
  { label: "Collection/Section Content", href: "/back-office-console/collections" },
];

export function AdminShell({ title, subtitle, children }: AdminShellProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [admin, setAdmin] = useState<CurrentAdmin | null>(null);

  useEffect(() => {
    void (async () => {
      const response = await fetch("/api/back-office-console/auth/me", { cache: "no-store" });
      if (response.status === 401) {
        router.replace("/back-office-console/login");
        return;
      }

      const data = await response.json().catch(() => null);
      setAdmin(data?.user || null);
    })();
  }, [router]);

  const activeItem = useMemo(
    () => NAV_ITEMS.find((item) => pathname.startsWith(item.href)),
    [pathname]
  );

  async function logout() {
    await fetch("/api/back-office-console/auth/logout", { method: "POST" });
    router.replace("/back-office-console/login");
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-6 md:py-8">
        <div className="grid gap-6 md:grid-cols-[260px_1fr]">
          <aside className="rounded-xl border bg-white p-4 md:p-5 h-fit">
            <h1 className="text-xl font-semibold">Admin</h1>
            <p className="mt-1 text-sm text-gray-500">
              {admin ? `Signed in as ${admin.name || admin.email}` : "Loading session..."}
            </p>

            <nav className="mt-5 space-y-2">
              {NAV_ITEMS.map((item) => {
                const active = activeItem?.href === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block rounded-md px-3 py-2 text-sm transition-colors ${
                      active ? "bg-[#025143] text-white" : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <Button variant="outline" className="mt-5 w-full" onClick={logout}>
              Log Out
            </Button>
          </aside>

          <section className="rounded-xl border bg-white p-5 md:p-6">
            <header className="mb-5 border-b pb-4">
              <h2 className="text-2xl font-semibold">{title}</h2>
              {subtitle ? <p className="mt-1 text-sm text-gray-600">{subtitle}</p> : null}
            </header>
            {children}
          </section>
        </div>
      </div>
    </main>
  );
}
