import React, { useState, useEffect } from 'react';

//import * as portfolio_data from '../data/portfolio_questions.json';

export const MainContext = React.createContext();

export const MainProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentUserType, setCurrentUserType] = useState(null); //Null by default / admin // student
  const [currentStudent, setCurrentStudent] = useState(null);

  useEffect(() => {
    //Check for local storage
    const localUser = localStorage.getItem('user');
    const localUserType = localStorage.getItem('userType');
    const localStorageTime = localStorage.getItem('timeSaved');
    if (localUser && localUserType && localStorageTime) {
      const today = new Date();

      //We have local storage...let's check how old they are

      if (today - localStorageTime > 604800000) {
        //We have an old date/time
        localStorage.removeItem('user');
        localStorage.removeItem('userType');
        localStorage.removeItem('timeSaved');
      } else {
        //Set our state from it
        const pUser = JSON.parse(localUser);
        setCurrentUser(pUser);
        setCurrentUserType(localUserType);
      }
    }
  }, []);

  return (
    <MainContext.Provider
      value={{
        error,
        setError,
        setCurrentUser,
        currentUser,
        currentUserType,
        setCurrentUserType,

        currentStudent,
        setCurrentStudent,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export const MainConsumer = MainContext.Consumer;
