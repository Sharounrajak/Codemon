import "./App.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import LandingPages from "./pages/PublicPages/LandingPages";
import Explore from "./pages/PublicPages/Explore";
import CreateSnippet from "./pages/PrivatePages/CreateSnippet";
import UserProfile from "./pages/PrivatePages/UserProfile";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<LandingPages />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/create" element={<CreateSnippet />} />
        <Route path="/UserProfile" element={<UserProfile />} />
      </Routes>
    </>
  );
}

export default App;
