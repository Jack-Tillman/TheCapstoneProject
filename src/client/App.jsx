import { ThemeProvider } from '@mui/material';
import MainSection from './components/MainSection';
import NavBar from './components/NavBar';
import createTheme from '@mui/material/styles/createTheme';
import { light } from '@mui/material/styles/createPalette';
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


function App() {
  return (
    <ThemeProvider theme={theme}>    
      <div className='App'>
        <NavBar />

        <MainSection />
      </div>
    </ThemeProvider>

  );
}

export default App;
 