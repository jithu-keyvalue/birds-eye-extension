import React from 'react'
import BirdIcon from '@/assets/icons/bird-icon.png'
import GoogleIcon from '@/assets/icons/google-icon.png'
import './Login.scss'

const Login = () => {
  const [email, setEmail] = React.useState(false)
  return (
   <div className='login-main'>
    <div className='login-content'>
      <img src={BirdIcon} alt='birds-eye icon' className='birds-eye-icon' />    
      <h1>Bird's Eye</h1>
      <p>
        Get instant AI-powered summaries with one click!
      </p>
      <button className='signin-button'>
        <img src={GoogleIcon} alt="" className='google-icon'/>
        Continue with Google
      </button>
    </div>
   </div> 
  )
}

export default Login