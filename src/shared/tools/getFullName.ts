export function getFullName(first_name: string, last_name: string | null, surname: string | null) {
  return `${first_name} ${last_name ? last_name : ''} ${surname ? surname : ''}`
}
