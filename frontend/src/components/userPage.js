import React,{ useEffect, useState } from 'react'
import { useDispatch,connect } from 'react-redux'
import {attemptLogout} from '../actions/postActions'
import UseCountdown from './useCountdown'
// import { connect } from ''

const UserPage =  (props) => {
	const dispatch = useDispatch()
	const [timeRemaining,setTimeRemaining] = useState(Date.now())
	const logoutUser = () =>{
		dispatch(attemptLogout())
	}
	// useEffect(()=>{token_exp=Date.parse(props.user.expiration)},[])
	useEffect(()=>{
		setInterval(()=>{
			setTimeRemaining((Date.parse(props.user.expiration)-Date.now())/1000)
		},1000)
	})
	return <>
	<div className='mb-3'>
		{Math.floor(timeRemaining)}
	</div>
		
		<button onClick={logoutUser}>Logout</button>
	</>
}

const mapStateToProps = function(state) {
  return {
    user: state.auth.user
  }
}

export default connect(mapStateToProps, {attemptLogout})(UserPage);