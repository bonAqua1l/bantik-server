export function getRoles(role: string) {
  const allRoles = [
    {
      label: 'manager',
      value: 'Менеджер',
    },
    {
      label: 'worker',
      value: 'Мастер',
    },
    {
      label: 'director',
      value: 'Директор',
    },
  ]

  return allRoles.find((item) => item.label === role)?.value
}
