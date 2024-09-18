
/** 
 * context.user
 * user {
  nickname: 'test1',
  name: 'test1@gmail.com',
  picture: 'https://s.gravatar.com/avatar/245cf079454dc9a3374a7c076de247cc?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fte.png',
  updated_at: '2024-09-07T11:56:14.290Z',
  email: 'test1@gmail.com',
  email_verified: false,
  sub: 'auth0|66dc3f5e9f93b7e182d35e27',
  sid: '4V5hzBA6m9Yo6QlxRygtU4kVC1G_ZU7I'
}
 * 
*/

export const resolvers = {
    Query: {
      injuryReport: async (_: any, { id }: {id: string}, context: any)=> {
        await context
        console.log("CTX", context)
        return 
      },

      // TODO: change db model. reporterName -> reporterId 
      allInjuryReports: async (_: any, { name }: {name: string}, ctx:any) => {
        if (!ctx.user) {
          throw new Error("Not authenticated")
        }
        return 
      },

      injuries: async (_: any, { reportId }: {reportId: string}) => {
        return 
      }
    },
    Mutation: {
      test: async (_: any, { name }: {name: string}, context:any) => {
        if (!(await context).user) {
          // TODO: return err message instead of throwing error
          throw new Error("Not authenticated")
        }  
        // Hardcoded response
        return {
          id: "1",
          name:  context!.user!.name,
        }
      }
    }
}
