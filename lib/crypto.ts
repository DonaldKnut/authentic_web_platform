import { createHmac, timingSafeEqual } from "crypto";

function masterKey() {
  return process.env.AUTH_SECRET ?? "authentic-dev-secret";
}

export function orgSigningKey(organizationId: string) {
  return createHmac("sha256", masterKey())
    .update(`issuer:${organizationId}`)
    .digest("hex");
}

export function signProductIdentity(input: {
  organizationId: string;
  authenticId: string;
  serial: string;
  sku: string;
  issuedAt: string;
}) {
  const payload = [
    input.authenticId,
    input.serial,
    input.sku,
    input.issuedAt,
  ].join("|");
  return createHmac("sha256", orgSigningKey(input.organizationId))
    .update(payload)
    .digest("hex");
}

export function verifyProductIdentity(input: {
  organizationId: string;
  authenticId: string;
  serial: string;
  sku: string;
  issuedAt: string;
  signature: string;
}) {
  const expected = signProductIdentity(input);
  const a = Buffer.from(expected, "hex");
  const b = Buffer.from(input.signature, "hex");
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export function randomSerial(length = 10) {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let out = "";
  for (let i = 0; i < length; i += 1) {
    out += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return out;
}

export function makeAuthenticId(opts: {
  country: string;
  brand: string;
  year: number;
  serial: string;
}) {
  const brand = opts.brand
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "")
    .slice(0, 12);
  return `AF-${opts.country.toUpperCase()}-${brand}-${opts.year}-${opts.serial}`;
}
