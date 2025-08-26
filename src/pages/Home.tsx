const Home = () => (
  <div
    className="d-flex flex-column flex-md-row align-items-center justify-content-center h-100 w-100"
    style={{ minHeight: "70vh" }}
  >
    <div className="flex-grow-1 d-flex flex-column align-items-center justify-content-center text-center">
      <i
        className="bi bi-bank2"
        style={{ fontSize: 120, color: "#ff6200" }}
      ></i>
      <h2 className="fw-bold mt-4" style={{ color: "#23272b" }}>
        Gerencie suas contas bancárias com facilidade e segurança!
      </h2>
      <p className="lead text-secondary mt-3">
        Controle total, praticidade e tecnologia para o seu dia a dia
        financeiro.
      </p>
    </div>
  </div>
);

export default Home;
