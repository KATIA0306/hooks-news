import React, {useState} from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"

import useFormValidation from "./useFormValidation"
import validateLogin from "./validateLogin"
import firebase from "./../../firebase"

const styles = {
  error: {
    border: "2px solid red",
    borderRadius: 4,
  },
  errorMessage: {
    fontSize: 12,
    color: "#D8000C",
  },
  disabled: {
    background: "grey",
  },
  enabled: {
    background: "orange",
  }
}
const Form = styled.form`
  display: flex;
  flex-direction: column;
`
const Button = styled.button`
  font-family: monospace;
  font-size: 10pt;
  color: black;
  background-color: buttonface;
  text-align: center;
  padding: 2px 6px 3px;
  border-width: 2px;
  border-style: outset;
  border-color: buttonface;
  cursor: pointer;
  max-width: 250px;
`

const INITIAL_STATE = {
  name: "",
  email: "",
  password: ""
}

function Login(props) {
  const { errors, handleBlur, handleChange, handleSubmit, isSubmitting, values } = useFormValidation(INITIAL_STATE, validateLogin, authenticateUser)
  const [login, setLogin] = useState(true)
  const [firebaseError, setFirebaseError] = useState(null)
  
  async function authenticateUser() {
    const { email, name, password } = values
    try {
      login 
      ? await firebase.login(email, password) 
      : await firebase.register(name, email, password)
      props.history.push("/")
    }
    catch(err) {
      console.error("Authentification Error ", err)
      setFirebaseError(err.message)
    }
  }

  return (
    <div>
      <h2 className="mv3">{login? "Login" : "Create Account"}</h2>
      <Form onSubmit={handleSubmit}>
        {!login && <input
          onChange={handleChange}
          name="name"
          type="text"
          value={values.name} 
          placeholder="Your Name"
          autoComplete="off"
        />}
        <input
          onChange={handleChange}
          onBlur={handleBlur}
          name="email"
          type="text"
          style={errors && errors.email ? styles.error : null}
          value={values.email}
          placeholder="Your email"
          autoComplete="off"
        />
        {errors && errors.email && <p style={styles.errorMessage}>{errors.email}</p>}
        <input 
          onChange={handleChange}
          onBlur={handleBlur}
          name="password"
          type="password"
          style={errors && errors.password ? styles.error : null}
          value={values.password}
          placeholder="Create a Password"
        />
        {errors && errors.password && <p style={styles.errorMessage}>{errors.password}</p>}
        {firebaseError && <p style={styles.errorMessage}>{firebaseError}</p>}
        <div className="flex mt3">
          <Button type="submit" disabled={isSubmitting} style={{background: isSubmitting ? "grey" : "orange"}}>
            Submit
          </Button>
          <Button type="button" onClick={()=> setLogin(prevLogin => !prevLogin)}>
            {login ? "Need to Create an Account?" : "Already have an Account?"}
          </Button>
        </div>
      </Form>
      <div className="forgot-password">
        <Link to="/forgot">Forgot Password?</Link>
      </div>
    </div>
  )
}

export default Login;
