import * as yup from 'yup'

export const movieSchema = yup.object().shape({
  movieName: yup.string().required("Required"),
  imagePath: yup.string().required("Required")
})