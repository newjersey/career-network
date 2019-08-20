import React from 'react';
import { wait } from '@testing-library/react';

import { renderInTable } from '../../support/helpers';
import * as factories from '../../support/factories';
import ResponseValue from '../../../components/coaching/ResponseValue';

jest.mock('../../../components/Firebase/useStorage', () => ({
  __esModule: true,
  default: () => ({ download: jest.fn().mockResolvedValue('http://google.example.com/download') }),
}));

describe('<ResponseValue />', () => {
  it('renders an option response', () => {
    const { getByText } = renderInTable(<ResponseValue response={factories.optionResponse()} />);

    getByText('Full time');
  });

  it('renders a binary response', () => {
    const { getByText } = renderInTable(<ResponseValue response={factories.binaryResponse()} />);

    getByText('No');
  });

  it('renders a date response', () => {
    const { getByText } = renderInTable(<ResponseValue response={factories.dateResponse()} />);

    getByText('01/01/2019');
  });

  it('renders a text response', () => {
    const { getByText } = renderInTable(<ResponseValue response={factories.textResponse()} />);

    getByText('School Operations Manager');
  });

  it('renders a link response', () => {
    const { getByText } = renderInTable(<ResponseValue response={factories.linkResponse()} />);

    expect(getByText('http://example.com/link').href).toEqual('http://example.com/link');
  });

  it('renders a file response', async () => {
    const { getByText } = renderInTable(<ResponseValue response={factories.fileResponse()} />);

    getByText('testFile.txt');
    await wait(() => (
      expect(getByText('testFile.txt').href).toEqual('http://google.example.com/download')
    ));
  });
});
