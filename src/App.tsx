import "./App.css";
import Header from "./components/Header";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="container mt-5">
        <AppRoutes />
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
