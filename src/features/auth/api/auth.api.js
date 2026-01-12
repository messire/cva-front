import {apiFetch} from "../../../shared/api/apiFetch.js";

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "";
const BASE_URL = `${API_BASE}/api/auth`;

export async function exchangeOneTimeCode(code) {
    return apiFetch(`${BASE_URL}/exchange`, {
        method: "POST",
        body: JSON.stringify({code}),
        auth: false,
        retryOn401: false,
    });
}

/**
 * @param {string} refreshToken
 * @returns {Promise<{ok: boolean, data: any, message?: string, status?: number}>}
 */
export async function refreshTokens(refreshToken) {
    return apiFetch(`${BASE_URL}/refresh`, {
        method: "POST",
        body: JSON.stringify({refreshToken}),
        auth: false,
        retryOn401: false,
    });
}
