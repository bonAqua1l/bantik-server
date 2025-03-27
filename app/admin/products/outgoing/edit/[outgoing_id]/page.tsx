import { ProductsOutgoing } from '@/pages/products/outgoing'

type Props = {
    params: Promise<{ outgoing_id: number }>
}

export default async function Page({ params }: Props) {
  const outgoing_id = (await params).outgoing_id

  return <ProductsOutgoing.Pages.Edit outgoing_id={outgoing_id} />
}
