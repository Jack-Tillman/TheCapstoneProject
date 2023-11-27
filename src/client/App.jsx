import { useState, useEffect } from "react";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import MainSection from "./components/MainSection";
import NavBar from "./components/NavBar";
import createTheme from "@mui/material/styles/createTheme";
import { useTheme } from "@mui/material/styles";
import { red, blue } from "@mui/material/colors";
import { CartProvider } from "./CartContext";

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
  const [user, setUser] = useState({});
  const [token, setToken] = useState(null);
  const [admin, setAdmin] = useState(false);
  const userStorage = sessionStorage.getItem("user"); // user info, like name, email 
  const storageToken = sessionStorage.getItem("token"); // string of jwt 
  const localCart = localStorage.getItem("cart"); // string of cart and cart contents
  useEffect(() => {
    async function getStorage(storageToken, userStorage, localCart) {
      if (userStorage) {
        try {
          setToken(storageToken);
          setUser(JSON.parse(userStorage));
          if (userStorage.admin) {
            setAdmin(true);
          } else {
            setAdmin(false);
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
    getStorage(storageToken, userStorage, localCart);
  }, [storageToken]);

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
        <div className="App">
          <NavBar
            token={token}
            setToken={setToken}
            admin={admin}
            setAdmin={setAdmin}
            user={user}
            setUser={setUser}
          />
          <MainSection
            token={token}
            setToken={setToken}
            admin={admin}
            setAdmin={setAdmin}
            user={user}
            setUser={setUser}
          />
        </div>
      </ThemeProvider>
    </CartProvider>
    // </ColorModeContext.Provider>
  );
}

export default App;
