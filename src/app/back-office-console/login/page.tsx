"use client";

import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AdminLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setStatus("");

    const response = await fetch("/api/back-office-console/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json().catch(() => null);
    setLoading(false);

    if (!response.ok) {
      setStatus(data?.error || "Login failed.");
      return;
    }

    const nextPath = searchParams.get("next") || "/back-office-console/pages";
    router.replace(nextPath);
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <section className="w-full max-w-md bg-white border rounded-xl p-6 space-y-5">
        <div>
          <h1 className="text-2xl">Admin Login</h1>
          <p className="text-sm text-gray-600 mt-1">Sign in to manage CMS content securely.</p>
        </div>

        <form className="space-y-4" onSubmit={onSubmit}>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        {status ? <p className="text-sm text-red-600">{status}</p> : null}
      </section>
    </main>
  );
}
