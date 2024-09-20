export const typeDefs = `

  input ReportInput {
    reporterName: String
    date: String
    injuries: [InjuryInput!]!
  }

  input InjuryInput {
    label: String
    description: String
  }

  type Injury {
    label: String
    description: String
  }
  
  type Report {
    id: String!
    reporterName: String!
    date: String!
    injuries: [Injury]!
  }
  
  type QueryResponse {
    success: Boolean!
    message: String
    data: Report
  }

  type AllReportsResponse {
    success: Boolean!
    message: String
    data: [Report]
  }

  type MutationResponse {
    success: Boolean!
    message: String
    data: Report
  }

  type Query {
    getInjuryReport(id: String!): QueryResponse!
    getAllInjuryReports: AllReportsResponse!
  }
  
  type Mutation {
    addInjuryReport(report: ReportInput!): MutationResponse!
    updateInjuryReport(id: String, report: ReportInput!): MutationResponse!
    deleteInjuryReport(id: String!): MutationResponse!
  }

`;