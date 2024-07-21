import * as yup from "yup";

export const registerSchema = yup.object().shape({
  firstName: yup.
    string().
    required("Required"),
  lastName: yup.
    string().
    required("Required"),
  email: yup.
    string().
    email("Invalid email").
    required("Required"),
  password: yup.
    string().
    min(5).
    required("Required"),
})