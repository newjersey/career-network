import React from 'react';
import { render } from '@testing-library/react';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import theme from '../../src/theme';
import AuthContext from '../../components/Auth/AuthContext';
import * as factories from './factories';

/**
 * Renders a component with all the necessary top-level providers
 */
export default function renderWrapped(component) {
  const auth = factories.auth();
  const renderResult = render(
    <ThemeProvider theme={theme}>
      <AuthContext.Provider value={auth}>{component}</AuthContext.Provider>
    </ThemeProvider>,
  );

  return {
    auth,
    ...renderResult,
  };
}
