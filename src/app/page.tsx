import Contact from "./pageFragments/Contact";
import Events from "./pageFragments/Events";
import Hero from "./pageFragments/Hero";
import Join from "./pageFragments/Join";
import Members from "./pageFragments/Members";
import Mission from "./pageFragments/Mission";

export default function Home() {
  return (
    <main>
      <Hero />
      <Mission />
      <Events />
      <Members />
      <Join />
      <Contact />
    </main>
  );
}
