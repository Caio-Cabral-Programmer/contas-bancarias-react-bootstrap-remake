import { useLocation } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import AppRoutes from "../AppRoutes";
import Footer from "./Footer";

function AppContent() {
  const location = useLocation();
  const showSidebar = ["/home", "/create", "/read", "/update", "/delete"].some(
    (path) => location.pathname.startsWith(path)
  );
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <div className="d-flex flex-grow-1">
        {showSidebar && <Sidebar />}
        <main
          className={`flex-grow-1 d-flex flex-column ${
            showSidebar ? "" : "container mt-5"
          }`}
          style={showSidebar ? { marginLeft: 0, padding: "1rem" } : {}}
        >
          <div className="flex-grow-1 d-flex flex-column">
            <AppRoutes />
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default AppContent;