import "./App.css";
import Header from "./components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Welcome from "./pages/Welcome";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="container mt-5">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/home" element={<Home />} />

          {/* Outras rotas aqui */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
