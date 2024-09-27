import React from 'react'
import BirdIcon from '@/assets/icons/bird-icon.png'
import GoogleIcon from '@/assets/icons/google-icon.png'
import './Login.scss'
import { Link, redirect } from 'react-router-dom'



const Login = () => {
  useEffect(()=>{
    browser.runtime.sendMessage({type: 'get-logged-in'}).then((response)=>{
      console.log(response)
      if(response.loggedIn){
        redirect('/summary')
      }
    })
  }, []);

  return (
   <div className='login-main'>
    <div className='login-content'>
      <img src={BirdIcon} alt='birds-eye icon' className='birds-eye-icon' />    
      <h1>Bird's Eye</h1>
      <p>
        Get instant AI-powered summaries with one click!
      </p>
      <Link to={'/summary'} className='signin-button' onClick={
        ()=>{
          browser.runtime.sendMessage({type: 'set-logged-in', loggedIn: true})
        }
      }>
        <img src={GoogleIcon} alt="" className='google-icon'/>
        Continue with Google
      </Link>
    </div>
   </div> 
  )
}

export default Login