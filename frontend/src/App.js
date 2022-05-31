import './App.css';
import LoginForm from "./components/LoginForm"
import UserPage from './components/userPage'
import { connect } from 'react-redux'
import { useState,useEffect } from 'react'
import {fetchLogin} from './actions/postActions'
// import cookies from 'universal-cookies'

function App(props) {
  const [user,updateUser] = useState({})
  
  useEffect(()=>{
    console.log(props.user)
  })

  return (
      <div className='App'>
      {!props.user
        ?<LoginForm />
        :<UserPage/>}
      </div>)
}

const mapStateToProps = function(state) {
  return {
    user: state.auth.user
  }
}

export default connect(mapStateToProps, {})(App);
