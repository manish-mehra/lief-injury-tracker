import React, { useState, useCallback } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Drawer,  Space,Tag, Flex, Typography, Input, DatePicker, DatePickerProps } from 'antd';
import { DOMSelection } from "./add_injury/dom_helper"
import Body from './add_injury/body'
import InjuryList from './add_injury/injury_list'
import dayjs from 'dayjs'

export type PartInfo = {
  label: string,
  description: string
}

export type ReporterInfo=  {
  name: string,
  date: string
}


const AddInjuryDrawer: React.FC = () => {

  const [open, setOpen] = useState(false)

  const showDrawer = () => setOpen(true)
  const onClose = () => {
    // cleanup...
    setReportInfo({reporterName: "", date: new Date().toISOString()})
    setAddedPartsList(()=> []) // empty injury form list
    setOpen(false)
  }
  
  // list to keep track of selected dom parts  
  const [addedPartsList, setAddedPartsList] = useState<PartInfo[]>([]) //TODO: causes rerender on writing description
  const [reportInfo, setReportInfo] = useState({reporterName: "", date: new Date().toISOString()})
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

  const onDateChange: DatePickerProps['onChange'] = (date, dateString) => {
    if(date){
      setReportInfo((prev) => {
        return {
          ...prev,
          date: date.toISOString() 
        }
      })
      return
    }
    alert("no date selected")
  }



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
              console.log("Report Data: ", {...reportInfo, injuries: [addedPartsList]})
               onClose() // close drawer
            }} type="primary">
              Submit
            </Button>
          </Space>
        }
      >
        <Flex gap={"1em"} vertical>
        
          <Space direction='vertical'>
            <Tag color = "default">Reporter</Tag>
            <Space>
              <Input 
              placeholder='Reporter Name'
              onChange={e => {
                setReportInfo((prev)=> {
                  return {
                    ...prev,
                    reporterName: e.target.value
                  }
                })
              }}
              value={reportInfo.reporterName}
              />
              <DatePicker 
                onChange={onDateChange} 
                format={"DD, MMMM YYYY"}
                value={dayjs(reportInfo.date)}
                />
            </Space>
          </Space>

          <Body  handleCallback={DOMCallback} addedPartList = {addedPartsList}/>
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