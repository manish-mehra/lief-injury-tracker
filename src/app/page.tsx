'use client'
import { useUser } from '@auth0/nextjs-auth0/client'
import Link from 'next/link'
import Image from 'next/image'

export default function Home() {

  const { user } = useUser()
  console.log(user)
  
  return (
    <div>
      <main>
        <h1>Injury Tracking System</h1>
        {user ? (
          <div className="flex items-center space-x-5">
            <Link href="/api/auth/logout">
              Logout
            </Link>
            {/* <Image alt="profile" src={user.picture ? user.picture : ''} width={50} height={50}/> */}
          </div>
          ) : (
          <Link href="/api/auth/login">
            Login
          </Link>
          )}
      </main>        
    </div>
  )
}
