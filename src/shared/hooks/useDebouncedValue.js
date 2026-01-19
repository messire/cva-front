import { useEffect, useState } from "react";

/**
 * @param {any} value - Source value
 * @param {number} delayMs - Debounce delay in milliseconds
 * @returns {any} Debounced value
 */
export function useDebouncedValue(value, delayMs) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handle = setTimeout(() => {
            setDebouncedValue(value);
        }, delayMs);

        return () => {
            clearTimeout(handle);
        };
    }, [value, delayMs]);

    return debouncedValue;
}