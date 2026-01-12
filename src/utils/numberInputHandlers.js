export function createInputHandlers({isNumber, onChange}) {
    const handleChange = (e) => {
        if (!isNumber) {
            onChange?.(e);
            return;
        }

        const next = e.target.value;

        if (next === "") {
            onChange?.(e);
            return;
        }

        if (/^\d+$/.test(next)) {
            onChange?.(e);
        }
    };

    const handleKeyDown = (e) => {
        if (!isNumber) return;
        const allowedKeys = new Set(["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Home", "End", "Tab",]);
        if (allowedKeys.has(e.key)) return;
        if (e.ctrlKey || e.metaKey) return;
        if (!/^\d$/.test(e.key)) {
            e.preventDefault();
        }
    };

    return {handleChange, handleKeyDown};
}