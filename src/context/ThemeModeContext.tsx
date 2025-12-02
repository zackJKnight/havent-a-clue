import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";
import { createTheme, Theme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

type ThemeMode = 'light' | 'dark' | 'system';

type ThemeModeContextValue = {
  mode: ThemeMode;
  effectiveMode: 'light' | 'dark';
  theme: Theme;
  setMode: (mode: ThemeMode) => void;
  cycleMode: () => void;
};

const STORAGE_KEY = 'theme-mode';
const ThemeModeContext = createContext<ThemeModeContextValue | undefined>(undefined);

const loadMode = (): ThemeMode => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY) as ThemeMode | null;
    if (stored === 'light' || stored === 'dark' || stored === 'system') return stored;
  } catch {
    /* ignore storage errors */
  }
  return 'system';
};

const baseTypography = {
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
    margin: '1.4rem 0 0.8rem',
    fontSize: 20,
    '@media (min-width:600px)': {
      fontSize: 20,
    }
  },
  caption: {
    fontSize: 8,
  },
};

const buildTheme = (mode: 'light' | 'dark') => createTheme({
  palette: {
    mode,
    primary: {
      light: mode === 'light' ? '#6fcf97' : '#8bc34a',
      main: mode === 'light' ? '#2e7d32' : '#7cb342',
      dark: '#0f3d12'
    },
    secondary: {
      main: mode === 'light' ? '#f2c94c' : '#fdd835',
    },
    background: {
      default: mode === 'light' ? '#f6f7fb' : '#0f172a',
      paper: mode === 'light' ? '#ffffff' : '#111827'
    }
  },
  typography: baseTypography
});

export const ThemeModeProvider = ({ children }: { children: ReactNode }) => {
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setMode] = useState<ThemeMode>(loadMode);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, mode);
    } catch {
      /* ignore storage errors */
    }
  }, [mode]);

  const effectiveMode = mode === 'system' ? (prefersDark ? 'dark' : 'light') : mode;
  const theme = useMemo(() => buildTheme(effectiveMode), [effectiveMode]);

  const cycleMode = () => {
    setMode((current) => current === 'system' ? 'light' : current === 'light' ? 'dark' : 'system');
  };

  return (
    <ThemeModeContext.Provider value={{ mode, effectiveMode, theme, setMode, cycleMode }}>
      {children}
    </ThemeModeContext.Provider>
  );
};

export const useThemeMode = () => {
  const ctx = useContext(ThemeModeContext);
  if (!ctx) throw new Error('useThemeMode must be used within ThemeModeProvider');
  return ctx;
};
