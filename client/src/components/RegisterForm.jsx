import { useFormik } from 'formik';
import { registerSchema } from '../schemas/register';
import axios from 'axios'
import AppContext from '../AppContext';
import { useContext, useState } from 'react';
import { Alert } from '@mui/material';



function RegisterForm() {

  const [errorMessage, setErrorMessage] = useState('')
  const [message, setMessage] = useState('')

  const baseUrl = useContext(AppContext).baseUrl

  const onSubmit = async (values) => {
    try {
      const response = await axios.post(`${baseUrl}/auth/register`, values)
      setMessage('Registered successfuly!')
    }
    catch (error) {
      setErrorMessage(error.message)
    }
  }

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
    validationSchema: registerSchema,
    onSubmit
  });

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting
  } = formik;



  return (
    <div>
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      <form onSubmit={handleSubmit} autoComplete="off" style={{ display: 'flex', flexDirection: 'column' }}>

        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          type="text"
          placeholder="Enter your first name here"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          className={errors.firstName && touched.firstName ? "input error" : ""}
        />
        <label htmlFor="lastName">Last Name</label>
        <input
          id="lastName"
          type="text"
          placeholder="Enter your last name here"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          className={errors.lastName && touched.lastName ? "input error" : ""}
        />
        {errors.name && touched.name && <p className="error">{errors.name}</p>}
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          placeholder="Enter your email here"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          className={errors.email && touched.email ? "input error" : ""}
        />
        {errors.email && touched.email && <p className="error">{errors.email}</p>}
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          placeholder="Enter your password here"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          className={errors.password && touched.password ? "input error" : ""}
        />
        {errors.password && touched.password && <p className="error">{errors.password}</p>}
        <button disabled={isSubmitting} type="submit">Register</button>
        {message}
      </form>
    </div>
  );
}

export default RegisterForm;