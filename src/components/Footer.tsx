import { useState } from "react";

const devPhoto = "/src/assets/dev-photo.png"; // Substitua pelo caminho real da foto do dev
const companyEmail = "caiocabral.ep@gmail.com";

const Footer = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(companyEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="bg-dark text-white mt-5 pt-4 pb-2">
      <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center gap-4">
        {/* Social Icons */}
        <div className="d-flex align-items-center gap-3">
          <a
            href="https://www.linkedin.com/in/caio-cabral-programmer/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white"
            title="LinkedIn"
          >
            <i className="bi bi-linkedin" style={{ fontSize: 28 }}></i>
          </a>
          <a
            href="https://github.com/Caio-Cabral-Programmer"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white"
            title="GitHub"
          >
            <i className="bi bi-github" style={{ fontSize: 28 }}></i>
          </a>
          <a
            href="https://www.notion.so/Java-1c990d83bc33814c9659f977de346a2a"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white"
            title="Notion"
          >
            {/* Notion não tem ícone oficial no Bootstrap Icons, então usamos um SVG inline */}
            <svg width="28" height="28" viewBox="0 0 50 50" fill="currentColor" className="d-block">
              <rect x="7" y="7" width="36" height="36" rx="8" fill="none" stroke="currentColor" strokeWidth="3"/>
              <text x="50%" y="60%" textAnchor="middle" fontSize="22" fontFamily="Arial" fill="currentColor" fontWeight="bold">N</text>
            </svg>
          </a>
          <button
            onClick={handleCopyEmail}
            className="btn btn-link text-white p-0 ms-2"
            title="Copiar e-mail"
            style={{ fontSize: 28 }}
          >
            <i className="bi bi-envelope"></i>
            <span className="visually-hidden">Copiar e-mail</span>
          </button>
          {copied && (
            <span className="ms-2 small text-success">E-mail copiado!</span>
          )}
        </div>

        {/* Dev Info */}
        <div className="d-flex align-items-center gap-3">
          <img
            src={devPhoto}
            alt="Foto do desenvolvedor"
            className="rounded-circle"
            style={{ width: 56, height: 56, objectFit: "cover", border: "2px solid #fff" }}
          />
          <div>
            <div className="fw-bold">Caio Cabral</div>
            <div className="small text-secondary">
              Backend: .NET 8, SQL Server<br />
              Frontend: React, TypeScript, Vite, Bootstrap 5
            </div>
          </div>
        </div>
      </div>
      <div className="container text-center mt-3 small text-secondary">
        &copy; {new Date().getFullYear()} Projeto open source inspirado em uma atividade do Decola Tech 2025 (Avanade-DIO). 
      </div>
    </footer>
  );
};

export default Footer;