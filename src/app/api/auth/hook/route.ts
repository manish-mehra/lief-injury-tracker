// pages/api/auth/hook.ts
import { NextRequest, NextResponse } from 'next/server';
import db from "../../../../../firebase/firebstore"
import {collection, addDoc} from "firebase/firestore"


export async function POST(req: NextRequest, res: NextResponse){
  const { email, secret } = await req.json()

  console.log("EMAIL: ", email)
  console.log("Local Secret ", process.env.AUTH0_HOOK_SECRET)
  console.log("SECRET ", secret)
  // 1
  if (req.method !== 'POST') {
    return Response.json({ message: 'Method not allowed' }, {
      status: 403
    })
  }
  // 2

  if (secret !== process.env.AUTH0_HOOK_SECRET) {
    return Response.json({ message: `You must provide the secret 🤫` }, {
      status: 403
    })
  }

  // 3
  if (email) {
    // 4
    const user = await addDoc(collection(db, "users"), {email, role: 0})

    // add dummy injury report to new user
   await addDoc(collection(db, "injuryReports"), {
      ...{
        reporterName: "John Doe",
        date: "2024-09-21T07:28:21.836Z",
        injuries: [
          {
            label: ".arm.left.hand",
            description: "Injury on the left arm near the hand."
          },
          {
            label: ".chest.right",
            description: "Injury on the right chest."
          }
        ]
      },
      userId: user.id,
    })

    return Response.json({
      message: `User with email: ${email} has been created successfully!`,
    }, {
      status: 200
    }
  )
  }

}