import { ProductsOutgoing } from '@/pages/products/outgoing'

type Props = {
    params: Promise<{ outgoing_id: string }>
}

export default async function Page({ params }: Props) {
  const outgoing_id = (await params).outgoing_id

  return <ProductsOutgoing.Pages.View outgoing_id={outgoing_id} />
}
