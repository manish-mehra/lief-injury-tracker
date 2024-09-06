
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const testData = [
    {
    reporterName: "manish",
    injuryDateTime: new Date(),
    reportDateTime: new Date(),
    bodyMap: "",
    },
    {
        reporterName: "mehra",
        injuryDateTime: new Date(),
        reportDateTime: new Date(),
        bodyMap: "",
    }
]

async function main() {
    await prisma.user.create({
      data: {
        email: `testemail@gmail.com`,
        role: 1,
      },
    })
    await prisma.injuryReport.createMany({
      data: testData,
    })
  }

  main()

  .catch(e => {

    console.error(e)

    process.exit(1)

  })

  .finally(async () => {

    await prisma.$disconnect()

  })