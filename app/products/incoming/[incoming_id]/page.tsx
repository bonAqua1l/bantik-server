import { ProductsIncoming } from '@/pages/products/incoming'

type Props = {
    params: Promise<{ incoming_id: string }>
}

export default async function Page({ params }: Props) {
  const incoming_id = (await params).incoming_id

  return <ProductsIncoming.Pages.View incoming_id={incoming_id} />
}
