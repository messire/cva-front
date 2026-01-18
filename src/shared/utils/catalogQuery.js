/**
 * @param {URLSearchParams} params
 * @returns {Object} query
 */
export function parseCatalogQuery(params) {
    const skills = params.getAll("skills");

    return {
        search: params.get("search") || "",
        skills,
        openToWork: params.has("openToWork")
            ? params.get("openToWork") === "true"
            : undefined,
        verificationStatus: params.get("verificationStatus") || undefined,
        page: params.has("page") ? Number(params.get("page")) : 1,
        pageSize: params.has("pageSize") ? Number(params.get("pageSize")) : 10,
        sortField: params.get("sortField") || "updatedAt",
        sortOrder: params.get("sortOrder") || "desc"
    };
}

/**
 * @param {Object} query
 * @returns {URLSearchParams}
 */
export function serializeCatalogQuery(query) {
    const params = new URLSearchParams();

    if (query.search) {
        params.set("search", query.search);
    }

    if (Array.isArray(query.skills)) {
        query.skills.forEach(skill => {
            if (skill) {
                params.append("skills", skill);
            }
        });
    }

    if (typeof query.openToWork === "boolean") {
        params.set("openToWork", String(query.openToWork));
    }

    if (query.verificationStatus) {
        params.set("verificationStatus", query.verificationStatus);
    }

    if (query.page && query.page !== 1) {
        params.set("page", String(query.page));
    }

    if (query.pageSize && query.pageSize !== 10) {
        params.set("pageSize", String(query.pageSize));
    }

    if (query.sortField && query.sortField !== "updatedAt") {
        params.set("sortField", query.sortField);
    }

    if (query.sortOrder && query.sortOrder !== "desc") {
        params.set("sortOrder", query.sortOrder);
    }

    return params;
}