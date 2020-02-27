const validateUrl = url => {
    if (!/^(ftp|http|https):\/\/[^ "]+$/.test (url)) return false
    else return true
  }
export default validateUrl