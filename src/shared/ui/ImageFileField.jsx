import {Button, HStack, Input, Stack, Text, Image, Box} from "@chakra-ui/react";
import {useEffect, useMemo, useState} from "react";

/**
 * Simple image file picker with preview.
 *
 * @param {{
 *   label?: string,
 *   helperText?: string,
 *   maxBytes?: number,
 *   accept?: string,
 *   initialUrl?: string,
 *   isDisabled?: boolean,
 *   value?: File | null,
 *   onChange?: (file: File | null) => void,
 *   onError?: (message: string) => void,
 * }} props
 */
export default function ImageFileField({
                                           label = "Image",
                                           helperText,
                                           maxBytes,
                                           accept = "image/jpeg,image/png,image/webp",
                                           initialUrl,
                                           isDisabled = false,
                                           value,
                                           onChange,
                                           onError,
                                       }) {
    const [localFile, setLocalFile] = useState(null);
    const file = value !== undefined ? value : localFile;

    const [objectUrl, setObjectUrl] = useState(null);

    useEffect(() => {
        if (!file) {
            setObjectUrl(null);
            return;
        }

        const url = URL.createObjectURL(file);
        setObjectUrl(url);
        return () => URL.revokeObjectURL(url);
    }, [file]);

    const sizeText = useMemo(() => {
        if (!maxBytes) return null;
        const kb = Math.round(maxBytes / 1024);
        return `Max ${kb} KB`;
    }, [maxBytes]);

    const previewSrc = objectUrl || initialUrl || null;

    const setFile = (next) => {
        if (value === undefined) {
            setLocalFile(next);
        }
        onChange?.(next);
    };

    const isBadFileType = (f) => {
        const ct = (f?.type || "").toLowerCase();
        if (!ct || ct === "application/octet-stream") {
            return true;
        }

        const allowed = [
            "image/jpeg",
            "image/png",
            "image/webp",
        ];

        return !allowed.includes(ct);
    };

    const handlePick = (e) => {
        const f = e.target.files?.[0] ?? null;

        if (!f) {
            setFile(null);
            return;
        }

        if (isBadFileType(f)) {
            setFile(null);
            e.target.value = "";
            onError?.("Invalid file type. Please upload an image file (JPEG, PNG, or WebP). URLs are not supported.");
            return;
        }

        if (maxBytes && f.size > maxBytes) {
            setFile(null);
            e.target.value = "";
            onError?.(`The selected file is too large. Maximum allowed size is ${Math.round(maxBytes / 1024)} KB.`);
            return;
        }

        setFile(f);
    };

    const clear = () => setFile(null);

    return (
        <Stack gap="2">
            <HStack justify="space-between">
                <Text fontSize="sm" fontWeight="medium">{label}</Text>
                {sizeText && <Text fontSize="xs" color="fg.muted">{sizeText}</Text>}
            </HStack>

            {helperText && <Text fontSize="xs" color="fg.muted">{helperText}</Text>}

            {previewSrc && (
                <Box borderRadius="md" overflow="hidden" borderWidth="1px" borderColor="border" bg="bg.page">
                    <Image src={previewSrc} alt="preview" w="100%" maxH="200px" objectFit="cover"/>
                </Box>
            )}

            <HStack>
                <Input
                    type="file"
                    accept={accept}
                    onChange={handlePick}
                    paddingTop="6px"
                    disabled={isDisabled}
                />
                <Button variant="outline" onClick={clear} isDisabled={isDisabled || !file}>
                    Clear
                </Button>
            </HStack>
        </Stack>
    );
}