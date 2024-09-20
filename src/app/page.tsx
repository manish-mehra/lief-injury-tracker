'use client'
import { useState } from 'react';
import { Flex, Layout, ConfigProvider, Button} from 'antd';
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
  minHeight: "100vh"
}



export default function Home() {
  
  const [addInjuryDrawer, setAddInjuryDrawer] = useState(false)

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
            <HeaderSection/>
            <Content style={contentStyle}>
              <Flex style={{marginBottom: "2em"}} justify='space-between'>
                <h1>Injury Reports</h1>
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
            </Content>
          </Layout>
        </Flex>
      
    </ConfigProvider>
  )
}
