import type { User } from "../models/User";

const API_URL = "http://localhost:3000/users";

export async function createUser(user: User): Promise<User> {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  if (!response.ok) throw new Error("Erro ao criar usuário");
  return response.json();
}

export async function getAllUsers(): Promise<User[]> {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error("Erro ao buscar usuários");
  return response.json();
}

export async function getUser(id: number): Promise<User> {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) throw new Error("Usuário não encontrado");
  return response.json();
}

export async function updateUser(id: number, user: User): Promise<User> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  if (!response.ok) throw new Error("Erro ao atualizar usuário");
  return response.json();
}

export async function deleteUser(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!response.ok) throw new Error("Erro ao deletar usuário");
}
