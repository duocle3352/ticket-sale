import * as yup from 'yup'

const authSchema = yup.object({
  email: yup.string().required('Vui lòng nhập email').email('Vui lòng nhập email'),
  password: yup
    .string()
    .required('Vui lòng nhập mật khẩu')
    .min(6, 'Mật khẩu tối thiểu 6 ký tự')
    .max(30, 'Mật khẩu tối đa 30 ký tự'),
  confirm_password: yup
    .string()
    .required('Vui lòng nhập lại mật khẩu')
    .min(6, 'Mật khẩu tối thiểu 6 ký tự')
    .max(30, 'Mật khẩu tối đa 30 ký tự')
    .oneOf([yup.ref('password')], 'Nhập lại password không chính xác')
})

export const loginSchema = authSchema.omit(['confirm_password'])
export const forgotPasswordSchema = authSchema.pick(['email'])
export const confirmPasswordSchema = authSchema.omit(['email'])

export type LoginForm = yup.InferType<typeof loginSchema>
export type ForgotPasswordForm = yup.InferType<typeof forgotPasswordSchema>
export type ConfirmPasswordForm = yup.InferType<typeof confirmPasswordSchema>
