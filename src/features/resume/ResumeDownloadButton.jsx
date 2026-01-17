import { Button } from "@chakra-ui/react";

import {Icons} from "../../shared/ui/icons.js";
const API_BASE = (import.meta.env.VITE_API_BASE_URL ?? "").replace(/\/+$/, "");

export const ResumeDownloadButton = ({
                                         profileId,
                                         mode = "open", // "open" | "download"
                                         label,
                                         size = "sm",
                                         variant = "outline",
                                         ...props
                                     }) => {
    const href = profileId
        ? `${API_BASE}/api/catalog/${profileId}/resume.pdf${mode === "download" ? "?download=1" : ""}`
        : null;

    const isOpenMode = mode === "open";
    const text = label ?? (isOpenMode ? "Open resume" : "Download resume");

    return (
        <Button
            as="a"
            href={href || undefined}
            target={isOpenMode ? "_blank" : undefined}
            rel={isOpenMode ? "noopener noreferrer" : undefined}
            isDisabled={!href}
            size={size}
            variant={variant}
            gap={2}
            {...props}
        >
            <Icons.Download />
            {text}
        </Button>
    );
};

export default ResumeDownloadButton;