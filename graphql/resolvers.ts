
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

import { ReportInput, Report } from "@/app/types"
import db from "../firebase/firebstore"
import {collection, addDoc, getDoc,where, query, doc, getDocs, updateDoc, deleteDoc, DocumentReference} from "firebase/firestore"


async function getUserIDByEmail(email: string){
  let dbUserId: string | null = null
  const userQuery = query(collection(db, 'users'), where('email', '==', email))
  const userQuerySnapshot = await getDocs(userQuery);
  userQuerySnapshot.forEach((doc) => {
      // doc.id => doc.data() 
      // kdeOvu1wsHZx04TDaWZ4  =>  { role: 0, email: 'test1@gmail.com' }
      if(doc.data().email === email){
        dbUserId = doc.id
        return  dbUserId
      }
  })
  return dbUserId
}

async function getAllInjuryReportsByUserID(id: string){

  const userQuery = query(collection(db, 'injuryReports'), where('userId', '==', id))
  const userQuerySnapshot = await getDocs(userQuery);
  const reports: Report[] = []
  userQuerySnapshot.forEach((doc) => {
      const report: Report = {
        id: doc.id,
        reporterName: doc.data().reporterName,
        date: doc.data().date,
        injuries: doc.data().injuries
      }
      reports.push(report)
  })
  return reports
}

/* 
* return firebase docRef & report if found, else null 
*/
async function getInjuryReportByID(id: string){
  const docRef = doc(collection(db, "injuryReports"), id)
  const docSnapshot = await getDoc(docRef)
  if (docSnapshot.exists()) {
      const data = docSnapshot.data() as Report
      return {docRef, data}
  }
  return null
  
}

export const resolvers = {
  Query: {
    getInjuryReport: async (_: any, { id }: { id: string }, context: any) => {
      // Here you would normally fetch the report based on the id.

      if (!context.user) {
        return {
            success: false,
            message: "Not authenticated.",
            data: null
        };
      }
      
      let dbUserId = await getUserIDByEmail(context.user.email)
      if(!dbUserId){
        return {
          success: false,
          message: "User not found in database",
          data: null
        }
      }

      try {
        const report = await getInjuryReportByID(id)  
        if(report){
          return {
            success: true,
            message: "Found report",
            data: report.data
          }
        }
        return {
          success: false,
          message: "report not found in database",
          data: null
        }

      } catch (error) {
        console.log(error)
        return {
          success: false,
          message: "Something went wrong fetching report!",
          data: null
        }
      }
    },

    getAllInjuryReports: async (_: any, __: any, context: any) => {

      if (!context.user) {
        return {
            success: false,
            message: "Not authenticated.",
            data: null
        }
      }

      let dbUserId = await getUserIDByEmail(context.user.email)
      if(!dbUserId){
        return {
          success: false,
          message: "User not found in database",
          data: null
        }
      }

      try {
        const reports: Report[] = await getAllInjuryReportsByUserID(dbUserId)
        if(reports){
          return {
            success: true,
            message: "fetched all report",
            data: reports
          }
        }
        throw new Error("failed to fetch reports")
      } catch (error) {
        console.log(error)
        return {
          success: false,
          message: "failed to fetch reports",
          data: null
        }
      }
    
    }
  },
  Mutation: {
    addInjuryReport: async (_: any, { report }: { report: ReportInput }, context: any) => {
      // Check if user is authenticated
        if (!context.user) {
          return {
              success: false,
              message: "Not authenticated.",
              data: null
          };
      }
      // find user
      const dbUserId: string | null = await getUserIDByEmail(context.user.email)
      if(!dbUserId){
        return {
          success: false,
          message: "User not found in database",
          data: null
        }
      }
      // add report
      try {
        const doc = await addDoc(collection(db, "injuryReports"), {
          ...report,
          userId: dbUserId,
        })

        if(doc.id){
          return {
            success: true,
            message: "Injury report added successfully.",
            data: null
          }
        }
      } catch (error) {
        console.log("error adding report")
        return {
          success: false,
          message: "Error adding injury report to database"
      }
      }

    },
    updateInjuryReport: async (_: any, { id, report }: { id: string, report: ReportInput }, context: any) => {

      if (!context.user) {
        return {
            success: false,
            message: "Not authenticated.",
            data: null
        };
      }
      // find user
      const dbUserId: string | null = await getUserIDByEmail(context.user.email)
      if(!dbUserId){
        return {
          success: false,
          message: "User not found in database",
          data: null
        }
      }
      
      // WARNING: should check if report belong to user
      // get report, if exist -> update
      const data = await getInjuryReportByID(id)
      if(data){
        await updateDoc(data.docRef, report)
        return {
          success: true,
          message: "Report Updated",
          data: null
        }
      } else {
        return {
          success: false,
          message: "Report doesn't exists",
          data: null
        }
      }

    },
    
    deleteInjuryReport: async (_: any, { id }: { id: string}, context: any) => {
      if (!context.user) {
        return {
            success: false,
            message: "Not authenticated.",
            data: null
        }
      }
      // find user
      const dbUserId: string | null = await getUserIDByEmail(context.user.email)
      if(!dbUserId){
        return {
          success: false,
          message: "User not found in database",
          data: null
        }
      }

      // WARNING: should check if report belong to user
      // get report, if exist -> delete
      const data = await getInjuryReportByID(id)
      if(data){
        await deleteDoc(data.docRef)
        return {
          success: true,
          message: "Report deleted",
          data: null
        }
      } else {
        return {
          success: false,
          message: "Report doesn't exists",
          data: null
        }
      }

    }

  }
}
