import { Projects } from '@/pages/projects'

type Props = {
  params: Promise<{ service_id: string }>
}

export default async function Page({ params }: Props) {
  const service_id = (await params).service_id

  return <Projects.Pages.Edit service_id={service_id} />
}
