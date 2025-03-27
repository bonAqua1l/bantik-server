import { ProductsIncoming } from '@/pages/products/incoming'

type Props = {
    params: Promise<{ incoming_id: number }>
}

export default async function Page({ params }: Props) {
  const incoming_id = (await params).incoming_id

  return <ProductsIncoming.Pages.Edit incoming_id={incoming_id} />
}
