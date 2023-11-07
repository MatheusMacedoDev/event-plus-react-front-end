import RouteView from './routes';

import { useState, useEffect } from 'react';

const App = () => {
  const [windowSize, setWindowSize] = useState(getWindowSize()) 

  useEffect(() => {
    const handleWindowSize = () => {
      setWindowSize(getWindowSize());
    };

    window.addEventListener('resize', handleWindowSize);

    return () => {
      window.removeEventListener('resize', handleWindowSize);
    }
  }, [])

  return (
    <div className="App">
      <RouteView/>
    </div>
  );
}

function getWindowSize() {
  const {innerWidth, innerHeight} = window;
  return {innerWidth, innerHeight};
}


export default App;
