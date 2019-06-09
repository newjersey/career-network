import React from 'react';

import Coaching from '../components/home/Coaching';
import Goals from '../components/home/Goals';
import Hero from '../components/home/Hero';
import Network from '../components/home/Network';
import Plan from '../components/home/Plan';
import Resources from '../components/home/Resources';
import Section from '../components/home/Section';
import Stories from '../components/home/Stories';
import Why from '../components/home/Why';

export default function Index() {
  return (
    <div>
      <Section alt={1}><Hero /></Section>
      <Section><Why /></Section>
      <Section alt={2}><Stories /></Section>
      <Section hasOwnPadding="bottom"><Plan /></Section>
      <Section hasOwnPadding="top"><Coaching /></Section>
      <Section alt={2}><Network /></Section>
      <Section hasOwnPadding="bottom" alt={3}><Resources /></Section>
      <Section alt={4}><Goals /></Section>
    </div>
  );
}
