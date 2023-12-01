import RouteView from './routes/routes';

import { useState, useEffect } from 'react';

import { UserContext } from './context/AuthContext';

const App = () => {
  const [userData, setUserData] = useState({})

  function getLocalUserData() {
    const token = localStorage.getItem('token');
    const tokenObj = JSON.parse(token);

    setUserData(tokenObj);
  }

  useEffect(() => {
    getLocalUserData();
  }, [])

  return (
    <div className="App">
      <UserContext.Provider value={ {userData, setUserData} }>
        <RouteView/>
      </UserContext.Provider>
    </div>
  );
}


export default App;
