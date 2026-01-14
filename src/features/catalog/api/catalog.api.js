import {apiFetch} from "../../../shared/api/apiFetch.js";

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "";
const BASE_URL = `${API_BASE}/api/catalog`;

export async function fetchCatalog() {
    return apiFetch(BASE_URL, {method: "GET"});
}

export async function fetchProfileById(id) {
    return apiFetch(`${BASE_URL}/${id}`, {method: "GET"});
}
