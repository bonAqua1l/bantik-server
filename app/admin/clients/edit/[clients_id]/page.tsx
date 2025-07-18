import { Clients } from '@/pages/clients'

type Props = {
  params: Promise<{ clients_id: string }>
}

export default async function Page({ params }: Props) {
  const clients_id = (await params).clients_id

  return <Clients.Pages.Edit clients_id={clients_id} />
}
