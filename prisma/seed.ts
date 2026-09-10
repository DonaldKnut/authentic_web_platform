import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { makeAuthenticId, randomSerial, signProductIdentity } from "../lib/crypto";
import { CITIES } from "../lib/geo";

const prisma = new PrismaClient();

async function main() {
  await prisma.walletItem.deleteMany();
  await prisma.productReport.deleteMany();
  await prisma.verificationEvent.deleteMany();
  await prisma.auditLog.deleteMany();
  await prisma.productUnit.deleteMany();
  await prisma.batch.deleteMany();
  await prisma.product.deleteMany();
  await prisma.user.deleteMany();
  await prisma.organization.deleteMany();

  const passwordHash = await bcrypt.hash("authentic", 10);

  const aurelia = await prisma.organization.create({
    data: {
      name: "Aurelia Beauty",
      slug: "aurelia",
      type: "MANUFACTURER",
      country: "NG",
      city: "Lagos",
      brandVerified: true,
      legalName: "Aurelia Beauty Limited",
      registrationNumber: "RC-884291",
    },
  });

  const meditrust = await prisma.organization.create({
    data: {
      name: "MediTrust Pharma",
      slug: "meditrust",
      type: "MANUFACTURER",
      country: "NG",
      city: "Abuja",
      brandVerified: true,
      legalName: "MediTrust Pharmaceuticals Ltd",
      registrationNumber: "RC-110283",
    },
  });

  const naijaAuto = await prisma.organization.create({
    data: {
      name: "NaijaAuto Components",
      slug: "naijaauto",
      type: "MANUFACTURER",
      country: "NG",
      city: "Nnewi",
      brandVerified: true,
      legalName: "NaijaAuto Components Ltd",
      registrationNumber: "RC-552910",
    },
  });

  const lantern = await prisma.organization.create({
    data: {
      name: "Lantern House Press",
      slug: "lantern",
      type: "MANUFACTURER",
      country: "NG",
      city: "Ibadan",
      brandVerified: true,
      legalName: "Lantern House Press",
      registrationNumber: "RC-229184",
    },
  });

  await prisma.user.createMany({
    data: [
      {
        email: "ibrahim@authentic.ng",
        phone: "+2348012345678",
        name: "Ibrahim Musa",
        passwordHash,
        role: "CONSUMER",
      },
      {
        email: "ada@aurelia.ng",
        name: "Ada Okonkwo",
        passwordHash,
        role: "BUSINESS",
        organizationId: aurelia.id,
      },
      {
        email: "chinedu@meditrust.ng",
        name: "Chinedu Bello",
        passwordHash,
        role: "BUSINESS",
        organizationId: meditrust.id,
      },
    ],
  });

  const serum = await prisma.product.create({
    data: {
      authenticPrefix: "AURELIA",
      name: "Radiance Repair Serum",
      brand: "Aurelia",
      sku: "AUR-SER-30",
      gtin: "6151234567890",
      category: "Beauty",
      description:
        "A 30ml niacinamide serum manufactured in Lagos for the West African market.",
      countryOfManufacture: "NG",
      securityLevel: 4,
      imageHue: "32",
      organizationId: aurelia.id,
    },
  });

  const cream = await prisma.product.create({
    data: {
      authenticPrefix: "AURELIA",
      name: "Gold Barrier Cream",
      brand: "Aurelia",
      sku: "AUR-CRM-50",
      gtin: "6151234567891",
      category: "Beauty",
      description: "Rich ceramide cream. High counterfeit exposure in open markets.",
      countryOfManufacture: "NG",
      securityLevel: 3,
      imageHue: "22",
      organizationId: aurelia.id,
    },
  });

  const para = await prisma.product.create({
    data: {
      authenticPrefix: "MEDITRUST",
      name: "Paracetamol 500mg",
      brand: "MediTrust",
      sku: "MT-PARA-500",
      gtin: "6159876543210",
      category: "Pharmaceuticals",
      description: "10-tablet blister pack. Serialized for pharmacy verification.",
      countryOfManufacture: "NG",
      securityLevel: 5,
      imageHue: "168",
      organizationId: meditrust.id,
    },
  });

  const pads = await prisma.product.create({
    data: {
      authenticPrefix: "NAIJAAUTO",
      name: "Ceramic Brake Pad Set",
      brand: "NaijaAuto",
      sku: "NA-BRK-224",
      gtin: "6155550012248",
      category: "Automotive",
      description: "Front ceramic brake pads for popular compact sedans.",
      countryOfManufacture: "NG",
      securityLevel: 3,
      imageHue: "210",
      organizationId: naijaAuto.id,
    },
  });

  await prisma.product.create({
    data: {
      authenticPrefix: "LANTERN",
      name: "Market Day Stories",
      brand: "Lantern House",
      sku: "LH-MDS-01",
      isbn: "9789781234567",
      category: "Books",
      description:
        "ISBN identifies the edition. Individual copies can be serialized separately.",
      countryOfManufacture: "NG",
      securityLevel: 1,
      imageHue: "48",
      organizationId: lantern.id,
    },
  });

  const serumBatch = await prisma.batch.create({
    data: {
      lotNumber: "AUR-2026-06-A",
      manufacturedAt: new Date("2026-06-12"),
      expiresAt: new Date("2028-06-12"),
      quantity: 5000,
      productId: serum.id,
    },
  });

  const creamBatch = await prisma.batch.create({
    data: {
      lotNumber: "AUR-2026-07-B",
      manufacturedAt: new Date("2026-07-02"),
      expiresAt: new Date("2028-07-02"),
      quantity: 8000,
      productId: cream.id,
    },
  });

  const paraBatch = await prisma.batch.create({
    data: {
      lotNumber: "MT-PARA-2618",
      manufacturedAt: new Date("2026-03-18"),
      expiresAt: new Date("2028-03-18"),
      quantity: 20000,
      productId: para.id,
    },
  });

  const padBatch = await prisma.batch.create({
    data: {
      lotNumber: "NA-BRK-19",
      manufacturedAt: new Date("2025-11-04"),
      expiresAt: null,
      quantity: 1200,
      recalled: true,
      recallReason: "Manufacturer recall: friction compound may overheat under load.",
      productId: pads.id,
    },
  });

  async function issueUnit(opts: {
    productId: string;
    batchId: string;
    organizationId: string;
    brand: string;
    sku: string;
    country: string;
    serial?: string;
    status?: string;
    security?: boolean;
  }) {
    const serial = opts.serial ?? randomSerial(8);
    const authenticId = makeAuthenticId({
      country: opts.country,
      brand: opts.brand,
      year: 2026,
      serial,
    });
    const issuedAt = new Date("2026-06-12T08:00:00.000Z");
    const signature = signProductIdentity({
      organizationId: opts.organizationId,
      authenticId,
      serial,
      sku: opts.sku,
      issuedAt: issuedAt.toISOString(),
    });
    return prisma.productUnit.create({
      data: {
        serial,
        authenticId,
        securityCode: opts.security ? `SC-${serial}` : null,
        signature,
        status: opts.status ?? "ACTIVE",
        productId: opts.productId,
        batchId: opts.batchId,
        issuedAt,
      },
    });
  }

  const authenticSerum = await issueUnit({
    productId: serum.id,
    batchId: serumBatch.id,
    organizationId: aurelia.id,
    brand: "AURELIA",
    sku: serum.sku,
    country: "NG",
    serial: "R8K2M19X",
    security: true,
  });

  const noisyCream = await issueUnit({
    productId: cream.id,
    batchId: creamBatch.id,
    organizationId: aurelia.id,
    brand: "AURELIA",
    sku: cream.sku,
    country: "NG",
    serial: "G4L91Q2C",
  });

  const clonedPara = await issueUnit({
    productId: para.id,
    batchId: paraBatch.id,
    organizationId: meditrust.id,
    brand: "MEDITRUST",
    sku: para.sku,
    country: "NG",
    serial: "A7X82K19",
    security: true,
  });

  const recalledPad = await issueUnit({
    productId: pads.id,
    batchId: padBatch.id,
    organizationId: naijaAuto.id,
    brand: "NAIJAAUTO",
    sku: pads.sku,
    country: "NG",
    serial: "BRK22419",
    status: "RECALLED",
  });

  for (let i = 0; i < 18; i += 1) {
    await issueUnit({
      productId: serum.id,
      batchId: serumBatch.id,
      organizationId: aurelia.id,
      brand: "AURELIA",
      sku: serum.sku,
      country: "NG",
      security: true,
    });
  }

  const lagos = CITIES.lagos;
  const abuja = CITIES.abuja;
  const london = CITIES.london;

  await prisma.verificationEvent.create({
    data: {
      identifier: authenticSerum.authenticId,
      identifierType: "AUTHENTIC_ID",
      source: "CAMERA",
      status: "AUTHENTICATED",
      trustScore: 98,
      riskLevel: "LOW",
      reasonsJson: JSON.stringify([
        "This product identity was issued by the manufacturer and the verification data is valid.",
      ]),
      city: lagos.city,
      country: lagos.country,
      latitude: lagos.lat,
      longitude: lagos.lng,
      unitId: authenticSerum.id,
      createdAt: new Date("2026-08-20T09:42:00.000Z"),
    },
  });

  for (let i = 0; i < 14; i += 1) {
    await prisma.verificationEvent.create({
      data: {
        identifier: noisyCream.authenticId,
        identifierType: "AUTHENTIC_ID",
        source: "CAMERA",
        status: "NEEDS_ATTENTION",
        trustScore: 72,
        riskLevel: "MEDIUM",
        reasonsJson: JSON.stringify([
          "Unusual scan frequency has been detected in the last 24 hours.",
        ]),
        city: "Onitsha",
        country: "NG",
        latitude: CITIES.onitsha.lat,
        longitude: CITIES.onitsha.lng,
        unitId: noisyCream.id,
        createdAt: new Date(Date.now() - i * 12 * 60 * 1000),
      },
    });
  }

  await prisma.verificationEvent.createMany({
    data: [
      {
        identifier: clonedPara.authenticId,
        identifierType: "SERIAL",
        source: "CAMERA",
        status: "AUTHENTICATED",
        trustScore: 96,
        riskLevel: "LOW",
        reasonsJson: "[]",
        city: lagos.city,
        country: lagos.country,
        latitude: lagos.lat,
        longitude: lagos.lng,
        unitId: clonedPara.id,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 30),
      },
      {
        identifier: clonedPara.serial,
        identifierType: "SERIAL",
        source: "CAMERA",
        status: "NEEDS_ATTENTION",
        trustScore: 68,
        riskLevel: "MEDIUM",
        reasonsJson: JSON.stringify(["Unusual geographic activity."]),
        city: abuja.city,
        country: abuja.country,
        latitude: abuja.lat,
        longitude: abuja.lng,
        unitId: clonedPara.id,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 8),
      },
      {
        identifier: clonedPara.serial,
        identifierType: "SERIAL",
        source: "CAMERA",
        status: "HIGH_RISK",
        trustScore: 28,
        riskLevel: "HIGH",
        reasonsJson: JSON.stringify(["Impossible identity activity."]),
        city: london.city,
        country: london.country,
        latitude: london.lat,
        longitude: london.lng,
        unitId: clonedPara.id,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
      },
    ],
  });

  await prisma.productUnit.update({
    where: { id: clonedPara.id },
    data: { status: "COMPROMISED" },
  });

  await prisma.verificationEvent.create({
    data: {
      identifier: recalledPad.authenticId,
      identifierType: "AUTHENTIC_ID",
      source: "CAMERA",
      status: "HIGH_RISK",
      trustScore: 40,
      riskLevel: "HIGH",
      reasonsJson: JSON.stringify([
        "Manufacturer recall: friction compound may overheat under load.",
      ]),
      city: "Kano",
      country: "NG",
      latitude: CITIES.kano.lat,
      longitude: CITIES.kano.lng,
      unitId: recalledPad.id,
    },
  });

  console.log("Seeded AUTHENTIC demo data.");
  console.log("Consumer: ibrahim@authentic.ng / authentic");
  console.log("Brand:     ada@aurelia.ng / authentic");
  console.log("Try:      ", authenticSerum.authenticId);
  console.log("Try:      ", clonedPara.serial);
  console.log("Try:      ", noisyCream.authenticId);
  console.log("Try:      ", recalledPad.authenticId);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
