export function tryGetJwtSub(accessToken) {
    if (!accessToken) {
        return null;
    }

    const parts = accessToken.split(".");
    if (parts.length !== 3) {
        return null;
    }

    try {
        const payload = parts[1].replace(/-/g, "+").replace(/_/g, "/");
        const json = decodeURIComponent(
            atob(payload)
                .split("")
                .map(c => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
                .join("")
        );

        const obj = JSON.parse(json);
        return obj?.sub ?? null;
    } catch {
        return null;
    }
}
