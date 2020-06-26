import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

const HeaderFont = '"Inter", "Helvetica", "Arial", sans-serif';
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
      linkedIn: '#2867b2',
    },
    grey: {
      900: '#171719',
    },
    navy: {
      200: '#177DBE',
      500: '#062335',
      primary: '#125F90',
    },
  },
  typography: {
    fontSize: 14,
    h1: {
      fontFamily: HeaderFont,
      fontSize: '3rem',
      fontWeight: 400,
    },
    h2: {
      fontFamily: HeaderFont,
      fontSize: '2rem',
      fontWeight: 500,
    },
    h3: {
      fontFamily: HeaderFont,
      fontSize: '1.5rem',
      fontWeight: 500,
    },
    h5: {
      fontFamily: HeaderFont,
      fontSize: 16,
      letterSpacing: '0.0075em',
      fontWeight: 600,
    },
    h6: {
      fontFamily: HeaderFont,
      fontWeight: 700,
      fontSize: '1rem',
    },
    h7: {
      fontFamily: HeaderFont,
      fontWeight: 500,
      fontSize: '0.857rem',
      lineHeight: 1.14,
    },
    subtitle2: {
      textTransform: 'uppercase',
    },
    body1: {
      // UPDATED UNTIL TYPOGRAPHY EXTENDED FO BODY4
      fontSize: '1rem',
      lineHeight: 1.57,
    },
    body2: {
      fontSize: '1.125rem',
      letterSpacing: 'normal',
      lineHeight: 1.67,
    },
    body4: {
      fontSize: '1rem',
      lineHeight: 1.57,
    },
    body5: {
      fontSize: 12,
      lineHeight: '18px',
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
