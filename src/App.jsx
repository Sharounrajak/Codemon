import "./App.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import LandingPages from "./pages/PublicPages/LandingPages";
import Explore from "./pages/PublicPages/Explore";
import CreateSnippet from "./pages/PrivatePages/CreateSnippet";
import MySnippet from "./pages/PrivatePages/Mysnippet";

function App() {
  return (
    <>
      <Navbar />


      <Routes>
        <Route path="/" element={<LandingPages />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/create" element={<CreateSnippet />} />
        <Route path="/mysnippet" element={<MySnippet />} />
      </Routes>
    </>
  );
}

export default App;
