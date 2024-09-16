'use client'
import { useUser } from '@auth0/nextjs-auth0/client'
import Link from 'next/link'
import { Flex, Layout } from 'antd'

const { Header} = Layout


const headerStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#fff',
    height: 60,
    paddingInline: 4,
    backgroundColor: 'black',
    display: "flex",
    justifyContent: "space-between"
  };
  

export default function HeaderSection() {
    const { user, isLoading } = useUser()

    return(
        <Header style={headerStyle}>
        <p>Injury Tracking</p>
        <Flex gap={10}>
            <p className=''>
            {isLoading && !user && "Loading user..."}
            {user && user.name}
            </p>
            {user ? (
            <div>
                <Link href="/api/auth/logout">Logout</Link>
            </div>
            ) : (
            <Link href="/api/auth/login">Login</Link>
            )}
        </Flex>
    </Header>
    )
}