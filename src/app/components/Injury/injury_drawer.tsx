import React, { useState, useCallback } from 'react';
import { Button, Drawer,  Space,Tag, Flex, Typography, Input, DatePicker, DatePickerProps } from 'antd';
import { DOMSelection } from "../add_injury/dom_helper"
import Body from './body'
import InjuryList from './injury_list'
import dayjs from 'dayjs'
import { Injury, Report } from '../local_types'
import { DrawerState } from '../injury_reports'

const InjuryDrawer = ({
  open, setOpen, report, setReport, state
  }: {
    open: boolean, 
    setOpen:  React.Dispatch<React.SetStateAction<boolean>>,
    report: Report | undefined
    setReport: React.Dispatch<React.SetStateAction<Report | undefined>>
    state?: DrawerState
  }) => {

    if(!report) {
      return <p>No Report Found!</p>
    }

  //TODO: performance issue -> causes rerender on writing description
  // list to keep track of selected dom parts  
  const [addedPartsList, setAddedPartsList] = useState<Injury[]>(
    state !== 'edit' ? 
    report.injuries
    :
    []
  )
  
  const [reportInfo, setReportInfo] = useState(
    state !== 'edit' ?
    {reporterName: report.reporterName, date: report.date}
    :
    {reporterName: "", date: new Date().toISOString()}
  )

  /**
   * called when svg body part is clicked
   */
  const DOMCallback = (domData: DOMSelection) => {
    // update the injury-list items 
    const {partClasses, selected} = domData
    if(selected){
        setAddedPartsList((prev) => [...prev, {label: partClasses, description: ""}])
        return
      }
    setAddedPartsList((prev) => prev.filter((info) => info.label !== partClasses))
  }

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


  const onClose = () => {
    // cleanup...
    setReportInfo({reporterName: "", date: new Date().toISOString()})
    setAddedPartsList(()=> []) // empty injury form list
    
    setReport(undefined)
    setOpen(false)
  }

  return (
    <>
      <Drawer
        title= {`${state} Report`}
        width={660}
        onClose={onClose}
        open={open}
        destroyOnClose
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
        extra={
          state !== 'view' && (
            <Space>
              <Button onClick={onClose}>Cancel</Button>
              <Button 
              onClick={()=> {
                console.log("Report Data: ", {...reportInfo, injuries: [addedPartsList]})
                onClose() // close drawer
              }} type="primary">
                Submit
              </Button>
          </Space>
          )
        }
      >
        <Flex gap={"1em"} vertical>
        
          <Space direction='vertical'>
            <Tag color = "default">Reporter</Tag>
            <Space>
              <Input
              readOnly = {state === 'view'}
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
                disabled = {state === 'view'}
                // readOnly = {state === 'view'}
                onChange={onDateChange} 
                format={"DD, MMMM YYYY"}
                value={dayjs(reportInfo.date)}
                />
            </Space>
          </Space>

          <Body
            state = {state}
            handleCallback={DOMCallback} 
            addedPartList = {addedPartsList}
            />
          <InjuryList
            state = {state}
            addedPartsList = {addedPartsList} 
            setAddedPartsList = {setAddedPartsList}
            />
        </Flex>
        
      </Drawer>
    </>
  );
};

export default InjuryDrawer;