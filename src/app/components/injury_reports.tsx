import React, {useEffect, useState, useRef} from 'react'
import { Space, Table, Tag, Flex, Button, Typography, Input, DatePicker } from 'antd'
import type { TableProps, InputRef, TableColumnsType, TableColumnType } from 'antd'
import type { FilterDropdownProps } from 'antd/es/table/interface'
import { useQuery, gql, useMutation } from '@apollo/client'
import InjuryDrawer from './Injury/injury_drawer'
import { Report } from "../types"
import dayjs from 'dayjs'
import { labelToReadable } from "@/app/utils"
import { SearchOutlined, CalendarFilled, FilterFilled } from '@ant-design/icons'
import { clear } from 'console'

export type DrawerState = "add" | "view" | "update"

const {RangePicker} = DatePicker


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


type OnChange = NonNullable<TableProps<Report>['onChange']>
type Filters = Parameters<OnChange>[1]

type GetSingle<T> = T extends (infer U)[] ? U : never
type Sorts = GetSingle<Parameters<OnChange>[2]>

type DataIndex = keyof Report

function isDateInRange(start: string, end: string, date: string): boolean {
  const startDate = new Date(start)
  const endDate = new Date(end)
  const checkDate = new Date(date)
  return checkDate >= startDate && checkDate <= endDate
}

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

  const searchInput = useRef<InputRef>(null)
  const [filterDateRange, setFilterDateRange] = useState<string[]>([])


  const handleDateRange = (
    selectedKeys: string[],
    confirm: FilterDropdownProps['confirm'],
    dataIndex: DataIndex,
  ) => {
    confirm()
    setFilterDateRange(selectedKeys)
  }

  const handleDateRangeReset = (clearFilters: () => void) => {
    clearFilters()
    setFilterDateRange([])
  }

  const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType<Report> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => confirm()}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => confirm()}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && clearFilters()}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close()
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => {
      return (<SearchOutlined style={{ color: filtered ? '#1677ff' : undefined, fontSize: "1.3em" }} />)
    },
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100)
      }
    },
    render: (text: string) => text,
  })

  const getColumnDateRangeProps = (dataIndex: DataIndex): TableColumnType<Report> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8, display: "flex", flexDirection: "column", gap: "2em" }} onKeyDown={(e) => e.stopPropagation()}>
        <RangePicker
          value = {[dayjs(filterDateRange[0]), dayjs(filterDateRange[1])]}
          onChange={(dateRange)=> {
            // dateRange [{},{}]
            if(dateRange?.length == 2){
              const k1 = dateRange[0]?.toISOString()?? ""
              const k2 = dateRange[1]?.toISOString()?? ""
              setSelectedKeys([k1, k2])
              setFilterDateRange([k1, k2])
              return
            }
            setFilterDateRange([])
        }}/>
        <Space>
          <Button
            type="primary"
            onClick={() => handleDateRange(selectedKeys as string[], confirm, dataIndex)}
            icon={<FilterFilled />}
            size="small"
            style={{ width: 90 }}
          >
            Filter
          </Button>
          <Button
            onClick={() => {

              clearFilters && handleDateRangeReset(clearFilters)
            }}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close()
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => {
      return (<CalendarFilled style={{ color: filtered ? '#1677ff' : undefined, fontSize: "1.3em"  }} />)
    },
    onFilter: (value, record) => {
      if(filterDateRange.length === 0){
        return true
      }
      return isDateInRange(filterDateRange[0], filterDateRange[1], record.date)
    },
    render: (dateStr: string) => dayjs(dateStr).format("DD, MMMM YYYY")
  })


  const columns: TableProps<Report>['columns'] = [
    {
      title: 'Reporter Name',
      dataIndex: 'reporterName',
      key: 'reporterName',
      render: (text) => <p>{text}</p>,
      sorter: (a, b) => a.reporterName.length - b.reporterName.length,
      ...getColumnSearchProps('reporterName')
    },
    {
      title: 'Reported Date',
      dataIndex: 'date',
      key: 'date',
      render: (dateStr: string) => <p>{dayjs(dateStr).format("DD, MMMM YYYY")}</p>,
      sorter: (a, b ) => new Date(a.date).getTime() - new Date(b.date).getTime(),
      ...getColumnDateRangeProps('date')
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
            )
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