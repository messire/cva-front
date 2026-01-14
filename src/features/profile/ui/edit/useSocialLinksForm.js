import {useMemo, useState} from "react";
import {stripProtocol, toSavedUrl, validateStripped} from "../../../../shared/utils/socialLink.js";

export function useSocialLinksForm(initial) {
    const [values, setValues] = useState({
        telegram: initial?.telegram ?? "",
        linkedIn: initial?.linkedIn ?? "",
        gitHub: initial?.gitHub ?? "",
        twitter: initial?.twitter ?? "",
    });

    const [errors, setErrors] = useState({
        telegram: "",
        linkedIn: "",
        gitHub: "",
        twitter: "",
    });

    const stripped = useMemo(() => ({
        telegram: stripProtocol(values.telegram),
        linkedIn: stripProtocol(values.linkedIn),
        gitHub: stripProtocol(values.gitHub),
        twitter: stripProtocol(values.twitter),
    }), [values]);

    const setField = (key, v) => setValues(prev => ({...prev, [key]: v}));
    const setError = (key, msg) => setErrors(prev => ({...prev, [key]: msg}));

    const validateAll = () => {
        const next = {telegram: "", linkedIn: "", gitHub: "", twitter: ""};

        for (const key of Object.keys(next)) {
            const v = validateStripped(stripped[key]);
            if (!v.ok) {
                next[key] = v.message;
            }
        }

        setErrors(next);
        return Object.values(next).every(x => !x);
    };

    const buildSocialLinks = () => ({
        telegram: toSavedUrl(values.telegram),
        linkedIn: toSavedUrl(values.linkedIn),
        gitHub: toSavedUrl(values.gitHub),
        twitter: toSavedUrl(values.twitter),
    });

    return {
        values,
        errors,
        setField,
        setError,
        validateAll,
        buildSocialLinks,
    };
}