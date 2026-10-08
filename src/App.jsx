import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header.jsx";

import Home from "./pages/Home.jsx";
import Resume from "./pages/Resume.jsx";
import Contato from "./pages/Contato.jsx";
import Dados from "./pages/Dados.jsx";

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/resume" element={<Resume />} />

        <Route path="/contate" element={<Contato />} />

        <Route path="/dados" element={<Dados />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
