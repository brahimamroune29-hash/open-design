import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
try {
  await prisma.$connect();
  const count = await prisma.user.count();
  console.log('SUCCESS: Connected to Supabase!');
  console.log('Users in DB:', count);
} catch (e) {
  console.error('ERROR:', e.message);
} finally {
  await prisma.$disconnect();
}
