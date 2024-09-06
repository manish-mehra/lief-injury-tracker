import prisma from "../lib/prisma"
import { PrismaClient } from "@prisma/client/extension";


export const resolvers = {
    Query: {

      injuryReport: async (_: any, { id }: {id: string})=> {
        return await prisma.injuryReport.findUnique({
          where: { id: parseInt(id) },
          include: { injuries: true }
        })
      },

      // TODO: fetch only report associated with authenticated user
      allInjuryReports: async () => {
        return await prisma.injuryReport.findMany()
      },

      injuries: async (_: any, { reportId }: {reportId: string}) => {
        return await prisma.injury.findMany({
          where: { reportId: parseInt(reportId) }
        })
      }
    },
}
