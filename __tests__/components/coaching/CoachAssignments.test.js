import React from 'react';
import { fireEvent, wait } from '@testing-library/react';
import firebase from 'firebase';

import { renderWrapped } from '../../support/helpers';
import * as factories from '../../support/factories';
import CoachAssignments from '../../../components/coaching/CoachAssignments';

const allJobSeekers = [
  factories.user({ isCoach: false }),
  factories.user({
    authProfile: {
      ...factories.authProfile(),
      // eslint-disable-next-line sonarjs/no-duplicate-string
      displayName: 'Adam Mitchell',
      // eslint-disable-next-line sonarjs/no-duplicate-string
      email: 'adam@example.org',
    },
    isCoach: false,
  }),
];

const allCoaches = [
  factories.user({
    authProfile: {
      ...factories.authProfile(),
      displayName: 'Martha Jones',
      email: 'martha@example.org',
    },
    assignments: [allJobSeekers[1].uid],
    isCoach: true,
  }),
  factories.user({
    authProfile: {
      ...factories.authProfile(),
      displayName: 'Rose Tyler',
      email: 'rose@example.org',
    },
    assignments: [allJobSeekers[0].uid],
    isCoach: true,
  }),
];

const mockUpdateUser = jest.fn();
jest.mock('../../../components/Firebase/useUser', () => ({
  __esModule: true,
  default: () => ({ updateUser: mockUpdateUser }),
}));

describe('<CoachAssignments />', () => {
  const props = {
    allCoaches,
    allJobSeekers,
  };

  it('displays the initial message', () => {
    const { getByText } = renderWrapped(<CoachAssignments {...props} />);

    getByText('Click one of the coaches on the left to assign the job seekers');
  });

  it('renders the coaches', async () => {
    const { getByText } = renderWrapped(<CoachAssignments {...props} />);

    getByText('Martha Jones');
    getByText('martha@example.org');
    getByText('Rose Tyler');
    getByText('rose@example.org');
  });

  it('renders the assigned job seekers when each coach is selected', async () => {
    const { getByText, getByTestId } = renderWrapped(<CoachAssignments {...props} />);

    fireEvent.click(getByText(/Martha Jones/i));

    await wait(() => {
      getByText('Adam Mitchell');
      getByText('adam@example.org');
      expect(getByTestId(allJobSeekers[0].uid).checked).toEqual(false);
      expect(getByTestId(allJobSeekers[1].uid).checked).toEqual(true);
    });

    fireEvent.click(getByText(/Rose Tyler/i));

    await wait(() => {
      getByText('Donna Noble');
      getByText('donna@example.org');
      expect(getByTestId(allJobSeekers[0].uid).checked).toEqual(true);
      expect(getByTestId(allJobSeekers[1].uid).checked).toEqual(false);
    });
  });

  it('filters job seekers to display only the assigned ones', async () => {
    const { getByText, getByTestId, queryByText } = renderWrapped(<CoachAssignments {...props} />);

    fireEvent.click(getByText(/Martha Jones/i));
    fireEvent.click(getByTestId('jobSeekersSwitch'));

    await wait(() => {
      getByText('Adam Mitchell');
      getByText('adam@example.org');
      expect(queryByText('Donna Noble')).not.toBeInTheDocument();
      expect(queryByText('donna@example.org')).not.toBeInTheDocument();
    });
  });

  it('assigns a job seeker', async () => {
    const { getByText, getByTestId } = renderWrapped(<CoachAssignments {...props} />);

    fireEvent.click(getByText(/Martha Jones/i));
    fireEvent.click(getByTestId(allJobSeekers[0].uid));

    await wait(() => {
      expect(mockUpdateUser).toHaveBeenCalledWith(allCoaches[0].uid, {
        assignments: firebase.firestore.FieldValue.arrayUnion(allJobSeekers[0].uid),
      });
    });
  });

  it('removes a job seeker', async () => {
    const { getByText, getByTestId } = renderWrapped(<CoachAssignments {...props} />);

    fireEvent.click(getByText(/Rose Tyler/i));
    fireEvent.click(getByTestId(allJobSeekers[0].uid));

    await wait(() => {
      expect(mockUpdateUser).toHaveBeenCalledWith(allCoaches[1].uid, {
        assignments: firebase.firestore.FieldValue.arrayRemove(allJobSeekers[0].uid),
      });
    });
  });
});
