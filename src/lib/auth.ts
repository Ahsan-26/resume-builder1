// src/lib/auth.ts
export function setTokens({ access, refresh }: { access: string; refresh: string }) {
  if (typeof window === "undefined") return;
  localStorage.setItem("sr_access", access);
  localStorage.setItem("sr_refresh", refresh);
}

export function clearTokens() {
  if (typeof window === "undefined") return;
  localStorage.removeItem("sr_access");
  localStorage.removeItem("sr_refresh");
}

export function getAccess() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("sr_access");
}
