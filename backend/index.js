import prisma from "../backend/prismaclient.js";



async function main() {
    const user = await prisma.user.create({
        data: {
            name: "Rohan",
            email: "rohan@gmail.com"
        }
    });

    console.log(user);
}

main()
    .catch(console.error)
    .finally(async () => {
        await prisma.$disconnect();
    });