import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { User } from "../models/User";
import { updateUser, getUser } from "../services/userService";
import { secondaryColor } from "../colors";

const initialForm: User = {
  name: "",
  account: { number: "", agency: "", balance: "", limit: "" },
  card: { number: "", limit: "" },
};

const validateForm = (form: User) => {
  return (
    form.name.trim() !== "" &&
    form.account.number.trim() !== "" &&
    form.account.agency.trim() !== "" &&
    form.account.balance.trim() !== "" &&
    form.account.limit.trim() !== "" &&
    form.card.number.trim() !== "" &&
    form.card.limit.trim() !== ""
  );
};

const Update: React.FC = () => {
  const [form, setForm] = useState<User>(initialForm);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [showValidationAlert, setShowValidationAlert] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [userId, setUserId] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [userLoaded, setUserLoaded] = useState(false);
  const navigate = useNavigate();

  const handleSearchUser = async () => {
    if (!userId.trim()) {
      setErrorMessage("Digite um ID válido");
      return;
    }

    setLoading(true);
    setErrorMessage("");
    try {
      const user = await getUser(userId);
      setForm(user);
      setUserLoaded(true);
      setTouched({});
    } catch {
      setErrorMessage("Usuário não encontrado com este ID");
      setForm(initialForm);
      setUserLoaded(false);
    } finally {
      setLoading(false);
    }
  };

  const handleClearSearch = () => {
    setUserId("");
    setForm(initialForm);
    setUserLoaded(false);
    setTouched({});
    setErrorMessage("");
    setSuccessMessage("");
  };

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!userLoaded) {
      setErrorMessage("Busque um usuário pelo ID primeiro");
      return;
    }

    if (!validateForm(form)) {
      setShowValidationAlert(true);
      setTimeout(() => setShowValidationAlert(false), 2500);
      setTouched({
        name: true,
        "account.number": true,
        "account.agency": true,
        "account.balance": true,
        "account.limit": true,
        "card.number": true,
        "card.limit": true,
      });
      return;
    }

    setShowConfirmModal(true);
  };

  const handleConfirmUpdate = async () => {
    setShowConfirmModal(false);
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      await updateUser(userId, form);
      setSuccessMessage("Usuário atualizado com sucesso!");
      setTimeout(() => {
        setSuccessMessage("");
        navigate("/read");
      }, 2000);
    } catch (error: unknown) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Erro ao atualizar usuário. Tente novamente mais tarde."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name.startsWith("account.")) {
      const key = name.split(".")[1] as keyof User["account"];
      setForm((prev) => ({
        ...prev,
        account: { ...prev.account, [key]: value },
      }));
    } else if (name.startsWith("card.")) {
      const key = name.split(".")[1] as keyof User["card"];
      setForm((prev) => ({
        ...prev,
        card: { ...prev.card, [key]: value },
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
  };

  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-center">
        <div
          className="shadow rounded-4 bg-white w-100"
          style={{ maxWidth: 600, padding: 0, border: "1px solid #eee" }}
        >
          <div
            style={{
              background: secondaryColor,
              borderRadius: "1rem 1rem 0 0",
              padding: "1.5rem 1rem",
              textAlign: "center",
              marginBottom: 0,
            }}
          >
            <h2
              className="mb-0 fw-bold text-white"
              style={{ letterSpacing: 1 }}
            >
              Update | PUT
            </h2>
          </div>

          <form noValidate className="p-4">
            {/* Busca por ID */}
            <div className="mb-4">
              <label htmlFor="userIdInput" className="form-label fw-semibold">
                Buscar Usuário por ID:
              </label>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  id="userIdInput"
                  placeholder="Digite o ID do usuário..."
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSearchUser()}
                />
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSearchUser}
                  disabled={loading}
                >
                  <i className="bi bi-search me-2"></i>
                  {loading ? "Buscando..." : "Buscar"}
                </button>
                {userLoaded && (
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={handleClearSearch}
                  >
                    <i className="bi bi-x-circle me-2"></i>
                    Limpar
                  </button>
                )}
              </div>
            </div>

            {userLoaded && (
              <>
                {/* Nome do Usuário */}
                <div className="mb-4">
                  <label htmlFor="name" className="form-label fw-semibold">
                    Nome do Usuário:
                  </label>
                  <input
                    type="text"
                    className={`form-control${
                      touched.name && !form.name ? " is-invalid" : ""
                    }`}
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    autoComplete="off"
                  />
                  {touched.name && !form.name && (
                    <div className="invalid-feedback">Campo obrigatório</div>
                  )}
                </div>

                {/* Conta */}
                <fieldset className="mb-4 border rounded-3 p-3">
                  <legend className="float-none w-auto px-2 fs-6">Conta</legend>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label htmlFor="accountNumber" className="form-label">
                        Número da Conta:
                      </label>
                      <input
                        type="number"
                        className={`form-control${
                          touched["account.number"] && !form.account.number
                            ? " is-invalid"
                            : ""
                        }`}
                        id="accountNumber"
                        name="account.number"
                        value={form.account.number}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                      />
                      {touched["account.number"] && !form.account.number && (
                        <div className="invalid-feedback">
                          Campo obrigatório
                        </div>
                      )}
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="accountAgency" className="form-label">
                        Número da Agência:
                      </label>
                      <input
                        type="number"
                        className={`form-control${
                          touched["account.agency"] && !form.account.agency
                            ? " is-invalid"
                            : ""
                        }`}
                        id="accountAgency"
                        name="account.agency"
                        value={form.account.agency}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                      />
                      {touched["account.agency"] && !form.account.agency && (
                        <div className="invalid-feedback">
                          Campo obrigatório
                        </div>
                      )}
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="accountBalance" className="form-label">
                        Saldo:
                      </label>
                      <input
                        type="number"
                        className={`form-control${
                          touched["account.balance"] && !form.account.balance
                            ? " is-invalid"
                            : ""
                        }`}
                        id="accountBalance"
                        name="account.balance"
                        value={form.account.balance}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                      />
                      {touched["account.balance"] && !form.account.balance && (
                        <div className="invalid-feedback">
                          Campo obrigatório
                        </div>
                      )}
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="accountLimit" className="form-label">
                        Limite da Conta:
                      </label>
                      <input
                        type="number"
                        className={`form-control${
                          touched["account.limit"] && !form.account.limit
                            ? " is-invalid"
                            : ""
                        }`}
                        id="accountLimit"
                        name="account.limit"
                        value={form.account.limit}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                      />
                      {touched["account.limit"] && !form.account.limit && (
                        <div className="invalid-feedback">
                          Campo obrigatório
                        </div>
                      )}
                    </div>
                  </div>
                </fieldset>

                {/* Cartão */}
                <fieldset className="mb-4 border rounded-3 p-3">
                  <legend className="float-none w-auto px-2 fs-6">
                    Cartão
                  </legend>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label htmlFor="cardNumber" className="form-label">
                        Número do Cartão:
                      </label>
                      <input
                        type="number"
                        className={`form-control${
                          touched["card.number"] && !form.card.number
                            ? " is-invalid"
                            : ""
                        }`}
                        id="cardNumber"
                        name="card.number"
                        value={form.card.number}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                      />
                      {touched["card.number"] && !form.card.number && (
                        <div className="invalid-feedback">
                          Campo obrigatório
                        </div>
                      )}
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="cardLimit" className="form-label">
                        Limite do Cartão:
                      </label>
                      <input
                        type="number"
                        className={`form-control${
                          touched["card.limit"] && !form.card.limit
                            ? " is-invalid"
                            : ""
                        }`}
                        id="cardLimit"
                        name="card.limit"
                        value={form.card.limit}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                      />
                      {touched["card.limit"] && !form.card.limit && (
                        <div className="invalid-feedback">
                          Campo obrigatório
                        </div>
                      )}
                    </div>
                  </div>
                </fieldset>

                <button
                  type="button"
                  className="btn btn-success w-100 fw-bold py-3"
                  style={{
                    fontSize: 18,
                    borderRadius: "0 0 1rem 1rem",
                    letterSpacing: 1,
                    border: "none",
                    marginTop: "-0.5rem",
                    boxShadow: "0 2px 8px 0 rgba(0,0,0,0.04)",
                    cursor: "pointer",
                  }}
                  onClick={handleButtonClick}
                  disabled={loading}
                >
                  {loading ? "Atualizando..." : "Atualizar e Salvar"}
                </button>
              </>
            )}

            {showValidationAlert && (
              <div
                className="alert alert-warning mt-3 text-center fw-semibold"
                style={{ fontSize: 16 }}
              >
                Por favor, preencha todos os campos obrigatórios antes de
                salvar.
              </div>
            )}

            {errorMessage && (
              <div className="alert alert-danger mt-3">{errorMessage}</div>
            )}
            {successMessage && (
              <div className="alert alert-success mt-3">{successMessage}</div>
            )}
          </form>
        </div>

        {/* Modal de Confirmação */}
        {showConfirmModal && (
          <div
            className="modal d-block"
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">
                    <i className="bi bi-question-circle text-warning me-2"></i>
                    Confirmar Atualização
                  </h5>
                </div>
                <div className="modal-body">
                  <p className="mb-3">
                    Tem certeza que deseja atualizar os dados do usuário{" "}
                    <strong>{form.name}</strong>?
                  </p>
                  <div className="alert alert-info">
                    <small>
                      <strong>Atenção:</strong> Esta ação irá modificar
                      permanentemente os dados do usuário no sistema.
                    </small>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowConfirmModal(false)}
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    className="btn btn-success fw-bold"
                    onClick={handleConfirmUpdate}
                  >
                    <i className="bi bi-check-circle me-2"></i>
                    Sim, Atualizar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Update;
