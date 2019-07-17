import '@testing-library/jest-dom/extend-expect';
import '@testing-library/react/cleanup-after-each';
import { clearFirestoreData } from '@firebase/testing';

afterEach(async () => {
  await clearFirestoreData({
    projectId: 'nj-carrer-network-test',
  });
});
