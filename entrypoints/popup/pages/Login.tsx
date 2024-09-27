import React from 'react'
import BirdIcon from '@/assets/icons/bird-icon.png'
import GoogleIcon from '@/assets/icons/google-icon.png'
import './Login.scss'
import { Link, redirect, useNavigate } from 'react-router-dom'



const Login = () => {
  const navigate = useNavigate();
  useEffect(()=>{
    chrome.tabs.query({active: true, currentWindow: true}, (tabs: any) => {
      chrome.tabs.sendMessage(tabs[0].id, {message: 'is-logged-in?'}, (response: any) => {
        if(response && response.message === 'logged-in'){
          navigate('/summary');
        }
      });
    });
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
          chrome.tabs.query({active: true, currentWindow: true}, (tabs: any) => {
            chrome.tabs.sendMessage(tabs[0].id, {message: 'logged-in'});
          });
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