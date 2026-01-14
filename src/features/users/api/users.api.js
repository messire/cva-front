import {apiFetch} from "../../../shared/api/apiFetch.js";

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "";
const BASE_URL = `${API_BASE}/api/users`;

export async function fetchUsers() {
    return apiFetch(BASE_URL, {method: "GET"});
}

export async function fetchUserById(id) {
    return apiFetch(`${BASE_URL}/${id}`, {method: "GET"});
}

export async function createUser(user) {
    return apiFetch(BASE_URL, {
        method: "POST",
        body: JSON.stringify(user),
    });
}

export async function updateUser(id, updates) {
    return apiFetch(`${BASE_URL}/${id}`, {
        method: "PUT",
        body: JSON.stringify(updates),
    });
}

export async function deleteUser(id) {
    return apiFetch(`${BASE_URL}/${id}`, {method: "DELETE"});
}
