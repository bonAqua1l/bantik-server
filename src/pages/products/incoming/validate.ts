const required = { required: true, message: 'Поле обязательно для заполнения' }
const numberOnly = { pattern: /^\d+$/, message: 'Введите только цифры' }
const documentNumberRule = { pattern: /^\d{8,}$/, message: 'Введите минимум 8 цифр' }

export const InputRules = {
  Number: [required, numberOnly],
  DocumentNumber: [required, documentNumberRule, numberOnly],
  Field: [required],
}
