import React from 'react';
import { render } from '@testing-library/react';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import theme from '../../src/theme';
import AuthContext from '../../components/Auth/AuthContext';
import * as factories from './factories';
import SnackbarContext from '../../components/Snackbar/SnackbarContext';

/**
 * Renders a component with all the necessary top-level providers
 */
export function renderWrapped(component) {
  const auth = factories.auth();
  const setSnackbarMessage = jest.fn();

  const renderResult = render(
    <ThemeProvider theme={theme}>
      <AuthContext.Provider value={auth}>
        <SnackbarContext.Provider value={setSnackbarMessage}>{component}</SnackbarContext.Provider>
      </AuthContext.Provider>
    </ThemeProvider>,
  );

  return {
    auth,
    setSnackbarMessage,
    ...renderResult,
  };
}
