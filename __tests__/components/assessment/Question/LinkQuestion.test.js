import React from 'react';
import { fireEvent } from '@testing-library/react';

import { renderWrapped } from '../../../support/helpers';
import * as factories from '../../../support/factories';
import LinkQuestion from '../../../../components/assessment/Question/LinkQuestion';

describe('<LinkQuestion />', () => {
  const testLink = 'http://example.com';
  const props = {
    onChange: jest.fn(),
    question: factories.linkQuestion(),
    value: '',
  };

  it('displays the name and helper text', () => {
    const { getByText } = renderWrapped(<LinkQuestion {...props} />);

    getByText('LinkedIn profile');
    getByText('Professional page for you to create your personal brand');
  });

  it('stores the link and updates the UI', async () => {
    const { getByText, getByTestId } = renderWrapped(<LinkQuestion {...props} />);

    fireEvent.click(getByText('Add Link'));
    fireEvent.change(getByTestId('linkInput'), { target: { value: testLink } });
    fireEvent.click(getByText('Add'));

    getByText(testLink);
    getByText('Remove');
    expect(props.onChange).toHaveBeenCalledWith(testLink);
    expect(getByTestId('linkInput').value).toEqual(testLink);
  });

  it('removes the current link and restores the UI to its initial state', async () => {
    const { getByText } = renderWrapped(<LinkQuestion {...props} value={testLink} />);

    fireEvent.click(getByText('Remove'));

    getByText('Add Link');
    expect(props.onChange).toHaveBeenCalledWith('');
  });
});
