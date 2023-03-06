// 1
import { PrismaClient } from "@prisma/client";

// 2
const prisma = new PrismaClient();

// 3
async function main() {
    const allLetter = await prisma.item.findMany();
    console.log(allLetter);
    const allUser = await prisma.user.findMany();
    console.log(allUser);
}

// 4
main()
    .catch((e) => {
        throw e;
    })
    // 5
    .finally(async () => {
        await prisma.$disconnect();
    });
