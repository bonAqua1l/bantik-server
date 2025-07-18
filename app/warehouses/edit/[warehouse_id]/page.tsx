import { Warehouses } from '@/pages/warehouses'

type Props = {
  params: Promise<{ warehouse_id: number }>
}

export default async function Page({ params }: Props) {
  const warehouse_id = (await params).warehouse_id

  return <Warehouses.Pages.Edit warehouse_id={warehouse_id} />
}
