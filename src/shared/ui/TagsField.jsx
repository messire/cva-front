import React, {useMemo} from "react";
import {Box, Text} from "@chakra-ui/react";
import {TagsInput} from "@chakra-ui/react";
import {normalizeTags, mergeTagsFromText} from "../utils/tags";

/**
 * @typedef {Object} TagsFieldProps
 * @property {string} [label]
 * @property {string} [hint]
 * @property {string} [placeholder]
 * @property {string[]} value
 * @property {(next: string[]) => void} onChange
 * @property {boolean} [isDisabled]
 * @property {boolean} [isReadOnly]
 * @property {boolean} [isRequired]
 * @property {string} [size]
 * @property {number} [maxTags]
 * @property {number} [maxTagLength]
 * @property {boolean} [caseInsensitiveDedupe]
 * @property {boolean} [compact]
 */

/**
 * @param {TagsFieldProps} props
 */
export function TagsField(props) {
    const {
        label,
        hint,
        placeholder = "Type and press Enter",
        value,
        onChange,
        isDisabled,
        isReadOnly,
        isRequired,
        size = "md",
        maxTags = 50,
        maxTagLength = 64,
        caseInsensitiveDedupe = true,
        compact = false,
    } = props;

    const normalizedValue = useMemo(() => {
        return normalizeTags(value, {
            maxTags,
            maxTagLength,
            caseInsensitive: caseInsensitiveDedupe,
        });
    }, [value, maxTags, maxTagLength, caseInsensitiveDedupe]);

    const handleValueChange = (details) => {
        const next = normalizeTags(details?.value, {
            maxTags,
            maxTagLength,
            caseInsensitive: caseInsensitiveDedupe,
        });

        onChange(next);
    };

    const handlePaste = (e) => {
        if (isDisabled || isReadOnly) return;

        const text = e.clipboardData?.getData("text");
        if (!text) return;

        if (/[,\n;\t\r]/.test(text)) {
            e.preventDefault();
            const next = mergeTagsFromText(normalizedValue, text, {
                maxTags,
                maxTagLength,
                caseInsensitive: caseInsensitiveDedupe,
            });
            onChange(next);
        }
    };

    return (
        <Box w="100%" minW={compact ? "240px" : undefined}>
            {!compact && label && (
                <Text mb={1} fontWeight="semibold">
                    {label}
                    {isRequired ? " *" : ""}
                </Text>
            )}

            <TagsInput.Root
                value={normalizedValue}
                onValueChange={handleValueChange}
                size={size}
                disabled={isDisabled}
                readOnly={isReadOnly}
                variant="subtle"
            >
                <TagsInput.Control
                    minH={compact ? "40px" : undefined}
                    px={compact ? 2 : undefined}
                    gap={compact ? 1 : undefined}
                >
                    <TagsInput.Items/>
                    <TagsInput.Input placeholder={placeholder} onPaste={handlePaste}/>
                </TagsInput.Control>
            </TagsInput.Root>

            {!compact && hint && (
                <Text mt={1} fontSize="sm" color="text.secondary">
                    {hint}
                </Text>
            )}
        </Box>
    );
}

export default TagsField;