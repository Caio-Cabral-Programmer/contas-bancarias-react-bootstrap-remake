import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

const Home = lazy(() => import("./pages/Home"));
const Welcome = lazy(() => import("./pages/Welcome"));
const Create = lazy(() => import("./pages/Create"));
const Read = lazy(() => import("./pages/Read"));
const Update = lazy(() => import("./pages/Update"));
const Delete = lazy(() => import("./pages/Delete"));

const AppRoutes = () => (
  <Suspense fallback={<div>Carregando...</div>}>
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/welcome" element={<Welcome />} />
      <Route path="/home" element={<Home />} />
      <Route path="/create" element={<Create />} />
      <Route path="/read" element={<Read />} />
      <Route path="/update" element={<Update />} />
      <Route path="/delete" element={<Delete />} />
    </Routes>
  </Suspense>
);

export default AppRoutes;
