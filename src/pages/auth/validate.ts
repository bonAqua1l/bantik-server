const required = { required: true, message: 'Поле обязательно для заполнения' }

export const AuthRules = {
  Email: [
    required,
  ],
  Password: [
    required,
  ],
}
