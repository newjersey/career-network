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
    text: {
      secondary: '#44444f',
    },
    background: {
      default: '#f3f3f3',
    },
  },
  typography: {
    fontSize: 14,
    h5: {
      fontFamily: HeaderFont,
      fontWeight: 700,
    },
    subtitle2: {
      textTransform: 'uppercase',
    },
    body2: {
      letterSpacing: 'normal',
      lineHeight: 1.67,
    },
    overline: {
      letterSpacing: 'normal',
      fontSize: '0.6875rem',
    },
  },
  overrides: {
    MuiButton: {
      contained: {
        boxShadow: 'none',
      },
    },
  },
  props: {
    MuiCard: {
      elevation: 0,
    },
  },
});

export default responsiveFontSizes(theme);
