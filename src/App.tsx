import "./App.css";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { BrowserRouter, useLocation } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import Footer from "./components/Footer";

function Layout() {
  const location = useLocation();
  // Rotas que devem exibir o Sidebar
  const showSidebar = [
    "/home",
    "/create",
    "/read",
    "/update",
    "/delete",
    "/read-all",
  ].some((path) => location.pathname.startsWith(path));
  return (
    <>
      <Header />
      <div className="d-flex" style={{ minHeight: "80vh" }}>
        {showSidebar && <Sidebar />}
        <main
          className={
            showSidebar ? "flex-grow-1 ms-0 ms-md-5" : "container mt-5 w-100"
          }
          style={showSidebar ? { marginLeft: 220, padding: 0 } : {}}
        >
          <AppRoutes />
        </main>
      </div>
      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;
