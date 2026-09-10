export function haversineKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
) {
  const toRad = (n: number) => (n * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.min(1, Math.sqrt(a)));
}

export const CITIES: Record<
  string,
  { city: string; country: string; lat: number; lng: number }
> = {
  lagos: { city: "Lagos", country: "NG", lat: 6.5244, lng: 3.3792 },
  abuja: { city: "Abuja", country: "NG", lat: 9.0765, lng: 7.3986 },
  kano: { city: "Kano", country: "NG", lat: 12.0022, lng: 8.592 },
  onitsha: { city: "Onitsha", country: "NG", lat: 6.1667, lng: 6.7833 },
  portharcourt: {
    city: "Port Harcourt",
    country: "NG",
    lat: 4.8156,
    lng: 7.0498,
  },
  ibadan: { city: "Ibadan", country: "NG", lat: 7.3775, lng: 3.947 },
  london: { city: "London", country: "GB", lat: 51.5074, lng: -0.1278 },
};

export function plausibleTravel(km: number, hours: number) {
  if (km < 25) return true;
  if (km > 1500 && hours < 36) return false;
  if (km > 400 && hours < 6) return false;
  const maxKmPerHour = 160;
  return km <= maxKmPerHour * Math.max(hours, 0.5);
}
