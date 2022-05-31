import React from 'react'
import { useState,useEffect } from 'react'
import {connect} from 'react-redux'
import {fetchLogin} from '../actions/postActions'
import { useDispatch } from "react-redux";

function LoginForm(props) {

	const [email,changeEmail] = useState('')
	const [password,changePassword] = useState('')
	const dispatch = useDispatch();

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
		dispatch(fetchLogin(email,password));
	}

	return <>
		<div className="container">
			<form onSubmit={onLogin}>
				<div className="mb-3">
				    <label htmlFor="inputEmail" className="form-label">Email address</label>
					<input type="email" onChange={updateEmail} className="form-control" id="inputEmail" aria-describedby="emailHelp"/>
				</div>
				<div className="mb-3">
					<label htmlFor="inputPassword" className="form-label">Password</label>
	    			<input type="password" onChange={updatePassword} className="form-control" id="inputPassword"/>
	    		</div>
			  	<button type="submit" className="btn btn-primary">Submit</button>	
			</form>
		</div>
	</>
}

const mapStateToProps = (state) => {
  return {
  	user:state.auth.user
  }
}

export default connect(mapStateToProps, {fetchLogin})(LoginForm)