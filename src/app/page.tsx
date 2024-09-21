'use client'
import { useState } from 'react';
import { useUser} from '@auth0/nextjs-auth0/client'
import Link from 'next/link';
import { Flex, Layout, ConfigProvider, Button, Spin, Space, Typography} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
const { Content } = Layout
import InjuryReports from './components/injury_reports';
import AddInjuryDrawer from './components/Injury/injury_drawer';
import HeaderSection from './components/header';
const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  minHeight: 120,
  padding: "2em",
  width: "100%"
}

const layoutStyle = {
  // overflow: 'hidden',
  width: '100%',
  height: "100%",  
  minHeight: "100vh",
}



export default function Home() {
  
  const [addInjuryDrawer, setAddInjuryDrawer] = useState(false)
  const { user, isLoading, error } = useUser()

  return (
    <ConfigProvider theme={{
     "token": {
      "colorPrimary": "#000000",
      "colorInfo": "#000000",
      "colorLink": "#1677ff"
      }
    }}>
        <Flex gap="middle" wrap>
          <Layout style={layoutStyle}>
            {user && <HeaderSection user={user} isLoading={isLoading}/>}
            <Content style={contentStyle}>
            {
              isLoading ? 
                <Spin/>
              :
              <>
                { user ? 
                  (<>
                    <Flex style={{marginBottom: "2em"}} justify='space-between'>
                      <Typography.Title level={3}>Injury Reports</Typography.Title>
                      <Button type="primary" onClick={()=> setAddInjuryDrawer(true)} icon={<PlusOutlined />}>
                        Add Report
                      </Button>
                      <AddInjuryDrawer 
                        open = {addInjuryDrawer}
                        setOpen = {setAddInjuryDrawer}
                        state = "add"
                      />
                    </Flex>
                    <Flex style={{width: "100%"}}>
                      <InjuryReports/>
                    </Flex>
                    </>
                    )
                    :
                    <Space
                      align='center'
                      direction='vertical'>
                      <Typography.Title level={4}>Welcome to Lief Injury Tracking</Typography.Title>
                      <Space direction='vertical' align='center'>
                        <Typography.Text>Login, to start reporting injuries</Typography.Text>
                        <Link href="/api/auth/login">
                          <Button type='primary' size='large'>
                            Login
                          </Button>
                        </Link>
                      </Space>
                    </Space>  
                }
              </>
            }
            </Content>
          </Layout>
        </Flex>
      
    </ConfigProvider>
  )
}
