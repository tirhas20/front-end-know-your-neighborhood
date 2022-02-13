import React from 'react';
import { useAuth0, withAuthenticationRequired  } from "@auth0/auth0-react";
import JSONPretty from 'react-json-pretty';
import Loading from './Loading'
import './Profile.css'

const Profile = ()=> {
    const { user, isAuthenticated } = useAuth0();

    return (
        isAuthenticated && ( 
        <div className='profile-page'>
            <img src={user.picture} alt={user.name} />
            <p>{user.email}</p>
            <JSONPretty data={user} />
            </div>
        )
    )
}

export default withAuthenticationRequired(Profile, {
    onRedirecting: () => <Loading />,
  });