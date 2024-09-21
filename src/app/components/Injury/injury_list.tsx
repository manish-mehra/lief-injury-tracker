import { List, Input, Button, Tag, Flex, ConfigProvider, Typography} from 'antd'
import { InfoCircleFilled, CloseCircleOutlined } from "@ant-design/icons"
import { labelToReadable } from "@/app/utils"
import { Injury } from '@/app/types'
import { DrawerState } from '../injury_reports'

const { TextArea } = Input

const customizeRenderEmpty = ()=> (
  <Flex justify="center" gap={5}>
    <InfoCircleFilled size={25}/>
    <Typography.Text>Click body parts to add injury</Typography.Text>
  </Flex>
)


export default function InjuryList({
  state,
  addedPartsList,
  setAddedPartsList
}: {
  state?: DrawerState
  addedPartsList: Injury[],
  setAddedPartsList: React.Dispatch<React.SetStateAction<Injury[]>> 
}) {

  const handleRemoveListPart = (partClasses: string)=> {
    setAddedPartsList(prev =>
      prev.filter(part => part.label !== partClasses)
    )
  }

  return (
    <Flex style={{width: "100%", marginTop: "2em", flexDirection: "column"}} >
        <ConfigProvider 
          renderEmpty = {customizeRenderEmpty}
          >
            {
              addedPartsList.length > 0 && <Typography.Text style={{textAlign: "center"}}><Tag color="red">{addedPartsList.length}</Tag> injuries added</Typography.Text>

            }
          <List
          itemLayout="vertical"
          dataSource={addedPartsList}
          style={{padding: "0.5em", width: "100%"}}
          size={"small"}
          renderItem={(item, index) => (
            <List.Item key={index} 
            style={{marginBottom: "1em"}}
          >
            <List.Item.Meta
              title={
                <Flex justify="space-between">
                  <Tag color = "red-inverse">{labelToReadable(item.label)}</Tag>
                  <Button
                    disabled = {state === 'view'}
                    size="small"
                    shape="circle"
                    onClick={()=> handleRemoveListPart(item.label)}>
                      X
                  </Button>
              </Flex>
              }
              description = {
                <TextArea
                readOnly = {state === 'view'}
                rows={2} 
                placeholder="Injury details..."
                value = {addedPartsList.find((partInfo) => partInfo.label === item.label)?.description || "" }
                onChange={(e) => {
                  setAddedPartsList(prev =>
                    prev.map(part =>
                      part.label === item.label
                        ? { ...part, description: e.target.value }
                        : part
                    )
                  )
                }}
              />  
              }
            />
          </List.Item>
        )}
      />
      </ConfigProvider>

    </Flex>
  )
}