import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { User } from "../models/User";
import { createUser } from "../services/userService";
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

const Create: React.FC = () => {
  const [form, setForm] = useState<User>(initialForm);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const navigate = useNavigate();
  const [showValidationAlert, setShowValidationAlert] = useState(false);

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!validateForm(form)) {
      e.preventDefault();
      setShowValidationAlert(true);
      setTimeout(() => setShowValidationAlert(false), 2500);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!validateForm(form)) {
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

    try {
      await createUser(form);
      setSuccessMessage("Usuário criado com sucesso!");
      setTimeout(() => {
        setSuccessMessage("");
        navigate("/read-all");
      }, 2000);
      setForm(initialForm);
      setTouched({});
    } catch (error: unknown) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Erro ao criar usuário. Tente novamente mais tarde."
      );
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "80vh" }}
    >
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
          <h2 className="mb-0 fw-bold text-white" style={{ letterSpacing: 1 }}>
            Create | POST
          </h2>
        </div>
        <form onSubmit={handleSubmit} noValidate className="p-4">
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
                  <div className="invalid-feedback">Campo obrigatório</div>
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
                  <div className="invalid-feedback">Campo obrigatório</div>
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
                  <div className="invalid-feedback">Campo obrigatório</div>
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
                  <div className="invalid-feedback">Campo obrigatório</div>
                )}
              </div>
            </div>
          </fieldset>

          {/* Cartão */}
          <fieldset className="mb-4 border rounded-3 p-3">
            <legend className="float-none w-auto px-2 fs-6">Cartão</legend>
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
                  <div className="invalid-feedback">Campo obrigatório</div>
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
                  <div className="invalid-feedback">Campo obrigatório</div>
                )}
              </div>
            </div>
          </fieldset>

          <button
            type="submit"
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
          >
            Criar e Salvar
          </button>

          {showValidationAlert && (
            <div
              className="alert alert-warning mt-3 text-center fw-semibold"
              style={{ fontSize: 16 }}
            >
              Por favor, preencha todos os campos obrigatórios antes de salvar.
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
    </div>
  );
};

export default Create;
