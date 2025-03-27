import { ProductItems } from '@/pages/products/items'

type Props = {
  params: Promise<{ item_slug: string }>
}

export default async function Page({ params }: Props) {
  const item_slug = (await params).item_slug

  return <ProductItems.Pages.Edit item_slug={item_slug} />
}
