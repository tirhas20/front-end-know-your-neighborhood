import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from '@auth0/auth0-react';


const domain = process.env.REACT_APP_AUTH0_DOMAIN
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID
const audience = process.env.REACT_APP_API_AUDIENCE


ReactDOM.render(
  
  <Auth0Provider
  domain={domain}
  clientId={clientId}
  redirectUri={window.location.origin}
  audience={audience}>
    <App />
  </Auth0Provider>,
  
  document.getElementById('root')
);

reportWebVitals();
