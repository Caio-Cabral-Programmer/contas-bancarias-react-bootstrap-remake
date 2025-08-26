import { Link, useLocation } from "react-router-dom";
import { primaryColor, secondaryColor } from "../colors";
import { useEffect, useState } from "react";

const sidebarItems = [
  { label: "Create | POST", to: "/create", icon: "bi-plus-circle" },
  { label: "Read | GET", to: "/read", icon: "bi-search" },
  { label: "Update | PUT", to: "/update", icon: "bi-pencil-square" },
  { label: "Delete | DELETE", to: "/delete", icon: "bi-trash" },
  { label: "Read | ALL", to: "/read-all", icon: "bi-list-ul" },
];

const Sidebar = () => {
  const [visible, setVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setVisible(true);
  }, [location.pathname]);

  return (
    <aside
      className={`sidebar d-flex flex-column flex-shrink-0 p-3 bg-body-tertiary shadow`}
      style={{
    width: 250,
    height: "100vh", // Garante altura total da tela
    marginTop: 0,
    marginBottom: 0,
    borderRadius: 0,
    transition: "margin-left 0.6s cubic-bezier(.4,2,.3,1)",
    marginLeft: visible ? 0 : -260,
    boxShadow: "2px 0 16px 0 rgba(0,0,0,0.08)",
    background: primaryColor,
  }}
    >
      <Link
        to="/home"
        className="d-flex align-items-center justify-content-center w-100 mb-0 text-decoration-none"
        style={{ minHeight: 56 }}
      >
        <span
          className="fs-3 fw-bold px-3 py-0 w-100 text-center text-dark"
          style={{ letterSpacing: 2, borderRadius: 4, display: "block" }}
        >
          CRUD
        </span>
      </Link>
      <hr className="my-2" />
      <ul className="nav nav-pills flex-column mb-auto w-100">
        {sidebarItems.map((item) => {
          // Pega a primeira letra e o restante do label
          const [first, ...rest] = item.label;
          return (
            <li className="nav-item mb-2" key={item.to}>
              <Link
                to={item.to}
                className={`nav-link d-flex align-items-center gap-2 px-3 py-2 rounded fw-semibold ${
                  location.pathname === item.to ? "active" : "link-dark"
                }`}
                style={{
                  background:
                    location.pathname === item.to
                      ? secondaryColor
                      : "transparent",
                  color: location.pathname === item.to ? "#fff" : "#23272b",
                  border: "none",
                  fontSize: 16,
                  transition: "background 0.2s, color 0.2s",
                }}
              >
                <i
                  className={`bi ${item.icon} me-2`}
                  style={{ fontSize: 20 }}
                ></i>
                <span>
                  <span style={{ color: "red" }}>{first}</span>
                  {rest.join("")}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default Sidebar;
