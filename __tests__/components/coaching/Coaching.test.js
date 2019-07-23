import React from 'react';
import { fireEvent, wait } from '@testing-library/react';

import { renderWrapped } from '../../support/helpers';
import * as factories from '../../support/factories';
import Coaching from '../../../components/coaching/Coaching';

describe('<Coaching />', () => {
  const props = {
    assessmentSections: factories.assessmentSections(),
    assignments: factories.coachAssignments(),
  };

  it('displays the initial message', () => {
    const { getByText } = renderWrapped(<Coaching {...props} />);

    getByText('Click one of your assigned job seekers on the left to display the responses');
  });

  it('displays the assigned user profiles', async () => {
    const { getByText } = renderWrapped(<Coaching {...props} />);

    getByText('Donna Noble');
    getByText('donna@example.org');
    getByText('Adam Mitchell');
    getByText('adam@example.org');
  });

  it('renders the assessment sections', async () => {
    const { getByText } = renderWrapped(<Coaching {...props} />);

    fireEvent.click(getByText(/Donna Noble/i));

    await wait(() => {
      getByText('About you');
      getByText('Your past');
    });
  });

  it('renders the user responses when selected', async () => {
    const { getByText } = renderWrapped(<Coaching {...props} />);

    fireEvent.click(getByText(/Donna Noble/i));

    await wait(() => {
      getByText('Unemployment Insurance');
      getByText('No');
    });

    fireEvent.click(getByText(/Adam Mitchell/i));

    await wait(() => {
      getByText('Target jobs');
      getByText('School Operations Manager');
    });
  });
});
