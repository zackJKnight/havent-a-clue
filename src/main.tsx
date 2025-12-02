import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ThemeProvider as MuiThemeProvider, StyledEngineProvider } from "@mui/material/styles";
import { ThemeProvider as StylesThemeProvider } from '@mui/styles';

import './index.css'
import { ThemeModeProvider, useThemeMode } from './context/ThemeModeContext.tsx';
import { useEffect } from 'react';

const ThemeBridge = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useThemeMode();
  useEffect(() => {
    document.body.style.backgroundColor = theme.palette.background.default;
    document.body.style.color = theme.palette.text.primary as string;
    document.documentElement.setAttribute('data-color-scheme', theme.palette.mode);
    return () => {
      document.documentElement.removeAttribute('data-color-scheme');
    };
  }, [theme]);
  return (
    <MuiThemeProvider theme={theme}>
      <StylesThemeProvider theme={theme}>
        {children}
      </StylesThemeProvider>
    </MuiThemeProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StyledEngineProvider injectFirst>
    <ThemeModeProvider>
      <ThemeBridge>
        <App />
      </ThemeBridge>
    </ThemeModeProvider>
  </StyledEngineProvider>,
)
