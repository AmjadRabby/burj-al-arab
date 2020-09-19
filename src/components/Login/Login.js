import React, { useState } from 'react';
import { useContext } from 'react';

import { useHistory, useLocation } from 'react-router-dom';
import { UserContext } from '../../App';
import { 
  initializeLoginFramework, 
  handleGoogleSignIn, 
  handleSignInOut, 
  handleFbSignIn, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword 
} from './LoginManager';
import fbLogo from '../../image/Icon/fb.png';
import googleLogo from '../../image/Icon/google.png'

initializeLoginFramework();

function Login({setLoggedInUser}) {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    photo: '',
  });
const hadleLogd = () => {
  setLoggedInUser({
    name: 'amjad',
    email: 'a@a.b',
  })
}
 
  // const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  

  // console.log(setLoggedInUser)

 

  const history = useHistory();
  const location = useLocation()
  let { from } = location.state || { from: { pathname: "/" } };

  const googleSignIn = () => {
    handleGoogleSignIn()
    .then(res => {
      // console.log(res)
      handleResponse(res, true);
    })
  }
  const fbSignIn = () => {
    handleFbSignIn()
    .then(res => {
      handleResponse(res, true);
    })
  }
  // const signInOut = () => {
  //   handleSignInOut()
  //   .then(res => {
  //     handleResponse(res, false);
  //   })
  // }
  const handleResponse = (res, redirect) => {
    setUser(res);
    setLoggedInUser(res);
    if(redirect){
      history.replace(from);
    }
  }

  const handleBlur = (event) => {
    let isFieldValid = true;
    if(event.target.name === 'email'){
      isFieldValid = /\S+@\S+\.\S+/.test(event.target.value);      
    }
    if(event.target.name === 'password'){
      const isPasswordValid = event.target.value.length > 6;
      const passwordHashNumber = /\d{1}/.test(event.target.value);
      isFieldValid = passwordHashNumber && isPasswordValid;
    }
    if(isFieldValid){
      const newUserInfo = {...user};
      newUserInfo[event.target.name] = event.target.value;
      setUser(newUserInfo);
    }
  }

  const handleSubmit = (event) => {
    if(newUser && user.email && user.password){
      createUserWithEmailAndPassword(user.name, user.email, user.password)
      .then(res => {
        handleResponse(res, true);
      })
    }
    if(!newUser && user.email && user.password){
      signInWithEmailAndPassword(user.email, user.password)
      .then(res => {
        handleResponse(res, true);
      })
    }
    event.preventDefault();
  }

  return (
        <div className='w-50 text-center mx-auto border border-secondary py-3 px-4 bg-light rounded'>
          <h4 className='mb-4'>{ newUser ? 'Create an account' : 'Login'}</h4>
          <form onSubmit={handleSubmit}>
              {
                  newUser && 
                  <input onBlur={handleBlur} className='w-100 mb-3 border border-secondary rounded p-2 ' placeholder='Name' type="text" name='name'/>
              }
              <br/>
              <input onBlur={handleBlur} className='w-100 mb-3 border border-secondary rounded p-2' placeholder='Email' type="email" name='email'/>
              <br/>
              <input onBlur={handleBlur} className='w-100 mb-3 border border-secondary rounded p-2' placeholder='Password' type="password" name='password'/>
              <br/>
              <input  className='btn btn-warning w-100 mb-2  rounded p-2'  type="submit" value={newUser ? 'Create an account' : 'Login'}/>
          </form>
          {
              user.isLoggedIn ? <p style={{color:'green'}}>User {newUser ? 'created' : 'logged in'} successfully</p> : <p style={{color:'red'}}>{user.error}</p>
          }

          <p>{newUser ? 'Already have an account?' : "Don't have an account?"} <span style={{cursor:'pointer'}} onClick={() => setNewUser(!newUser)} className='text-warning'>{ newUser ? 'Login' : 'Create an account'}</span></p>
          <p>Or</p>
          <div style={{cursor:'pointer'}} onClick={fbSignIn} className='border border-secondary d-flex justify-content-center align-items-center py-1 w-50 mx-auto rounded-pill mb-2' >
              <img className='mx-2 ' style={{width:'30px'}} src={fbLogo} alt=""/>
              <p className='mb-0  '>Continue with facebook</p>
          </div>
          <div style={{cursor:'pointer'}} onClick={googleSignIn} className='border border-secondary d-flex justify-content-center align-items-center py-1 w-50 mx-auto rounded-pill' >
              <img className='mx-2 ' style={{width:'30px'}} src={googleLogo} alt=""/>
              <p className='mb-0 '>Continue with Google</p>
          </div>
      </div>
  );
};

export default Login;