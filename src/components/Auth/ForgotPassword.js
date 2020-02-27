import React, { useState, useContext } from "react";
import FirebaseContext from "./../../firebase/context"

function ForgotPassword() {
  const [resetPasswordEmail, setResetPasswordEmail] = useState("")
  const { firebase } = useContext(FirebaseContext)
  const [isPasswordReset, setIsPasswordReset] = useState(false)
  const [passwordResetError, setPasswordResetError] = useState(null)

  const handleResetPassword = async () => {
    try {
      await firebase.resetPassword(resetPasswordEmail)
      setIsPasswordReset(true)
      setPasswordResetError(null)
    }
    catch (err) {
      console.error("Error sending email ", err)
      setPasswordResetError(err.message)
      setIsPasswordReset(false)
    }
  }
  return (
    <div>
      <input
        type="email"
        className="input"
        placeholder="Provide your account email"
        onChange={event => setResetPasswordEmail(event.target.value)}
      />
      <div>
        <button onClick={handleResetPassword} className="button">
          Reset Password
        </button>
      </div>
      {isPasswordReset && <p>Check email to reset password</p>}
      {passwordResetError && <p className = "error-text">{passwordResetError}</p>}
    </div>
  )
}

export default ForgotPassword;
