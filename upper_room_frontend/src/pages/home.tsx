import { Navbar, Hero, Feature, Contact, Community } from "../components";
const Home = () => {
  return (
    <>
      <Navbar isHome={true} />
      <Hero />
      <Feature />
      <Community />
      <Contact />
    </>
  );
};

export default Home;
