import React from 'react';
import { Space, Table, Tag, Flex, Button } from 'antd'
import type { TableProps } from 'antd'
import { useQuery, gql, useMutation } from '@apollo/client'


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

type Injury = {
  label: string,
  description: string
}

interface DataType {
  id: string;
  reporterName: string;
  date: string;
  injuries: Injury[]
}

const columns: TableProps<DataType>['columns'] = [
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
  },
  {
    title: 'Injuries',
    key: 'injuries',
    dataIndex: 'injuries',
    render: (_, { injuries }) => (
      <>
        {injuries.map((injury) => {
          let color = injuries.length > 5 ? 'geekblue' : 'green';
          if (injury.label === '.chest') {
            color = 'volcano'
          }
          return (
            <Tag color={color} key={injury.label + injury.description.slice(0, 5).trim()}>
              {injury.label.toUpperCase()}
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
      <Button size="middle" onClick={()=> console.log(record)}>
        View
      </Button>
    ),
  },
  {
    title: 'Update',
    key: 'update',
    render: (_, record) => (
      <Button size="middle" onClick={()=> console.log(record)}>
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
];

const data: DataType[] = [
  {
    id: '1',
    reporterName: 'John Doe',
    date: '2023-05-12',
    injuries: [
      { label: '.leg', description: 'Twisted ankle during soccer game' },
      { label: '.head', description: 'Hit head during a fall' }
    ]
  },
  {
    id: '2',
    reporterName: 'Jane Smith',
    date: '2024-02-15',
    injuries: [
      { label: '.arm', description: 'Fell off a ladder' }
    ]
  },
  {
    id: '3',
    reporterName: 'Michael Johnson',
    date: '2023-11-20',
    injuries: [
      { label: '.hand', description: 'Sliced finger while cooking' }
    ]
  },
  {
    id: '4',
    reporterName: 'Emily Davis',
    date: '2024-04-05',
    injuries: [
      { label: '.hand', description: 'Touched hot stove' }
    ]
  },
  {
    id: '5',
    reporterName: 'David Lee',
    date: '2023-08-25',
    injuries: [
      { label: '.wrist', description: 'Fell while skateboarding' }
    ]
  }
];

const InjuryReports: React.FC = () => {

  // const { loading, error, data } = useQuery(TestQuery)
  // const [testMut, {data: res, loading: mutLoading, error: mutError}] = useMutation(TEST_MUTATION)



  return(
    <Flex style={{width: "100%"}}>
        <Table 
        rowKey={data => data.id}
        columns={columns} 
        dataSource={data.slice(0, 2)} 
        style={{width: "100%"}} 
        scroll={{x: 700}}
        loading = {false} 
        />
    </Flex>
  )
}

export default InjuryReports