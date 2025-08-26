import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Welcome from "./pages/Welcome";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Welcome />} />
    <Route path="/welcome" element={<Welcome />} />
    <Route path="/home" element={<Home />} />
    {/* Outras rotas aqui */}
  </Routes>
);

export default AppRoutes;