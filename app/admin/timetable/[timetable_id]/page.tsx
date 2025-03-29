import { Timetable } from '@/pages/time-table'

type Props = {
  params: Promise<{ timetable_id: number }>
}

export default async function Page({ params }: Props) {
  const timetable_id = (await params).timetable_id

  return <Timetable.Pages.View timetable_id={timetable_id} />
}
