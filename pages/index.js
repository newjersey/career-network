import React from 'react';

// import Hero from '../components/home/Hero';
// import Section from '../components/home/Section';
import Featured from '../components/home/Featured';
import Tools from '../components/home/Tools';
import Logos from '../components/home/Logos';

import { toolItems } from '../components/home/content/ToolsContent';
import { featuredItems } from '../components/home/content/FeaturedContent';
import { logoItems } from '../components/home/content/LogoContent';

export default function Index() {
  return (
    <div>
      <Featured featuredContent={featuredItems.slice(0, featuredItems.length - 1)} />
      <Tools toolsContent={toolItems} />
      <Logos logoContent={logoItems} />
      <Featured featuredContent={featuredItems.slice(featuredItems.length - 1)} />
      {/*
      <Section alt={1}>
        <Hero />
      </Section>
      */}
    </div>
  );
}
