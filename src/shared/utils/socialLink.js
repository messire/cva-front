export function stripProtocol(raw) {
    const v = (raw ?? "").trim();
    const noProto = v.replace(/^\s*https?:\/\//i, "");
    return noProto.replace(/^\/\//, "").trim();
}

export function toSavedUrl(raw) {
    const stripped = stripProtocol(raw);
    return stripped ? `https://${stripped}` : null;
}

export function validateStripped(stripped) {
    if (!stripped) {
        return {
            ok: true,
            message: ""
        };
    }
    if (/\s/.test(stripped)) {
        return {
            ok: false,
            message: "URL must not contain spaces"
        };
    }

    try {
        const url = new URL(`https://${stripped}`);
        if (!url.hostname) {
            return {
                ok: false,
                message: "Invalid URL"
            };
        }
        return {
            ok: true,
            message: ""
        };
    } catch {
        return {
            ok: false,
            message: "Invalid URL"
        };
    }
}