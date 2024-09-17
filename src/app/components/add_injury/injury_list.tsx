import { List, Input, Button, Tag, Flex, ConfigProvider, Typography} from 'antd'
import { InfoCircleFilled, CloseCircleOutlined } from "@ant-design/icons"
import { labelToReadable } from "@/app/utils"

import { PartInfo } from "../add_injury_drawer"

const { TextArea } = Input

const customizeRenderEmpty = ()=> (
  <Flex justify="center" gap={5}>
    <InfoCircleFilled size={25}/>
    <Typography.Text>Click body parts to add injury</Typography.Text>
  </Flex>
)


export default function InjuryList({
  addedPartsList,
  setAddedPartsList
}: {
  addedPartsList: PartInfo[],
  setAddedPartsList: React.Dispatch<React.SetStateAction<PartInfo[]>> 
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
                    size="small"
                    shape="circle"
                    onClick={()=> handleRemoveListPart(item.label)}>
                      X
                  </Button>
              </Flex>
              }
              description = {
                <TextArea
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