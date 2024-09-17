import React, { useState, useCallback } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Drawer,  Space, Flex, Typography, Input } from 'antd';
import { DOMSelection } from "./add_injury/dom_helper"
import Body from './add_injury/body'
import InjuryList from './add_injury/injury_list'

const bodyParts = ['leg', 'foot', 'hips', 'back', 'waist', 'chest', 'neck', 'shoulder', 'arm', 'hand', 'head']

export type PartInfo = {
  label: string,
  description: string
}

export type ReporterInfo=  {
  name: string,
  date: string
}

const {displayName, Group} = Input

const AddInjuryDrawer: React.FC = () => {

  const [open, setOpen] = useState(false)

  const showDrawer = () => setOpen(true)
  const onClose = () => {
    // cleanup...
    setAddedPartsList(()=> []) // empty injury form list
    setOpen(false)
  }
  
  // list to keep track of selected dom parts  
  const [addedPartsList, setAddedPartsList] = useState<PartInfo[]>([]) //TODO: causes rerender on writing description
  const [reportInfo, setReportInfo] = useState({name: "", date: new Date().getDate()})
  /**
   * called when svg body part is clicked
   */
  const DOMCallback = useCallback((domData: DOMSelection) => {
    // update the injury-list items 
    const {partClasses, selected} = domData
    if(selected){
        setAddedPartsList((prev) => [...prev, {label: partClasses, description: ""}])
        return
      }
    setAddedPartsList((prev) => prev.filter((info) => info.label !== partClasses))
  }, [])



  return (
    <>
      <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
        Add Report
      </Button>
      <Drawer
        title="Add Report"
        width={660}
        onClose={onClose}
        open={open}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={()=> {
              console.log("DATA FINALLY", addedPartsList)
               onClose() // close drawer
            }} type="primary">
              Submit
            </Button>
          </Space>
        }
      >
        <Flex gap={4} style={{flexDirection: "column"}}>
          <Body  handleCallback={DOMCallback} addedPartList = {addedPartsList}/>
          <Flex>
            <Input 
              placeholder='Reporter Name'
              value={""}
              />
          </Flex>
          <InjuryList
            addedPartsList = {addedPartsList} 
            setAddedPartsList = {setAddedPartsList}
            />
        </Flex>
        
      </Drawer>
    </>
  );
};

export default AddInjuryDrawer;