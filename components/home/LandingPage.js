import React from 'react';
import Hero from './Hero';
import Welcome from './Welcome';
import Featured from './Featured';
import Conversion from './Conversion';
import Tools from './Tools';
import Quote from './Quote';
import Logos from './Logos';
import Bottom from './Bottom';

function LandingPage() {
  return (
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
  );
}

export default LandingPage;
