import {apiFetch} from "../utils/apiFetch.js";

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "";
const BASE_URL = `${API_BASE}/api/profile`;

export async function fetchMyProfile() {
    return apiFetch(BASE_URL, {
        method: "GET",
        auth: true
    });
}

/**
 * @param {object} request
 */
export async function createMyProfile(request) {
    return apiFetch(BASE_URL, {
        method: "POST",
        auth: true,
        body: JSON.stringify(request)
    });
}

/**
 * @param {object} request
 */
export async function updateMyProfile(request) {
    return apiFetch(BASE_URL, {
        method: "PUT",
        auth: true,
        body: JSON.stringify(request)
    });
}

/**
 * @param {object} request
 */
export async function updateHeader(request) {
    return apiFetch(`${BASE_URL}/header`, {
        method: "PATCH",
        auth: true,
        body: JSON.stringify(request)
    });
}

/**
 * @param {{ summary: string }} request
 */
export async function updateSummary(request) {
    return apiFetch(`${BASE_URL}/summary`, {
        method: "PATCH",
        auth: true,
        body: JSON.stringify(request)
    });
}

/**
 * @param {object} request
 */
export async function updateContacts(request) {
    return apiFetch(`${BASE_URL}/contacts`, {
        method: "PATCH",
        auth: true,
        body: JSON.stringify(request)
    });
}

/**
 * @param {{ skills: string[] }} request
 */
export async function replaceSkills(request) {
    return apiFetch(`${BASE_URL}/skills`, {
        method: "PUT",
        auth: true,
        body: JSON.stringify(request)
    });
}