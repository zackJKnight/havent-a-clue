import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { createTheme, ThemeProvider as MuiThemeProvider, StyledEngineProvider } from "@mui/material/styles";
import { ThemeProvider as StylesThemeProvider } from '@mui/styles';

import './index.css'



const theme = createTheme({
  palette: {
    primary: {
      light: '#fff',
      main: '#388e3c',
      dark: '#000'
    },
    secondary: {
      main: '#fbe92d',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    h3: {
      margin: '3rem',
      fontSize: 20,
      '@media (min-width:600px)': {
        fontSize: 20,
      }
    },
    caption: {
      fontSize: 8,
    },
  }
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StyledEngineProvider injectFirst>
    <MuiThemeProvider theme={theme}>
      <StylesThemeProvider theme={theme}>
        <App />
      </StylesThemeProvider>
    </MuiThemeProvider>
  </StyledEngineProvider>,
)
