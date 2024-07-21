import * as yup from 'yup'

export const loginSchema = yup.object().shape({
  email: yup.string().email().required("Email is required"),
  password: yup.string().min(5).required("Password is required")
})


