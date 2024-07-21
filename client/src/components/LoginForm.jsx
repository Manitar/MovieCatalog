import { useFormik } from "formik";
import { Box } from "@mui/material";
import { Formik } from "formik";
import { loginSchema } from "../schemas/login";
import axios from "axios";
import Cookies from 'js-cookie'
import { Button, Alert } from "@mui/material";
import AppContext from "../AppContext";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./auth";
import jwt_decode from "jwt-decode";


function LoginForm() {
  const baseUrl = useContext(AppContext).baseUrl;
  const [errorMessage, setErrorMessage] = useState('')
  const [responseSuccess, setResponseSuccess] = useState('')
  const auth = useAuth()
  const navigate = useNavigate()

  const validateToken = async (token) => {
    try {
      const res = await axios.get(`${baseUrl}/auth/validate`, { params: { token } })
      if (res.status === 202) {
        const decoded = jwt_decode(token)
        auth.login(decoded.email)
        navigate('/home')
        return
      }
    }
    catch (error) {
    }
  }

  useEffect(() => {
    validateToken(Cookies.get('jwt'))
  })


  const onSubmit = async (values) => {
    try {
      const response = await axios.post(`${baseUrl}/auth/login`, values)
      setResponseSuccess("You have successfully logged in!")
      if (response.status == 200) {
        const { token } = response.data
        Cookies.set('jwt', token, { expires: 7 })
        auth.login(values.email)
        navigate('/home')
        return
      }
    }
    catch (error) {
      setErrorMessage(error.message)
    }
  }
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: loginSchema,
    onSubmit
  })
  const { values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting } = formik

  return (
    <div>
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      {responseSuccess}
      <form onSubmit={handleSubmit} autoComplete="off" style={{ display: "flex", flexDirection: "column" }}>
        <label for="email">Email</label>
        <input
          type="email"
          id="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          className={errors.email && touched.email ? "input error" : ""} />
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          className={errors.password && touched.password ? "input error" : ""} />
        <Button type="submit" variant="contained">Login</Button>
      </form>
    </div>
  )
}

export default LoginForm;