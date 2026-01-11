import {apiFetch} from "../utils/apiFetch.js";

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "";
const BASE_URL = `${API_BASE}/api/auth`;

export async function exchangeOneTimeCode(code) {
    return apiFetch(`${BASE_URL}/exchange`, {
        method: "POST",
        body: JSON.stringify({code}),
    });
}