import { Link } from "react-router-dom";
import reactLogo from "../assets/react.svg";
import "../App.css";
import { secondaryColor } from "../colors";

const Welcome = () => (
  <div className="d-flex flex-column align-items-center justify-content-center">
    <img
      src={reactLogo}
      alt="React Logo"
      className="logo react mb-4"
      style={{ width: 100, height: 100 }}
    />
    <h3
      className="fw-bold text-center mb-3"
      style={{ fontFamily: "Segoe UI, Arial, sans-serif" }}
    >
      Bem vindo(a) ao gerenciador de contas bancárias Top Bank!{" "}
    </h3>
    <p className="lead text-secondary mb-4 text-center">
      Clique abaixo para começar:
    </p>
    <Link
      to="/home"
      className="btn btn-primary btn-lg px-5 shadow"
      style={{ backgroundColor: secondaryColor, border: "none" }}
    >
      Iniciar
    </Link>
  </div>
);

export default Welcome;
