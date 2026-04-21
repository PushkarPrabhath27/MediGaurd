const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1";

interface RequestOptions extends RequestInit {
  tenantSlug?: string;
  token?: string;
}

export async function apiRequest<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const { tenantSlug, token, ...fetchOptions } = options;
  
  const headers = new Headers(fetchOptions.headers || {});
  headers.set("Content-Type", "application/json");
  
  if (tenantSlug) {
    headers.set("X-Tenant-Slug", tenantSlug);
  }
  
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const url = endpoint.startsWith("http") ? endpoint : `${BASE_URL}${endpoint}`;
  
  const response = await fetch(url, {
    ...fetchOptions,
    headers,
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error?.message || "Something went wrong");
  }

  return result.data as T;
}
