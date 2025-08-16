import ProjectDalHomepage from "../components/HomePage.jsx";
import FeaturedCards from "../components/FeaturedCards.jsx";
import cardList from "../components/cardList.jsx";
import AddProject from "../components/AddProject.jsx";
import ProjectUploader from "../components/ProjectUploader.jsx";
import { useEffect, useState } from "react";
import Lenis from "@studio-freight/lenis";

function App() {
  const [uploaderState, setUploaderState] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.6,       // faster response
      lerp: 0.25,          // less smoothing
      smoothWheel: true,   // mouse wheel smoothing
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
      {uploaderState ? (
        // If true, show uploader
        <ProjectUploader />
      ) : (
        // If false, show the other three
        <div>
          <ProjectDalHomepage />
          <FeaturedCards cardList={cardList} />
          {/* Pass the setter so AddProject can toggle it */}
          <AddProject prop={setUploaderState} />
        </div>
      )}
    </>
  );
}

export default App;
