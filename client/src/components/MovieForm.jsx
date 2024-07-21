import { useFormik } from 'formik'
import { movieSchema } from '../schemas/movie'
import AppContext from '../AppContext'
import { useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { Box } from '@mui/material'
export const MovieForm = () => {
  const baseUrl = useContext(AppContext).baseUrl
  const [message, setMessage] = useState('')
  const handleImageChange = (event) => {
    const file = event.currentTarget.files[0];
    formik.setFieldValue('imagePath', file.name);
  };
  const onSubmit = async (values) => {
    try {
      const response = await axios.post(`${baseUrl}/movies/addMovie`, values)
      setMessage('Movie has been posted!')
    }
    catch (error) {
      setMessage('Movie post failed!')
    }
  }
  useEffect(() => {
    setMessage('')
  }, [])
  const formik = useFormik({
    initialValues: {
      movieName: '',
      imagePath: ''
    },
    validationSchema: movieSchema,
    onSubmit
  })
  const { values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting } = formik
  return (
    <form onSubmit={handleSubmit} autoComplete="off" style={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
      <label for="movieName">Movie Name</label>
      <input id="movieName" name="movieName" type="text" onChange={handleChange} onBlur={handleBlur} value={values.movieName} />
      <label for="imagePath">Image Path</label>
      <input
        type="file"
        id="image"
        name="image"
        onChange={handleImageChange}
        onBlur={handleBlur}
      />
      {message}
      <button type="submit">Submit</button>
    </form>
  )
}
