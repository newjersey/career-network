import { useContext } from 'react';
import AnalyticsContext from './AnalyticsContext';

export default function useAnalytics() {
  return useContext(AnalyticsContext);
}
