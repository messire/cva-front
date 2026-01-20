import {useAuthStore} from "../../features/auth/model/auth.store.js";

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "";
const REFRESH_ENDPOINT = `${API_BASE}/api/auth/refresh`;

/**
 * @param {string} url
 * @param {RequestInit & { auth?: boolean, retryOn401?: boolean }} [options]
 */
export async function apiFetch(url, options = {}) {
    const auth = options.auth ?? true;
    const retryOn401 = options.retryOn401 ?? true;

    const {auth: _a, retryOn401: _r, ...fetchOptions} = options;

    return apiFetchInternal(url, fetchOptions, {auth, retryOn401});
}

async function apiFetchInternal(url, fetchOptions, {auth, retryOn401}) {
    const res = await fetch(url, {
        ...fetchOptions,
        headers: auth ? buildHeaders(fetchOptions) : buildHeaders(fetchOptions, null),
    });

    if (res.status === 403) {
        useAuthStore.getState().clear();
        return toApiResult(res);
    }

    if (res.status === 401 && auth && retryOn401) {
        try {
            await refreshTokens();
            const newToken = useAuthStore.getState().accessToken;
            const retryRes = await fetch(url, {
                ...fetchOptions,
                headers: buildHeaders(fetchOptions, newToken),
            });

            if (retryRes.status === 403) {
                useAuthStore.getState().clear();
            }

            return toApiResult(retryRes);
        } catch {
            return toApiResult(res);
        }
    }

    return toApiResult(res);
}

function buildHeaders(options, tokenOverride) {
    const isFormData = typeof FormData !== "undefined" && options?.body instanceof FormData;

    const headers = {
        ...(isFormData ? {} : {"Content-Type": "application/json"}),
        ...(options?.headers || {}),
    };

    const token = tokenOverride ?? useAuthStore.getState().accessToken;
    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    return headers;
}

async function refreshTokens() {
    const store = useAuthStore.getState();

    return store.refresh(async (refreshToken) => {
        const res = await fetch(REFRESH_ENDPOINT, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({refreshToken}),
        });

        if (!res.ok) {
            const text = await safeReadText(res);
            throw new Error(`Refresh failed (${res.status}): ${text}`);
        }

        return safeReadJson(res);
    });
}

async function toApiResult(res) {
    if (res.status === 204) {
        return {ok: true, data: null};
    }

    const contentType = res.headers.get("content-type") || "";
    const isJson = contentType.includes("application/json") || contentType.includes("application/problem+json");
    const body = isJson
        ? await safeReadJson(res)
        : await safeReadText(res);

    if (res.ok) {
        return {ok: true, data: body};
    }

    const problem =
        typeof body === "object" && body
            ? body
            : {title: "Error", detail: String(body || "")};

    return {
        ok: false,
        status: res.status,
        problem,
        message: problem.detail || problem.title || `Request failed (${res.status})`,
        code: problem?.extensions?.code,
        fieldErrors: problem?.extensions?.errors,
    };
}

async function safeReadJson(res) {
    try {
        return await res.json();
    } catch {
        return null;
    }
}

async function safeReadText(res) {
    try {
        return await res.text();
    } catch {
        return "";
    }
}