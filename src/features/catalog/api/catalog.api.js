import {apiFetch} from "../../../shared/api/apiFetch.js";

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "";
const BASE_URL = `${API_BASE}/api/catalog`;

/**
 * @typedef {Object} CatalogQuery
 * @property {string} [search]
 * @property {string[]} [skills]
 * @property {boolean} [openToWork]
 * @property {string} [verificationStatus]
 * @property {number} [page]
 * @property {number} [pageSize]
 * @property {string} [sortField]
 * @property {string} [sortOrder]
 */

/**
 * @param {CatalogQuery} [query]
 */
export async function fetchCatalog(query = {}) {
    const params = new URLSearchParams();

    if (query.search) {
        params.set("search", query.search);
    }

    if (Array.isArray(query.skills)) {
        query.skills
            .filter(Boolean)
            .forEach((x) => params.append("skills", x));
    }

    if (typeof query.openToWork === "boolean") {
        params.set("openToWork", String(query.openToWork));
    }

    if (query.verificationStatus) {
        params.set("verificationStatus", query.verificationStatus);
    }

    if (Number.isFinite(query.page) && query.page >= 1) {
        params.set("page", String(query.page));
    }

    if (Number.isFinite(query.pageSize) && query.pageSize >= 1) {
        params.set("pageSize", String(query.pageSize));
    }

    if (query.sortField) {
        params.set("sortField", query.sortField);
    }

    if (query.sortOrder) {
        params.set("sortOrder", query.sortOrder);
    }

    const url = params.size ? `${BASE_URL}?${params.toString()}` : BASE_URL;

    return apiFetch(url, {method: "GET", auth: false});
}

export async function fetchProfileById(id) {
    return apiFetch(`${BASE_URL}/${id}`, {method: "GET"});
}
