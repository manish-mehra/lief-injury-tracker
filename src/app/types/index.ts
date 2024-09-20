
export type Injury = {
    label: string,
    description: string
  }
  
export type Report = {
    id: string;
    reporterName: string;
    date: string; // ISO string format
    injuries: Injury[];
}
  