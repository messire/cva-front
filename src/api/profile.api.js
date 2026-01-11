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
export async function updateMyProfileHeader(request) {
    return apiFetch(`${BASE_URL}/header`, {
        method: "PATCH",
        auth: true,
        body: JSON.stringify(request)
    });
}

/**
 * @param {{ summary: string }} request
 */
export async function updateMyProfileSummary(request) {
    return apiFetch(`${BASE_URL}/summary`, {
        method: "PATCH",
        auth: true,
        body: JSON.stringify(request)
    });
}

/**
 * @param {object} request
 */
export async function updateMyProfileContacts(request) {
    return apiFetch(`${BASE_URL}/contacts`, {
        method: "PATCH",
        auth: true,
        body: JSON.stringify(request)
    });
}

/**
 * @param {{ skills: string[] }} request
 */
export async function replaceMyProfileSkills(request) {
    return apiFetch(`${BASE_URL}/skills`, {
        method: "PUT",
        auth: true,
        body: JSON.stringify(request)
    });
}