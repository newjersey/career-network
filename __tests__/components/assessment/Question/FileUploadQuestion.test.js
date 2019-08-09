import React from 'react';
import { fireEvent, wait } from '@testing-library/react';

import { renderWrapped } from '../../../support/helpers';
import * as factories from '../../../support/factories';
import FileUploadQuestion from '../../../../components/assessment/Question/FileUploadQuestion';

let mockUpload = jest.fn();
const mockRemove = jest.fn();
jest.mock('../../../../components/Firebase/useStorage', () => ({
  __esModule: true,
  default: () => ({
    upload: mockUpload,
    remove: mockRemove,
  }),
}));

describe('<FileUploadQuestion />', () => {
  const props = {
    question: factories.fileQuestion(),
    value: undefined,
  };

  it('displays the name and helper text', () => {
    const { getByText } = renderWrapped(<FileUploadQuestion {...props} />);

    getByText('A list of target companies');
    getByText('Short list of companies you want to work at');
  });

  it('uploads the file and updates the UI when complete', async () => {
    mockUpload = jest
      .fn()
      .mockResolvedValue({ ref: { fullPath: 'assessments/TEST-USER-1/testFile.txt' } });
    const { getByText, getByTestId } = renderWrapped(<FileUploadQuestion {...props} />);

    fireEvent.change(getByTestId('fileInput'), { target: { files: [factories.textFile()] } });

    await wait(() => {
      expect(mockUpload).toHaveBeenCalledWith(
        factories.textFile(),
        expect.stringMatching(/assessments\/TEST-USER-/),
      );
      getByText('testFile.txt');
      getByText('Remove');
    });
  });

  it('removes the current file and restores the UI to its initial state', async () => {
    const { getByText } = renderWrapped(
      <FileUploadQuestion {...props} value="assessments/TEST-USER-1/testFile.txt" />,
    );

    fireEvent.click(getByText('Remove'));

    await wait(() => {
      expect(mockRemove).toHaveBeenCalledWith('assessments/TEST-USER-1/testFile.txt');
      getByText('A list of target companies');
      getByText('Short list of companies you want to work at');
      getByText('Upload');
    });
  });

  it('displays a notification when an upload error happens', async () => {
    mockUpload = jest.fn().mockRejectedValue('Upload error');
    const { getByTestId, setSnackbarMessage } = renderWrapped(<FileUploadQuestion {...props} />);

    fireEvent.change(getByTestId('fileInput'), { target: { files: [factories.textFile()] } });
    await wait(() => {
      expect(setSnackbarMessage).toHaveBeenCalledWith("File 'testFile.txt' could not be uploaded.");
    });
  });
});
