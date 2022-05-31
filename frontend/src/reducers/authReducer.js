import {FETCH_USERS,FETCH_LOGIN,LOGIN_USER,LOGOUT_USER} from '../actions/types'

const initialState = {
	user:null
}

export default function(state=initialState, action) {
	switch(action.type) {
		case LOGIN_USER:
			// console.log(action)
			return {
				...state,
				user: action.credentials
			}
		case LOGOUT_USER:
			// console.log(action)
			return {
				...state,
				user: null
			}
		default:
			return state
	}
}