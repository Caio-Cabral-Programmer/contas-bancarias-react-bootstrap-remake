import { primaryColor } from "../colors";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  function goToWelcome() {
    navigate("/");
  }

  return (
    <header>
      <nav
  className="navbar navbar-light"
  style={{ backgroundColor: primaryColor }}
>
  <div className="d-flex align-items-center justify-content-between w-100 px-5">
    <div
      className="d-flex align-items-center"
      onClick={goToWelcome}
      style={{ cursor: "pointer" }}
    >
      <img
        src="/src/assets/icon-money.svg"
        alt="Logo"
        style={{ width: 56, height: 56 }}
      />
      <div className="ms-3 text-white">
        <h1
          className="mb-0 fw-bold"
          style={{ fontSize: "2rem", fontFamily: "Times New Roman" }}
        >
          Decola Tech 2025
        </h1>
        <p
          className="mb-0"
          style={{
            fontSize: "1.1rem",
            opacity: 0.85,
            fontFamily: "Times New Roman",
          }}
        >
          Avanade-DIO | Contas Bancárias
        </p>
      </div>
    </div>
    <Link
      to="/home"
      className="nav-link text-secondary d-flex flex-column align-items-center ms-auto text-white ms-4"
    >
      <i
        className="bi bi-house d-block mx-auto mb-0 text-white"
        style={{ fontSize: 24 }}
      ></i>
      Home
    </Link>
  </div>
</nav>
    </header>
  );
};

export default Header;
