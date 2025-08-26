import "./App.css";
import Header from "./components/Header";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./AppRoutes";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="container mt-5">
        <AppRoutes />
      </div>
    </BrowserRouter>
  );
}

export default App;