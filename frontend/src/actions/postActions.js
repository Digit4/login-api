import {LOGIN_USER,LOGOUT_USER} from './types'
import axios from 'axios'

export function fetchLogin(email,password) {
	return function (dispatch) {
			const credObj = {
				email:email,
				password:password
			}
			// console.log(credObj)
		fetch('http://127.0.0.1:8000/users/login/',{
			method:"POST",
			withCredentials: true,
			body: JSON.stringify(credObj),
			headers: {
		    	'Content-Type': 'application/json',
		  	},
		})
		// .then(res=>{
		// 	console.log(res)
		// 	// return res
		// })
		.then(res=>res.json())
		.then(data=> dispatch({
			type: LOGIN_USER,
			credentials: data
		}))
	}

}

export function attemptLogout () {
	return function(dispatch) {
		return dispatch({
			type:LOGOUT_USER
		})
	}
}