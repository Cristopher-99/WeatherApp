import React from 'react';

import { ThemeOptions, ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import StyledEngineProvider from '@mui/material/StyledEngineProvider';

import { useCustomSelector } from '../hooks/redux';

interface Props {
  children: React.ReactNode;
}

declare module '@mui/material/styles' {
  interface CustomTheme {
    buttons?: {
      standard?: {
        height: string,
        width: string
      }
    }
  }
  interface Theme extends CustomTheme {}
  interface ThemeOptions extends CustomTheme {}
}

const MuiThemeProvider: React.FC<Props> = ({ children }) => {
  const { themeMode } = useCustomSelector((state) => state.settings);

  const isLight = themeMode === 'light';

  const theme = createTheme({
    palette: {
      primary: {
        main: '#651fff' // todos con rgb
      },
      mode: isLight ? 'light' : 'dark'
    },
    buttons:{
      standard:{
        height: '30px',
        width: '100px'
      }
    }
  });

  return (
    <StyledEngineProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default MuiThemeProvider;
