import React from 'react';
import { Flags } from 'react-feature-flags';
import LandingPage from '../components/home/LandingPage';

import HeroDepricated from '../components/home/HeroDepricated';
import Section from '../components/home/Section';

export default function Index() {
  return (
    <Flags
      authorizedFlags={['landingPage']}
      renderOn={() => <LandingPage />}
      renderOff={() => (
        <Section alt={1}>
          <HeroDepricated />
        </Section>
      )}
    />
  );
}
