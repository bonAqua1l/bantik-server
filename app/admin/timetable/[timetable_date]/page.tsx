import { Timetable } from '@/pages/timetable'

type Props = {
  params: Promise<{ timetable_date: string }>
}

export default async function Page({ params }: Props) {
  const timetable_date = (await params).timetable_date

  return <Timetable.Pages.View timetable_date={timetable_date} />
}
