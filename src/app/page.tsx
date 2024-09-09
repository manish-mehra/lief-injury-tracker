'use client'
import { useUser } from '@auth0/nextjs-auth0/client'
import Link from 'next/link'
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

export default function Home() {
  const { user, isLoading } = useUser()
  const { loading, error, data } = useQuery(TestQuery)
  const [testMut, {data: res, loading: mutLoading, error: mutError}] = useMutation(TEST_MUTATION)

  console.log("Data:", data)
  console.log(res && res.test)

  return (
    <div>
      <main>
        <div style={{display:"flex", gap: "2em", marginBottom: "4em", alignItems: "center"}}>
        <h1>Injury Tracking System</h1>
          <h2 className=''>
            {isLoading && !user && "Loading user..."}
            {user && user.name}
          </h2>
          {user ? (
            <div>
              <Link href="/api/auth/logout">Logout</Link>
            </div>
          ) : (
            <Link href="/api/auth/login">Login</Link>
          )}
        </div>

        <div style={{display: "flex", flexDirection: "column"}}>
          <button 
          onClick={() => {
            testMut({variables: {
              name: "say my name"
            }})
          }}>Add mutation</button>
          <span>{mutLoading && "submitting"}</span>
          <span>{mutError && `Submission error: ${mutError.message}`}</span>
          <span>{res && `${res.test.id} | ${res.test.name}`}</span>
        </div>

        {loading ? (
          <p>Loading data...</p>
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : (
          <div>
            <h3>Injury Reports:</h3>
            {data && data.allInjuryReports?.length > 0 ? (
              <div>
                {data.allInjuryReports.map((report: any) => (
                  <div key={report.id} style={{background: "#d1cece", padding: "1em", marginBottom: "1em", borderRadius: "5px"}}>
                    <p>Reporter Name: {report.reporterName}</p>
                    <p>Injury DateTime: {report.injuryDateTime}</p>
                    <p>reportDateTime: {report.reportDateTime}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>No injury reports found</p>
            )}
          </div>
        )}
      </main>
    </div>
  )
}
