import { useQuery } from "@tanstack/react-query";
import { fetchJson } from "@/lib/http";

export function useApiQuery<T>(key: string | string[], url: string, fallback: string) {
  return useQuery({
    queryKey: Array.isArray(key) ? key : [key],
    queryFn: () => fetchJson<T>(url, fallback),
  });
}
