'use client'
import Link from 'next/link'
import { Flex, Layout, Spin, Button } from 'antd'
import { UserProfile } from '@auth0/nextjs-auth0/client'
const { Header} = Layout


const headerStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#fff',
    height: 60,
    paddingInline: 4,
    backgroundColor: 'black',
    display: "flex",
    justifyContent: "space-between",
    padding: "0 1em"
  };
  

export default function HeaderSection({user, isLoading}: {user: UserProfile | undefined, isLoading: boolean}) {

    return(
        <Header style={headerStyle}>
        <h3>Injury Tracking</h3>
        <Flex gap={10} align='center'>
            <p className=''>
            {isLoading && !user && <Spin/>}
            {user && user.name}
            </p>
            {user ? (
            <Button type='link'>
                <Link href="/api/auth/logout">Logout</Link>
            </Button>
            ) : (
            <Link href="/api/auth/login">Login</Link>
            )}
        </Flex>
    </Header>
    )
}