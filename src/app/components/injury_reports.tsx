import React, {useEffect, useState} from 'react';
import { Space, Table, Tag, Flex, Button } from 'antd'
import type { TableProps } from 'antd'
import { useQuery, gql, useMutation } from '@apollo/client'
import InjuryDrawer from './Injury/injury_drawer'
import { Report } from "../types"
import dayjs from 'dayjs'
import { labelToReadable } from "@/app/utils"

export type DrawerState = "add" | "view" | "update"



const GET_ALL_INJURY_REPORTS = gql`
  query GetAllReport{
    getAllInjuryReports{
      success
      message
      data {
        id
        reporterName,
        date,
        injuries {
          label,
          description
        }
      }
    }
  }
`

const DELTE_A_REPORT = gql`
  mutation DeleteInjuryReport($id: String!){
    deleteInjuryReport(id: $id){
      success,
      message
    }
  }
`

// REMINDER: dummy data is wrong for body parts.

const InjuryReports: React.FC = () => {

  // const { loading, error, data } = useQuery(TestQuery)
  // const [testMut, {data: res, loading: mutLoading, error: mutError}] = useMutation(TEST_MUTATION)

  const [view, setView] = useState(false)
  const [update, setUpdate] = useState(false)
  const [currViewRecord, setCurrViewRecord] = useState<Report>()
  const [currUpdateRecord, setCurrUpdateRecord] = useState<Report>()

  const { loading: getReportLoading, error: getRerportError, data: getReportData } = useQuery(GET_ALL_INJURY_REPORTS)
  const [deleteInjuryReport, { data: deleteInjuryData, loading: deleteInjuryLoading, error: deleteInjuryError }] = useMutation(DELTE_A_REPORT, {
    refetchQueries: [
      'GetAllReport' // Query name
    ],
  })
  
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
        <Button size="middle" onClick={()=> deleteInjuryReport({variables: {id: record.id}})}>
          Delete
        </Button>
      ),
    },
  ]


  return(
    <Flex style={{width: "100%"}}>
        {
          !getRerportError && 
          <Table 
          rowKey={data => data.id}
          columns={columns} 
          dataSource={getReportData && getReportData.getAllInjuryReports.data} 
          style={{width: "100%"}} 
          scroll={{x: 700}}
          loading = {getReportLoading || deleteInjuryLoading} 
          
        />
        }
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