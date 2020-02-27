import validateUrl from "./../../helpers/urlValidation"

export default function validateCreateLink(values) {
    let errors = {}
    // description validation
    if( !values.description ) {
        errors.description = "Description Required"
    } else if (values.description.length < 10) {
        errors.description = "Description must be at least 10 characters"
    }
    // url validation
    if ( !values.url ) {
        errors.url = "URL Required"
    } else if (validateUrl(values.url) === false) {
        errors.url = "Invalid URL"
    }
  return errors
}
