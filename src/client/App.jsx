import { useState, useEffect } from 'react'
import MainSection from './components/MainSection';
import NavBar from './components/NavBar';

function App() {

  const [token, setToken] = useState(null);
  const storageToken = sessionStorage.getItem("token")

  useEffect(() => {
    async function getToken(storageToken) {
      if (storageToken) {
        setToken(storageToken);
      } else {
        return;
      }      
    }
    getToken(storageToken);
  },[token, storageToken]);

  return (
    <div className='App'>
        <NavBar token={token} setToken={setToken} />

        <MainSection token={token} setToken={setToken} />
    </div>
  );
}

export default App;
