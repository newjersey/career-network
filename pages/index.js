import React from 'react';
import { Flags } from 'react-feature-flags';

import Hero from '../components/home/Hero';
import Welcome from '../components/home/Welcome';
import Featured from '../components/home/Featured';
import Conversion from '../components/home/Conversion';
import Tools from '../components/home/Tools';
import Quote from '../components/home/Quote';
import Logos from '../components/home/Logos';
import Bottom from '../components/home/Bottom';

import Hero2 from '../components/home/Hero2';
import Section from '../components/home/Section';

export default function Index() {
  return (
    <Flags
      authorizedFlags={['landingPage']}
      renderOn={() => (
        <div>
          <Hero />
          <Welcome />
          <Featured />
          <Conversion />
          <Tools />
          <Quote />
          <Logos />
          <Bottom />
        </div>
      )}
      renderOff={() => (
        <Section alt={1}>
          <Hero2 />
        </Section>
      )}
    />
  );
}
