import { useState, useEffect } from 'react'
import { ThemeProvider } from '@mui/material';
import MainSection from './components/MainSection';
import NavBar from './components/NavBar';
import createTheme from '@mui/material/styles/createTheme';
import { useTheme } from '@mui/material/styles';
import { red, purple } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: red[500],
    },
    secondary: {
      main: purple[500],
    },
  },
});

// const getDesignTokens = (mode: PaletteMode) => ({
//   palette: {
//     mode,
//     ...(mode === 'light'
//       ? {
//           // palette values for light mode
//           primary: amber,
//           divider: amber[200],
//           text: {
//             primary: grey[900],
//             secondary: grey[800],
//           },
//         }
//       : {
//           // palette values for dark mode
//           primary: deepOrange,
//           divider: deepOrange[700],
//           background: {
//             default: deepOrange[900],
//             paper: deepOrange[900],
//           },
//           text: {
//             primary: '#fff',
//             secondary: grey[500],
//           },
//         }),
//   },
// });


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
  //       setMode((prevMode: PaletteMode) =>
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
      <ThemeProvider theme={theme}>    
        <div className='App'>
          <NavBar token={token} setToken={setToken} />

          <MainSection token={token} setToken={setToken} />
        </div>
      </ThemeProvider>
    // </ColorModeContext.Provider>
  );
}

export default App;
 