import React from 'react';
import { fireEvent, wait } from '@testing-library/react';
import Router from 'next/router';

import renderWrapped from '../../support/helpers';
import Nav from '../../../components/header/Nav';

Router.router = { push: jest.fn().mockRejectedValue(), prefetch: jest.fn().mockRejectedValue };

describe('<Nav />', () => {
  it('displays the help modal', async () => {
    const { getByText } = renderWrapped(<Nav onSignOut={jest.fn} />);

    fireEvent.click(getByText(/Help/i));

    await wait(() => {
      getByText('Please email us with any questions or feedback:');
      getByText('careers@gardenstate.tech');
    });
  });
});
