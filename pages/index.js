import React from 'react';

import Hero from '../components/home/Hero';
import Section from '../components/home/Section';

export default function Index() {
  return (
    <div>
      <Section alt={1}>
        <Hero />
      </Section>
    </div>
  );
}
