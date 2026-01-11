import {useAuthStore} from "../stores/auth.store.js";

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "";
const REFRESH_ENDPOINT = `${API_BASE}/api/auth/refresh`;

async function apiFetchInternal(url, options, retryOn401) {
    const res = await fetch(url, {
        ...options,
        headers: buildHeaders(options),
    });

    if (res.status === 401 && retryOn401) {
        try {
            await refreshTokens();
            const newToken = useAuthStore.getState().accessToken;
            const retryRes = await fetch(url, {
                ...options,
                headers: buildHeaders(options, newToken),
            });

            return toApiResult(retryRes);
        } catch {
            return toApiResult(res);
        }
    }

    return toApiResult(res);
}

function buildHeaders(options, tokenOverride) {
    const headers = {
        "Content-Type": "application/json",
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

export async function apiFetch(url, options = {}) {
    return apiFetchInternal(url, options, true);
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