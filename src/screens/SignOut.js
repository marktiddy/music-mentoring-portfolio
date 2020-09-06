import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { MainContext } from '../Context/MainContext';
import firebase from '../data/keys';

const SignOut = () => {
  const history = useHistory();
  const { setCurrentUser, setCurrentUserType } = useContext(MainContext);

  firebase
    .auth()
    .signOut()
    .then(() => {
      setCurrentUser(null);
      setCurrentUserType(null);
      localStorage.removeItem('userType');
      localStorage.removeItem('timeSaved');
      localStorage.removeItem('user');
      localStorage.removeItem('userStyle');
      //Remove student specific entities
      localStorage.removeItem('friendlyname');
      localStorage.removeItem('studentusername');
    })
    .then(() => history.push('/'))
    .catch((e) => console.log('problem signing out'));

  return <></>;
};

export default SignOut;
