import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

const HeaderFont = '"Public Sans", "Helvetica", "Arial", sans-serif';
const SecondaryMainColor = '#4D840A';

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
      main: SecondaryMainColor,
      dark: '#45770A',
    },
    text: {
      secondary: '#44444f',
      light: '#696974',
    },
    background: {
      default: '#ffffff',
      info: '#f7f8fa',
      dark: '#0c4163',
      header: '#f6faff',
      secondaryHeader: '#fdf8ef',
    },
  },
  typography: {
    fontSize: 14,
    h2: {
      fontFamily: HeaderFont,
      fontSize: '2rem',
      fontWeight: 700,
    },
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
    helperText: {
      fontSize: '0.85rem',
      lineHeight: '1.5em',
    },
  },
  overrides: {
    MuiButton: {
      contained: {
        boxShadow: 'none',
      },
      outlinedPrimary: {
        backgroundColor: 'RGBA(24,129,197,0.06)',
      },
    },
    MuiStepIcon: {
      root: {
        '&$completed': {
          color: SecondaryMainColor,
        },
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
