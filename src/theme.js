import { createMuiTheme } from '@material-ui/core/styles';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#1982C8',
      main: '#1777B6',
      dark: '#156BA4',
    },
    secondary: {
      light: '#54910B',
      main: '#4D840A',
      dark: '#45770A',
    },
  },
});

export default theme;
