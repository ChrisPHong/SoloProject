import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import {login} from '../../store/session'
import './Navigation.css';
import {useHistory} from 'react-router-dom'

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const user = {credential:'demo@user.io', password: 'password'}
  const history = useHistory();
  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div className='navbarDiv'>
        <NavLink exact to="/businesses">Home</NavLink>
        <ProfileButton user={sessionUser} />
        <button onClick={() => {
          history.push('/form')
        }}
        to="/form">Create Your Business</button>
        <a href='https://github.com/ChrisPHong/Squeals'>GitHub</a>
        <a href='https://www.linkedin.com/in/christopherpyohong/'>LinkedIn</a>

      </div>
    );
  } else {
    sessionLinks = (
      <>
      <div className='navbarDiv'>
        <NavLink className='LogInButton' to="/login">Log In</NavLink>
        <NavLink className='SignUpButton' to="/signup">Sign Up</NavLink>

      <button
      className='demoButton'
      onClick={async () => {
        await dispatch(login(user))
        await history.push('/businesses')
      }}>Demo User</button>
        <a href='https://github.com/ChrisPHong/Squeals'>GitHub</a>
        <a href='https://www.linkedin.com/in/christopherpyohong/'>LinkedIn</a>
      </div>
      </>
    );
  }

  return (
    <>
      <div>

        {isLoaded && sessionLinks}
      </div>
    </>
  );
}

export default Navigation;
