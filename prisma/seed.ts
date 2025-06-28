import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const securities = [
    { name: 'Apple', symbol: 'AAPL' },
    { name: 'Microsoft', symbol: 'MSFT' },
    { name: 'Google', symbol: 'GOOGL' },
    { name: 'Amazon', symbol: 'AMZN' },
    { name: 'Tesla', symbol: 'TSLA' },
    { name: 'Facebook', symbol: 'META' },
    { name: 'Netflix', symbol: 'NFLX' },
    { name: 'NVIDIA', symbol: 'NVDA' },
    { name: 'Adobe', symbol: 'ADBE' },
    { name: 'Intel', symbol: 'INTC' },
  ];

  for (const security of securities) {
    await prisma.security.create({ data: security });
  }

  console.log('Inserted 10 securities into the database.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
