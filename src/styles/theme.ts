import {createTheme, Theme, ThemeOptions} from '@mui/material/styles';

const darkTheme: ThemeOptions = {
  palette: {
    mode: 'dark',
    background: {
      default: '#5a50a0',
      paper: '#222222',
    },
    text: {
      primary: '#ffffff',
      secondary: '#ffffff',
    },
    primary: {
      light: '#5a50a0',
      main: '#8787b4',
      dark: '#5a50a0',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
    action: {
      active: '#b1b0d8',
      selected: '#ff0000',
    },
  },
};

const theme: Theme = createTheme(darkTheme);

export {theme};
