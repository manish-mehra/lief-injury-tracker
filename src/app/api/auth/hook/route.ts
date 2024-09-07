// pages/api/auth/hook.ts

import { NextRequest, NextResponse } from 'next/server';
import  prisma from '../../../../../lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

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
    await prisma.user.create({
      data: { email },
    })
    return Response.json({
      message: `User with email: ${email} has been created successfully!`,
    }, {
      status: 200
    }
  )
  }

}