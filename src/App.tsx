import "./App.css";
import { BrowserRouter } from "react-router-dom";
import AppContentLayout from "./components/AppContentLayout";

function App() {
  return (
    <BrowserRouter>
      <AppContentLayout />
    </BrowserRouter>
  );
}

export default App;