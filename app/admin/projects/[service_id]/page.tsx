import { Projects } from '@/pages/projects'

type Props = {
  params: Promise<{ service_id: number }>
}

export default async function Page({ params }: Props) {
  const service_id = (await params).service_id

  return <Projects.Pages.View service_id={service_id} />
}
