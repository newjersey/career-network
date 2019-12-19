import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

const HeaderFont = 'Public Sans';

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
  typography: {
    fontSize: 12,
    h5: {
      fontFamily: HeaderFont,
      fontWeight: 700,
    },
    subtitle2: {
      textTransform: 'uppercase',
    },
  },
});

export default responsiveFontSizes(theme);
