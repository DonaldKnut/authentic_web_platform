export const LOGO_URL =
  "https://res.cloudinary.com/duhpqf0ax/image/upload/v1790180651/authentic_img_promo-removebg-preview_exar5s.png";

/** E.164 without + — override with NEXT_PUBLIC_WHATSAPP_NUMBER */
export const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "") || "2348000000000";

export const WHATSAPP_PREFILL =
  process.env.NEXT_PUBLIC_WHATSAPP_PREFILL?.trim() ||
  "Hi AUTHENTIC — I need help checking a product / setting up my brand.";

export function whatsappUrl(message = WHATSAPP_PREFILL) {
  const text = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

/** Homepage + auth promo slides (Cloudinary). */
export const HOME_SLIDER_IMAGES = [
  {
    id: "slide-1",
    src: "https://res.cloudinary.com/dyaetoldv/image/upload/v1793452391/Person_scanning_medicine_barcode__8b48271f_2K_uvfmel.jpg",
    alt: "Person scanning a medicine barcode in a pharmacy",
    caption: "Check a pack before you buy",
  },
  {
    id: "slide-2",
    src: "https://res.cloudinary.com/dyaetoldv/image/upload/v1793452410/Man_scanning_baseball_cap_barcode_9ba5e9b8_2K_sairel.jpg",
    alt: "Man scanning a baseball cap barcode in a shop",
    caption: "Verify fashion and accessories in-store",
  },
  {
    id: "slide-3",
    src: "https://res.cloudinary.com/dyaetoldv/image/upload/v1793452391/Girl_scanning_honey_at_supermarket_2a7d3bc6_2K_r9yjit.jpg",
    alt: "Girl scanning honey jar at a supermarket",
    caption: "Anyone can scan — no account needed",
  },
  {
    id: "slide-4",
    src: "https://res.cloudinary.com/dyaetoldv/image/upload/v1793452391/Woman_guiding_scanning_at_checkout_93b8a59d_2K_emlbsy.jpg",
    alt: "Staff guiding a customer scanning at checkout",
    caption: "Protect every sale at the counter",
  },
] as const;
