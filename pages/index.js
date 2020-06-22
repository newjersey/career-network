import React from 'react';

import Hero from '../components/home/Hero';
import Welcome from '../components/home/Welcome';
import Featured from '../components/home/Featured';
import Conversion from '../components/home/Conversion';
import Tools from '../components/home/Tools';
import Quote from '../components/home/Quote';
import Logos from '../components/home/Logos';
import Bottom from '../components/home/Bottom';

export default function Index() {
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
