'use client'

import { Button } from 'antd'
import { Flex, Layout, ConfigProvider} from 'antd';
import HeaderSection from './components/header'
const { Content } = Layout
import InjuryReports from './components/injury_reports';

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
                <Button type='primary'>Add Injury</Button>
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
