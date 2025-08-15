import ProjectDalHomepage  from "../components/HomePage.jsx";
import FeaturedCards from "../components/FeaturedCards.jsx";
import cardList from "../components/cardList.jsx";


function App() {
  return (
    <>
      <ProjectDalHomepage />
      <FeaturedCards cardList={cardList} />
    </>
  );
}

export default App;