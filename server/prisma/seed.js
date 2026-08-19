import { PrismaClient } from "../generated/prisma/client.ts";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const destinations = [
  {
    name: "Lalibela Rock Churches",
    description: "Medieval rock-hewn churches carved directly into volcanic rock, a UNESCO World Heritage site and one of Ethiopia's holiest places.",
    location: "Lalibela, Ethiopia",
    price: 45.0,
    imageUrl: "https://example.com/lalibela.jpg",
    category: "Historical",
  },
  {
    name: "Simien Mountains Trek",
    description: "Dramatic highland trekking through jagged peaks and deep valleys, home to the Gelada baboon and Walia ibex.",
    location: "Simien Mountains, Ethiopia",
    price: 120.0,
    imageUrl: "https://example.com/simien.jpg",
    category: "Adventure",
  },
  {
    name: "Danakil Depression",
    description: "One of the hottest and most otherworldly landscapes on Earth, with sulfur springs, salt flats, and active volcanoes.",
    location: "Danakil Depression, Ethiopia",
    price: 200.0,
    imageUrl: "https://example.com/danakil.jpg",
    category: "Adventure",
  },
  {
    name: "Blue Nile Falls",
    description: "A dramatic waterfall on the Blue Nile river, known locally as 'Tis Issat' — smoking water.",
    location: "Bahir Dar, Ethiopia",
    price: 30.0,
    imageUrl: "https://example.com/bluenile.jpg",
    category: "Nature",
  },
];

async function main() {
  console.log("Seeding destinations...");

  for (const destination of destinations) {
    await prisma.destination.create({ data: destination });
  }

  console.log(`Seeded ${destinations.length} destinations.`);
}

main()
  .catch((err) => {
    console.error("Seed failed:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });