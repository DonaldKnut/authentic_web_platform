export async function fetchJson<T>(url: string, fallback: string): Promise<T> {
  const response = await fetch(url);
  const json = await response.json().catch(() => null);
  if (!response.ok) {
    const message =
      json && typeof json === "object" && "error" in json
        ? String((json as { error?: string }).error)
        : fallback;
    throw new Error(message || fallback);
  }
  return json as T;
}
