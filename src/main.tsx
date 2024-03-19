import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { createTheme, ThemeProvider, Theme, StyledEngineProvider, adaptV4Theme } from "@mui/material/styles";

import './index.css'
declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme { }
}


const theme = createTheme(adaptV4Theme({
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
}));

ReactDOM.createRoot(document.getElementById('root')!).render(
<StyledEngineProvider injectFirst>
    <ThemeProvider theme={theme}>
    <App />
    </ThemeProvider>
  </StyledEngineProvider>,
)
