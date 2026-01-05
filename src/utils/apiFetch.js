export async function apiFetch(url, options) {
    const res = await fetch(url, {
        headers: {'Content-Type': 'application/json', ...(options?.headers || {})},
        ...options,
    });

    if (res.status === 204) {
        return {ok: true, data: null};
    }

    const contentType = res.headers.get('content-type') || '';
    const isJson =
        contentType.includes('application/json') ||
        contentType.includes('application/problem+json');

    const body = isJson ? await res.json() : await res.text();

    if (res.ok) {
        return {ok: true, data: body};
    }

    // ProblemDetails expected here
    const problem = typeof body === 'object' && body ? body : {title: 'Error', detail: String(body || '')};

    return {
        ok: false,
        problem,
        message: problem.detail || problem.title || `Request failed (${res.status})`,
        status: res.status,
        code: problem?.extensions?.code,
        fieldErrors: problem?.extensions?.errors,
    };
}