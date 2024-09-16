import React, { useState, useCallback } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Drawer, Tag, Space, Flex, Typography } from 'antd';
import { DOMSelection, ToggleSelectedClass, RemoveSelectedClass } from "./add_injury/dom_helper"
import Body from './add_injury/body'
import InjuryForm from './add_injury/injury_form'
import { labelToReadable } from "@/app/utils"

const bodyParts = ['leg', 'foot', 'hips', 'back', 'waist', 'chest', 'neck', 'shoulder', 'arm', 'hand', 'head']

const AddInjuryDrawer: React.FC = () => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  }

  const [domSelected, setDomSelected] = useState<DOMSelection | null>(null)
  const [selectedList, setSelectedList] = useState<DOMSelection[]>([])
  const [currMousePart, setCurrMousePart] = useState<DOMSelection>()

    // Memoize the DOMCallback function
    const DOMCallback = useCallback((domData: DOMSelection) => {
      ToggleSelectedClass(domData.partClasses)
      setDomSelected(() => domData)      
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
              // remove all selected classes
               RemoveSelectedClass(bodyParts)
               setSelectedList(()=> [])
              onClose()
            }} type="primary">
              Submit
            </Button>
          </Space>
        }
      >
        <Flex gap={4} style={{flexDirection: "column"}}>
          <Body  handleCallback={DOMCallback}/>
          <InjuryForm currSelectedPart = {domSelected} selectedList = {selectedList}/>
        </Flex>
        
      </Drawer>
    </>
  );
};

export default AddInjuryDrawer;