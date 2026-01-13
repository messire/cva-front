function pad2(n) {
    return String(n).padStart(2, "0");
}

export function isoToMonth(iso) {
    if (!iso || typeof iso !== "string") {
        return "";
    }
    return iso.slice(0, 7);
}

export function monthToPeriodStartIso(month) {
    if (!month) {
        return null;
    }
    const [y, m] = month.split("-").map(Number);
    if (!y || !m) {
        return null;
    }

    const dt = new Date(Date.UTC(y, m - 1, 1));
    return `${dt.getUTCFullYear()}-${pad2(dt.getUTCMonth() + 1)}-${pad2(dt.getUTCDate())}`;
}

export function monthToPeriodEndIso(month) {
    if (!month) {
        return null;
    }
    const [y, m] = month.split("-").map(Number);
    if (!y || !m) {
        return null;
    }

    const dt = new Date(Date.UTC(y, m, 0));
    return `${dt.getUTCFullYear()}-${pad2(dt.getUTCMonth() + 1)}-${pad2(dt.getUTCDate())}`;
}