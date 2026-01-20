import {Field, Input} from "@chakra-ui/react";
import {stripProtocol, validateStripped} from "../../../../shared/utils/socialLink.js";

export function SocialLinkField({label, placeholder, value, error, onChangeStripped, onErrorChange,}) {
    const handleChange = (e) => {
        const normalized = stripProtocol(e.target.value);
        onChangeStripped(normalized);

        if (onErrorChange) {
            const v = validateStripped(normalized);
            onErrorChange(v.ok ? "" : v.message);
        }
    };

    return (
        <Field.Root invalid={!!error}>
            <Field.Label color={error ? "red.500" : undefined}>{label}</Field.Label>
            <Input
                value={value}
                onChange={handleChange}
                placeholder={placeholder}
            />

            {error && <Field.ErrorText>{error}</Field.ErrorText>}
        </Field.Root>
    );
}