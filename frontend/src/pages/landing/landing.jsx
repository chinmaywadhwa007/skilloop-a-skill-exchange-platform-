import Navbar from "../../components/navbar/navbar";
import Hero from "../../components/hero/hero";
import Stats from "../../components/states/states";
import Features from "../../components/features/feature";
import CTA from "../../components/CTA/CTA";
const Landing = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Stats />
      <Features />
      <CTA />
    </>
  );
};

export default Landing;