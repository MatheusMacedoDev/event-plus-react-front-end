import RouteView from './routes';

import { useState, useEffect } from 'react';

import { UserContext } from './context/AuthContext';

const App = () => {
  const [userData, setUserData] = useState({})

  return (
    <div className="App">
      <UserContext.Provider value={ {userData, setUserData} }>
        <RouteView/>
      </UserContext.Provider>
    </div>
  );
}


export default App;
