import { Employees } from '@/pages/employees'

type Props = {
  params: Promise<{ employee_id: string }>
}

export default async function Page({ params }: Props) {
  const employee_id = (await params).employee_id

  return <Employees.Pages.Edit employee_id={employee_id} />
}
