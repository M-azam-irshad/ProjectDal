import ProjectDalHomepage from "../components/HomePage.jsx";
import FeaturedCards from "../components/FeaturedCards.jsx";
import cardList from "../components/cardList.jsx";
import AdditionComponent from "../components/AdditionComponent.jsx";
import ProjectUploader from "../components/ProjectUploader.jsx";
import { useEffect, useState } from "react";
import Lenis from "@studio-freight/lenis";
import FeedbackAdditionComponent from "../components/FeedbackAdditionComponent.jsx";

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
        <ProjectUploader />
      ) : (
        <div>
          <ProjectDalHomepage />
          <FeaturedCards cardList={cardList} />
          <AdditionComponent prop={setUploaderState} />
          <FeedbackAdditionComponent />
        </div>
      )}
   
  

    </>
  );
}

export default App;
