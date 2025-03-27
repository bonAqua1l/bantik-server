export function generatePassword(): string {
  const length = Math.floor(Math.random() * (40 - 8 + 1)) + 8

  const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz'
  const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const numberChars = '0123456789'
  const specialChars = '!@#$%^&*()_+-=[]{}|;:,.<>?'
  const allChars = lowerCaseChars + upperCaseChars + numberChars + specialChars

  const getRandomChar = (chars: string) => chars[Math.floor(Math.random() * chars.length)]

  const passwordChars = [
    getRandomChar(lowerCaseChars),
    getRandomChar(upperCaseChars),
    getRandomChar(numberChars),
    getRandomChar(specialChars),
  ]

  while (passwordChars.length < length) {
    passwordChars.push(getRandomChar(allChars))
  }

  for (let i = passwordChars.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))

    ;[passwordChars[i], passwordChars[j]] = [passwordChars[j], passwordChars[i]]
  }

  return passwordChars.join('')
}
