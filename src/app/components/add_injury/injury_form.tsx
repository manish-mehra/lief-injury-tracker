import { useState, useEffect} from "react"
import {  DOMSelection, ToggleSelectedClass } from "./dom_helper"
import { List, Input, Button, Tag, Flex, ConfigProvider, Typography} from 'antd'
import { InfoCircleFilled } from "@ant-design/icons"
import { labelToReadable } from "@/app/utils"

const { TextArea } = Input;

type PartInfo = {
  label: string,
  description: string
}

const customizeRenderEmpty = ()=> (
  <Flex justify="center" gap={5}>
    <InfoCircleFilled size={25}/>
    <Typography.Text>Click body parts to add injury</Typography.Text>
  </Flex>
)


export default function InjuryForm({currSelectedPart, selectedList}: {currSelectedPart:  DOMSelection | null, selectedList: DOMSelection[]}) {

  const [addedPartsList, setAddedPartsList] = useState<PartInfo[]>([])

  // this function is called when user click on svg, and we get: class of clicked element & selected status
  useEffect(() => {

    if(currSelectedPart){
        const {partClasses, selected} = currSelectedPart
        if(selected){
          setAddedPartsList((prev) => [...prev, {label: partClasses, description: ""}]
          )
          return
        }
        setAddedPartsList((prev) => prev.filter((info) => info.label !== partClasses))
    }

  }, [currSelectedPart])

  // This when update part list is passed.
  
  useEffect(()=> {
    if(selectedList){
      
      const labelInfo: PartInfo[] = []
      
      selectedList.forEach((item) => {
        const data= {
          label: item.partClasses,
          description: ""
        }
        labelInfo.push(data)
      })

      setAddedPartsList(()=> labelInfo)
    }
  }, [selectedList])

  const handleRemoveListPart = (partClasses: string)=> {

    // remove from HTML DOM highlight classes
    ToggleSelectedClass(partClasses)

    // remove from react DOM
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
            actions={[
              <Button onClick={()=> handleRemoveListPart(item.label)}>Remove</Button>
            ]}
          >
            <List.Item.Meta
              title={<Tag color = "red-inverse">{labelToReadable(item.label)}</Tag>}
              style={{marginBottom: "0"}}
            />
              <TextArea 
                rows={2} 
                placeholder="Injury details..." 
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
          </List.Item>
        )}
      />
      </ConfigProvider>

    </Flex>
  )
}