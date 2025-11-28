// src/lib/apiClient.ts
const BASE = "https://rehan.pythonanywhere.com/api";

type FetchOptions = RequestInit & { _retry?: boolean };

async function refreshToken(): Promise<string | null> {
  try {
    const refresh =
      typeof window !== "undefined" ? localStorage.getItem("sr_refresh") : null;

    if (!refresh) return null;

    const res = await fetch(`${BASE}/auth/refresh/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh })
    });

    if (!res.ok) {
      localStorage.removeItem("sr_access");
      localStorage.removeItem("sr_refresh");
      return null;
    }

    const data = await res.json();

    if (data?.access) {
      localStorage.setItem("sr_access", data.access);
      return data.access;
    }

    return null;
  } catch (err) {
    console.error("refreshToken error", err);
    return null;
  }
}

export async function apiFetch(input: string, opts: FetchOptions = {}) {
  const url = input.startsWith("http") ? input : `${BASE}${input}`;

  const access =
    typeof window !== "undefined" ? localStorage.getItem("sr_access") : null;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(opts.headers as Record<string, string> || {})
  };

  if (access) {
    headers["Authorization"] = `Bearer ${access}`;
  }

  // Remove internal-only fields so TS doesn't cry
  const { _retry, ...fetchOpts } = opts;

  const res = await fetch(url, {
    ...fetchOpts,
    headers
  });

  // Handle token refresh automatically
  if (res.status === 401 && !_retry) {
    const newAccess = await refreshToken();

    if (newAccess) {
      headers["Authorization"] = `Bearer ${newAccess}`;
      return fetch(url, { ...fetchOpts, headers });
    }
  }

  return res;
}
