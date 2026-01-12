import {apiFetch} from "../../../shared/api/apiFetch.js";

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

/**
 * @param {object} payload
 */
export async function createWorkExperience(payload) {
    return apiFetch(`${BASE_URL}/work-experiences`, {
        method: "POST",
        auth: true,
        body: JSON.stringify(payload)
    });
}

/**
 * @param {string} id
 * @param {object} payload
 */
export async function updateWorkExperience(id, payload) {
    return apiFetch(`${BASE_URL}/work-experiences/${id}`, {
        method: "PUT",
        auth: true,
        body: JSON.stringify(payload)
    });
}

/**
 * @param {string} id
 */
export async function deleteWorkExperience(id) {
    return apiFetch(`${BASE_URL}/work-experiences/${id}`, {
        method: "DELETE",
        auth: true
    });
}

/**
 * @param {object} payload
 */
export async function createProject(payload) {
    return apiFetch(`${BASE_URL}/projects`, {
        method: "POST",
        auth: true,
        body: JSON.stringify(payload)
    });
}

/**
 * @param {string} id
 * @param {object} payload
 */
export async function updateProject(id, payload) {
    return apiFetch(`${BASE_URL}/projects/${id}`, {
        method: "PUT",
        auth: true,
        body: JSON.stringify(payload)
    });
}

/**
 * @param {string} id
 */
export async function deleteProject(id) {
    return apiFetch(`${BASE_URL}/projects/${id}`, {
        method: "DELETE",
        auth: true
    });
}