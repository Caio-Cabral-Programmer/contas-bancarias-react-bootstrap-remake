import React, { useState, useEffect } from "react";
import type { User } from "../models/User";
import { getAllUsers, getUser } from "../services/userService";
import { secondaryColor } from "../colors";

type SortType = "name" | "balance";
type SortOrder = "asc" | "desc";

const Read: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [sortType, setSortType] = useState<SortType>("name");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  // Carregar todos os usuários quando o componente for iniciado
  useEffect(() => {
    handleGetAllUsers();
  }, []);

  // TODO: Melhorar a performance desta busca, porque estão acontecendo muitas requisições desnecessárias.
  const handleSearch = async () => {
    setLoading(true);
    setErrorMessage("");

    try {
      if (searchTerm.trim() === "") {
        const allUsers = await getAllUsers();
        setUsers(allUsers);
      } else {
        // Tenta buscar por ID primeiro (número ou string)
        try {
          const user = await getUser(searchTerm);
          setUsers([user]);
        } catch {
          // Se não encontrar por ID, busca por nome
          const allUsers = await getAllUsers();
          const filteredUsers = allUsers.filter((user) =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase())
          );
          setUsers(filteredUsers);
        }
      }
    } catch (error: unknown) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Erro ao buscar usuários. Tente novamente."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGetAllUsers = async () => {
    setLoading(true);
    setErrorMessage("");
    setSearchTerm("");

    try {
      const allUsers = await getAllUsers();
      setUsers(allUsers);
    } catch (error: unknown) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Erro ao buscar usuários. Tente novamente."
      );
    } finally {
      setLoading(false);
    }
  };

  // TODO: Se a lógica da busca for alterada para melhorar a performance, esta função não pode mais fazer um setUsers, ela precisa trabalhar com outra variável.
  const handleSort = (type: SortType) => {
    const newOrder = sortType === type && sortOrder === "asc" ? "desc" : "asc";
    setSortType(type);
    setSortOrder(newOrder);

    const sortedUsers = [...users].sort((a, b) => {
      if (type === "name") {
        const comparison = a.name.localeCompare(b.name);
        return newOrder === "asc" ? comparison : -comparison;
      } else {
        const balanceA = parseFloat(a.account.balance);
        const balanceB = parseFloat(b.account.balance);
        return newOrder === "asc" ? balanceA - balanceB : balanceB - balanceA;
      }
    });

    setUsers(sortedUsers);
  };

  const formatCurrency = (value: string) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(parseFloat(value));
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "80vh" }}
    >
      <div
        className="shadow rounded-4 bg-white w-100"
        style={{ maxWidth: 900, padding: 0, border: "1px solid #eee" }}
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
            Read | GET
          </h2>
        </div>

        <div className="p-4">
          {/* Painel de Busca */}
          <div className="row g-3 mb-4">
            <div className="col-md-6">
              <label htmlFor="searchInput" className="form-label fw-semibold">
                Buscar por nome ou ID:
              </label>
              <input
                type="text"
                className="form-control"
                id="searchInput"
                placeholder="Digite o nome ou ID do usuário..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>
            <div className="col-md-6 d-flex align-items-end gap-2">
              <button
                type="button"
                className="btn btn-primary px-4 py-2"
                onClick={handleSearch}
                disabled={loading}
              >
                <i className="bi bi-search me-2"></i>
                Buscar
              </button>
              <button
                type="button"
                className="btn btn-outline-primary px-4 py-2"
                onClick={handleGetAllUsers}
                disabled={loading}
              >
                <i className="bi bi-list-ul me-2"></i>
                Todos
              </button>
            </div>
          </div>

          {/* Botões de Ordenação */}
          {users.length > 0 && (
            <div className="row g-2 mb-4">
              <div className="col-auto">
                <span className="text-muted fw-semibold">Ordenar por:</span>
              </div>
              <div className="col-auto">
                <button
                  type="button"
                  className={`btn btn-sm ${
                    sortType === "name" ? "btn-success" : "btn-outline-success"
                  }`}
                  onClick={() => handleSort("name")}
                >
                  <i className="bi bi-sort-alpha-down me-1"></i>
                  Nome{" "}
                  {sortType === "name" && (sortOrder === "asc" ? "↑" : "↓")}
                </button>
              </div>
              <div className="col-auto">
                <button
                  type="button"
                  className={`btn btn-sm ${
                    sortType === "balance"
                      ? "btn-success"
                      : "btn-outline-success"
                  }`}
                  onClick={() => handleSort("balance")}
                >
                  <i className="bi bi-sort-numeric-down me-1"></i>
                  Saldo{" "}
                  {sortType === "balance" && (sortOrder === "asc" ? "↑" : "↓")}
                </button>
              </div>
              <div className="col-auto ms-auto">
                <span className="badge bg-secondary">
                  {users.length} usuário{users.length !== 1 ? "s" : ""}{" "}
                  encontrado{users.length !== 1 ? "s" : ""}
                </span>
              </div>
            </div>
          )}

          {/* Loading */}
          {loading && (
            <div className="text-center py-4">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Carregando...</span>
              </div>
              <p className="mt-2 text-muted">Buscando usuários...</p>
            </div>
          )}

          {/* Mensagem de Erro */}
          {errorMessage && (
            <div className="alert alert-danger">{errorMessage}</div>
          )}

          {/* Lista de Usuários */}
          {!loading && users.length > 0 && (
            <div className="row g-3">
              {users.map((user) => (
                <div key={user.id} className="col-12">
                  <div className="card border-0 shadow-sm">
                    <div className="card-body">
                      <div className="row align-items-center">
                        <div className="col-md-3">
                          <h5 className="card-title mb-1 fw-bold text-primary">
                            {user.name}
                          </h5>
                          <small className="text-muted">ID: {user.id}</small>
                        </div>
                        <div className="col-md-3">
                          <h6 className="text-warning mb-1">Conta</h6>
                          <p className="mb-0 small">
                            <strong>Número:</strong> {user.account.number}
                            <br />
                            <strong>Agência:</strong> {user.account.agency}
                          </p>
                        </div>
                        <div className="col-md-3">
                          <h6 className="text-warning mb-1">Cartão</h6>
                          <p className="mb-0 small">
                            <strong>Número:</strong> {user.card.number}
                            <br />
                            <strong>Limite:</strong>{" "}
                            {formatCurrency(user.card.limit)}
                          </p>
                        </div>
                        <div className="col-md-3 text-end">
                          <h6 className="text-warning mb-1">Saldo</h6>
                          <p className="mb-1 h5 fw-bold text-success">
                            {formatCurrency(user.account.balance)}
                          </p>
                          <small className="text-muted">
                            Limite: {formatCurrency(user.account.limit)}
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Mensagem quando não há usuários */}
          {!loading && users.length === 0 && searchTerm && (
            <div className="text-center py-5">
              <i
                className="bi bi-search text-muted"
                style={{ fontSize: "3rem" }}
              ></i>
              <h5 className="mt-3 text-muted">Nenhum usuário encontrado</h5>
              <p className="text-muted">
                Tente buscar por outro nome ou ID, ou clique em "Todos" para ver
                todos os usuários.
              </p>
            </div>
          )}

          {/* Mensagem inicial */}
          {!loading && users.length === 0 && !searchTerm && (
            <div className="text-center py-5">
              <i
                className="bi bi-people text-muted"
                style={{ fontSize: "3rem" }}
              ></i>
              <h5 className="mt-3 text-muted">Busque usuários</h5>
              <p className="text-muted">
                Digite um nome ou ID para buscar, ou clique em "Todos" para ver
                todos os usuários.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Read;
