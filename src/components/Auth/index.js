import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';

import Keycloak from 'keycloak-js';
import keycloakConfig from './keycloak-config';
import {setLoggedInUser} from '../../redux/actions/userActions';
import Loader from '../Loader';
import Routes from '../../routes';
import Theme from '../Theme';

const Auth = () => {
  const [auth, setAuth] = useState({keycloak: null, authenticated: false});
  const dispatch = useDispatch();
  console.log("starting auth process")

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
    dispatch(setLoggedInUser(auth));
  }, [dispatch, auth])

  if (auth.keycloak) {
    if (auth.authenticated) {
      return (
        <Theme>
          <Routes/>
        </Theme>
      );
    }

    return <h1>Error</h1>;
  }

  return <Loader/>;
};

export default Auth;
