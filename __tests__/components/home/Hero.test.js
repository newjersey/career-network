import React from 'react';
import { fireEvent, wait } from '@testing-library/react';

import Hero from '../../../components/home/Hero';
import renderWrapped from '../../support/helpers';

describe('<Hero />', () => {
  it('renders the title', () => {
    const { getByText } = renderWrapped(<Hero />);

    getByText('We’ll guide you from start to finish');
  });

  it('displays the sign in form', async () => {
    const { auth, getByText } = renderWrapped(<Hero />);

    fireEvent.click(getByText(/Get Started Today/i));

    await wait(() => expect(auth.showSignIn).toHaveBeenCalled());
  });
});
