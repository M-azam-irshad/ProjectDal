import ProjectDalHomepage from "../components/HomePage.jsx";
import FeaturedCards from "../components/FeaturedCards.jsx";
import cardList from "../components/cardList.jsx";
import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

function App() {
  useEffect(() => {
    const lenis = new Lenis({
  duration: 0.6,       // faster response (default ~1.2)
  lerp: 0.25,          // less smoothing, more direct (default ~0.1)
  smoothWheel: true,   // ensure mouse wheel smoothing
  wheelMultiplier: 1.4 // stronger wheel sensitivity
    });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  return (
    <>
      <ProjectDalHomepage />
      <FeaturedCards cardList={cardList} />
    </>
  );
}

export default App;
