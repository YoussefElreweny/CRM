import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Checking Prisma Client...');
    if ('contactInquiry' in prisma) {
        console.log('SUCCESS: contactInquiry model exists on Prisma Client.');
    } else {
        console.error('FAILURE: contactInquiry model MISSING on Prisma Client.');
    }
}

main()
    .catch(e => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });
