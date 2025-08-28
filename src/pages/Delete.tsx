import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { User } from "../models/User";
import { deleteUser, getUser } from "../services/userService";
import { secondaryColor } from "../colors";

const Delete: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
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
      const foundUser = await getUser(userId);
      setUser(foundUser);
      setUserLoaded(true);
    } catch {
      setErrorMessage("Usuário não encontrado com este ID");
      setUser(null);
      setUserLoaded(false);
    } finally {
      setLoading(false);
    }
  };

  const handleClearSearch = () => {
    setUserId("");
    setUser(null);
    setUserLoaded(false);
    setErrorMessage("");
    setSuccessMessage("");
  };

  const handleButtonClick = () => {
    if (!userLoaded || !user) {
      setErrorMessage("Busque um usuário pelo ID primeiro");
      return;
    }

    setShowConfirmModal(true);
  };

  const handleConfirmDelete = async () => {
    setShowConfirmModal(false);
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      await deleteUser(userId);
      setSuccessMessage("Usuário deletado com sucesso!");
      setTimeout(() => {
        setSuccessMessage("");
        navigate("/read");
      }, 2000);
      setUser(null);
      setUserLoaded(false);
      setUserId("");
    } catch (error: unknown) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Erro ao deletar usuário. Tente novamente mais tarde."
      );
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (value: string) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(parseFloat(value));
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
              Delete | DELETE
            </h2>
          </div>

          <div className="p-4">
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

            {userLoaded && user && (
              <>
                {/* Card com dados do usuário */}
                <div className="card border-warning mb-4">
                  <div className="card-header bg-warning text-dark">
                    <h5 className="mb-0">
                      <i className="bi bi-exclamation-triangle me-2"></i>
                      Dados do Usuário que será Deletado
                    </h5>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-6">
                        <h6 className="text-primary mb-2">
                          Informações Pessoais
                        </h6>
                        <p className="mb-1">
                          <strong>Nome:</strong> {user.name}
                        </p>
                        <p className="mb-3">
                          <strong>ID:</strong> {user.id}
                        </p>

                        <h6 className="text-success mb-2">Conta Bancária</h6>
                        <p className="mb-1">
                          <strong>Número:</strong> {user.account.number}
                        </p>
                        <p className="mb-1">
                          <strong>Agência:</strong> {user.account.agency}
                        </p>
                        <p className="mb-1">
                          <strong>Saldo:</strong>{" "}
                          {formatCurrency(user.account.balance)}
                        </p>
                        <p className="mb-3">
                          <strong>Limite:</strong>{" "}
                          {formatCurrency(user.account.limit)}
                        </p>
                      </div>
                      <div className="col-md-6">
                        <h6 className="text-info mb-2">Cartão de Crédito</h6>
                        <p className="mb-1">
                          <strong>Número:</strong> {user.card.number}
                        </p>
                        <p className="mb-3">
                          <strong>Limite:</strong>{" "}
                          {formatCurrency(user.card.limit)}
                        </p>

                        <div className="alert alert-danger">
                          <small>
                            <i className="bi bi-exclamation-triangle me-1"></i>
                            <strong>Atenção:</strong> Esta ação é irreversível!
                            Todos os dados serão perdidos permanentemente.
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  className="btn btn-danger w-100 fw-bold py-3"
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
                  <i className="bi bi-trash me-2"></i>
                  {loading ? "Deletando..." : "Deletar Usuário"}
                </button>
              </>
            )}

            {errorMessage && (
              <div className="alert alert-danger mt-3">{errorMessage}</div>
            )}
            {successMessage && (
              <div className="alert alert-success mt-3">{successMessage}</div>
            )}
          </div>
        </div>

        {/* Modal de Confirmação */}
        {showConfirmModal && user && (
          <div
            className="modal d-block"
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header border-danger">
                  <h5 className="modal-title text-danger">
                    <i className="bi bi-exclamation-triangle text-danger me-2"></i>
                    Confirmar Exclusão
                  </h5>
                </div>
                <div className="modal-body">
                  <p className="mb-3">
                    Tem certeza que deseja{" "}
                    <strong className="text-danger">DELETAR</strong>{" "}
                    permanentemente o usuário <strong>{user.name}</strong> (ID:{" "}
                    {user.id})?
                  </p>
                  <div className="alert alert-danger">
                    <small>
                      <strong>⚠️ ATENÇÃO:</strong> Esta ação é{" "}
                      <strong>IRREVERSÍVEL</strong>! Todos os dados da conta
                      bancária, cartão e informações pessoais serão perdidos
                      para sempre.
                    </small>
                  </div>
                  <div className="bg-light p-3 rounded">
                    <p className="mb-1">
                      <strong>Dados que serão perdidos:</strong>
                    </p>
                    <ul className="mb-0">
                      <li>Conta bancária nº {user.account.number}</li>
                      <li>Saldo de {formatCurrency(user.account.balance)}</li>
                      <li>Cartão nº {user.card.number}</li>
                      <li>Todas as informações pessoais</li>
                    </ul>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowConfirmModal(false)}
                  >
                    <i className="bi bi-x-circle me-2"></i>
                    Cancelar
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger fw-bold"
                    onClick={handleConfirmDelete}
                  >
                    <i className="bi bi-trash me-2"></i>
                    Sim, Deletar Permanentemente
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

export default Delete;
