import "./App.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import LandingPages from "./pages/PublicPages/LandingPages";
import Explore from "./pages/PublicPages/Explore";
import CreateSnippet from "./pages/PublicPages/CreateSnippet";

function App() {
  return (
    <>
      <Navbar />


      <Routes>
        <Route path="/" element={<LandingPages />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/create" element={<CreateSnippet />} />
      </Routes>
    </>
  );
}

export default App;
