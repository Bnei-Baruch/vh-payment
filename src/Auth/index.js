import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';

import Keycloak from 'keycloak-js';
import keycloakConfig from './keycloak-config';
import {setLoggedInUser} from '../redux/actions/themeActions';
import {Route, useHistory} from 'react-router-dom';

const Auth = (props) => {
  const [auth, setAuth] = useState({keycloak: null, authenticated: false});
  const dispatch = useDispatch();

  useEffect(() => {
    const login = async () => {
      const keycloak = Keycloak(keycloakConfig);
      const authenticated = await keycloak.init({onLoad: 'login-required'})
      await keycloak.loadUserProfile();

      const profile = {
        username: keycloak.profile.username,
        firstName: keycloak.profile.firstName,
        lastName: keycloak.profile.lastName,
        email: keycloak.profile.email
      };

      setAuth({
        keycloak,
        authenticated,
        profile
      });
    };

    login().catch(err => console.log(err));
  }, []);

  useEffect(() => {
    if (auth.keycloak) {
      if (auth.authenticated) {
        dispatch(setLoggedInUser(auth));
      }
    }
  }, [auth]);

  if (auth.keycloak) {
    if (auth.authenticated) {

      return false;
    }

    return <div>Error</div>;
  }

  return <div>Loading...</div>;
};

export default Auth;
