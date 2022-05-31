import React from 'react'
import { useState } from 'react'

function LoginForm() {

	const [email,changeEmail] = useState('')
	const [password,changePassword] = useState('')

	const updateEmail = (e) => {
		const emailVal = e.target.value
		changeEmail(emailVal)
		// console.log(`updateEmail ran`)
	}

	const updatePassword = (e) => {
		const passwordVal = e.target.value
		changePassword(passwordVal)
		// console.log(`updatePassword ran`)
	}
	const onLogin = (e) => {
		e.preventDefault()
		// console.log(`email:\t${email}\npassword:\t${password}`)
		
	}

	return <>
		<div className="container">
			<form onSubmit={onLogin}>
				<div className="mb-3">
				    <label for="inputEmail" className="form-label">Email address</label>
					<input type="email" onChange={updateEmail} className="form-control" id="inputEmail" aria-describedby="emailHelp"/>
				</div>
				<div className="mb-3">
					<label for="inputPassword" className="form-label">Password</label>
	    			<input type="password" onChange={updatePassword} className="form-control" id="inputPassword"/>
	    		</div>
			  	<button type="submit" className="btn btn-primary">Submit</button>	
			</form>
		</div>
	</>
}

export default LoginForm