import validateEmail from "../../helpers/emailValidation"

export default function validateLogin(values) {
    let errors = {}
    // email validation
    if( !values.email ) {
        errors.email = "Email Required"
    } else if (validateEmail(values.email) === false) {
        errors.email = "Invalid email address"
    }
    // password validation
    if ( !values.password ) {
        errors.password = "Password Required"
    } else if (values.password.length < 6) {
        errors.password = "Password must be at least 6 characters"
    }
  return errors
}
