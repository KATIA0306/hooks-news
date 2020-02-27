import { useEffect, useState } from "react";

function useFormValidation(initialState, validate, authenticate) {
  const [values, setValues] = useState(initialState)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setSubmitting] = useState(false)

  useEffect(()=> {
    if(isSubmitting) {
      const noErrors = Object.keys(errors).length === 0
      if(noErrors) {
        authenticate()
        setSubmitting(false)
      } else {
        setSubmitting(false)
      }
    }
  }, [errors])
  const validationErrors = validate(values)

  const handleChange = event => {
      event.persist()
      setValues(prevValues => ({
          ...prevValues,
          [event.target.name]: event.target.value
      }))
  }
  const handleBlur = () => {
      setErrors(validationErrors)
  }
  const handleSubmit = event => {
      event.preventDefault()
      setErrors(validationErrors)
      setSubmitting(true)
  }
  return { errors, handleBlur, handleChange, handleSubmit, isSubmitting, values }
}

export default useFormValidation;
