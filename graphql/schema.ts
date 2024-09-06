
export const typeDefs = `

  type InjuryReport {
    id: ID
    reporterName: String
    injuryDateTime:  String
    reportDateTime: String
    bodyMap: String
  }

  type Injury {
    id: Int
    reportId: Int
    label: String
    details: String
    encircleId: String
  }

  type Query {
   injuryReport(id: ID!): InjuryReport
   allInjuryReports: [InjuryReport!]!
   injuries(reportId: Int!): [Injury!]!
 }

`