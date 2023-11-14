import { useState, useEffect } from 'react'
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import MainSection from './components/MainSection';
import NavBar from './components/NavBar';
import createTheme from '@mui/material/styles/createTheme';
import { useTheme } from '@mui/material/styles';
import { red, blue } from '@mui/material/colors';
import { CartProvider } from './CartContext';

const theme = createTheme({
  palette: {
    background: {
      light: "#fff",
      dark: "#414141",
    },
    text: {
      light: "#000000",
      dark: "#fff",
    },
    primary: {
      main: red[500],
    },
    secondary: {
      main: blue[500],
    },
  },
});


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

  // const [mode, setMode] = React.useState<PaletteMode>('light');
  // const colorMode = React.useMemo(
  //   () => ({
  //     // The dark mode switch would invoke this method
  //     toggleColorMode: () => {
  //       setMode(() =>
  //         prevMode === 'light' ? 'dark' : 'light',
  //       );
  //     },
  //   }),
  //   [],
  // );

  // // Update the theme only if the mode changes
  // const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (  
    // <ColorModeContext.Provider value={colorMode}>
    <CartProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className='App'>
          <NavBar token={token} setToken={setToken} />
          <MainSection token={token} setToken={setToken}/>
        </div>
      </ThemeProvider>
    </CartProvider>
    // </ColorModeContext.Provider>
  );
}

export default App;
 