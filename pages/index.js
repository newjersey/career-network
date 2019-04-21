import Coaching from '../components/home/Coaching'
import Hero from '../components/home/Hero'
import Network from '../components/home/Network'
import Plan from '../components/home/Plan'
import Section from '../components/home/Section'
import Stories from '../components/home/Stories'
import Why from '../components/home/Why'

export default function Index(props) {
  return (
    <div>
      <Section alt><Hero /></Section>
      <Section><Why /></Section>
      <Section alt><Stories /></Section>
      <Section><Plan /></Section>
      <Section><Coaching /></Section>
      <Section alt><Network /></Section>
    </div>
  );
}
