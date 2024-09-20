import React, {useEffect, useState} from 'react';
import { Space, Table, Tag, Flex, Button } from 'antd'
import type { TableProps } from 'antd'
import { useQuery, gql, useMutation } from '@apollo/client'
import InjuryDrawer from './Injury/injury_drawer'
import { Report } from "../types"
import dayjs from 'dayjs'
import { labelToReadable } from "@/app/utils"

export type DrawerState = "add" | "view" | "update"

const TestQuery = gql`
  query {
    allInjuryReports {
      id
      reporterName
    }
  }
`


const TEST_MUTATION = gql`
  mutation Test($name: String!){
    test(name: $name) {
      id
      name
    }
  }
`



const data: Report[] = [
  {
    "id": "1",
    "reporterName": "John Doe",
    "date": "2023-05-12T00:00:00.000Z",
    "injuries": [
      { "label": ".leg.left.lower", "description": "Twisted ankle during soccer game" },
      { "label": ".head", "description": "Hit head during a fall" }
    ]
  },
  {
    "id": "2",
    "reporterName": "Jane Smith",
    "date": "2024-02-15T00:00:00.000Z",
    "injuries": [
      { "label": ".arm.right.upper", "description": "Fell off a ladder" }
    ]
  },
  {
    "id": "3",
    "reporterName": "Michael Johnson",
    "date": "2023-11-20T00:00:00.000Z",
    "injuries": [
      { "label": ".hand", "description": "Sliced finger while cooking" }
    ]
  },
  {
    "id": "4",
    "reporterName": "Emily Davis",
    "date": "2024-04-05T00:00:00.000Z",
    "injuries": [
      { "label": ".hand", "description": "Touched hot stove" }
    ]
  },
  {
    "id": "5",
    "reporterName": "David Lee",
    "date": "2023-08-25T00:00:00.000Z",
    "injuries": [
      { "label": ".hips.left", "description": "Fell while skateboarding" }
    ]
  }
]

// REMINDER: dummy data is wrong for body parts.

const InjuryReports: React.FC = () => {

  // const { loading, error, data } = useQuery(TestQuery)
  // const [testMut, {data: res, loading: mutLoading, error: mutError}] = useMutation(TEST_MUTATION)

  const [view, setView] = useState(false)
  const [update, setUpdate] = useState(false)
  const [currViewRecord, setCurrViewRecord] = useState<Report>()
  const [currUpdateRecord, setCurrUpdateRecord] = useState<Report>()

  useEffect(()=> {
    if(currViewRecord){
      setView(true)
    }
  }, [currViewRecord])

  useEffect(()=> {
    if(currUpdateRecord){
      setUpdate(true)
    }
  }, [currUpdateRecord])

  const columns: TableProps<Report>['columns'] = [
    {
      title: 'Reporter Name',
      dataIndex: 'reporterName',
      key: 'reporterName',
      sorter: true,
      render: (text) => <p>{text}</p>,
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (dateStr: string) => <p>{dayjs(dateStr).format("DD, MMMM YYYY")}</p>
    },
    {
      title: 'Injuries',
      key: 'injuries',
      dataIndex: 'injuries',
      render: (_, { injuries }) => (
        <>
          {injuries.map((injury) => {
            let color = 'red'
            return (
              <Tag color={color} key={injury.label + injury.description.slice(0, 5).trim()}>
                {labelToReadable(injury.label)}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'View',
      key: 'view',
      render: (_, record) => (
        <Button size="middle" onClick={()=> setCurrViewRecord(()=> record)}>
          View
        </Button>
      ),
    },
    {
      title: 'Update',
      key: 'update',
      render: (_, record) => (
        <Button size="middle" onClick={()=> setCurrUpdateRecord(()=> record)}>
          Update
        </Button>
      ),
    },
    {
      title: 'Delete',
      key: 'delete',
      render: (_, record) => (
        <Button size="middle" onClick={()=> console.log(record)}>
          Delete
        </Button>
      ),
    },
  ]


  return(
    <Flex style={{width: "100%"}}>
        <Table 
        rowKey={data => data.id}
        columns={columns} 
        dataSource={data} 
        style={{width: "100%"}} 
        scroll={{x: 700}}
        loading = {false} 
        />
        {/* COMPONENT BAD ANimation because of this */}
        {
          currViewRecord && <InjuryDrawer
          open = {view} 
          setOpen={setView}
          state='view'
          report = {currViewRecord}
          setReport = {setCurrViewRecord}
        />
        }
        {
          currUpdateRecord && <InjuryDrawer 
          open = {update} 
          setOpen={setUpdate}
          state='update'
          report = {currUpdateRecord}
          setReport = {setCurrUpdateRecord}
        />
        }
    </Flex>
  )
}

export default InjuryReports