import {
    DialogBackdrop,
    DialogBody,
    DialogCloseTrigger,
    DialogContent,
    DialogHeader,
    DialogRoot,
    DialogTitle,
} from "@chakra-ui/react";

/**
 * Internal shell for profile modals to ensure consistent backdrop and layout.
 */
export function _ProfileDialogShell({
    title,
    children,
    footer,
    open,
    onOpenChange,
    trigger,
    size = "lg"
}) {
    return (
        <DialogRoot open={open} onOpenChange={onOpenChange} size={size}>
            {trigger}
            <DialogBackdrop />
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                <DialogBody pb="4">
                    {children}
                </DialogBody>
                {footer}
                <DialogCloseTrigger />
            </DialogContent>
        </DialogRoot>
    );
}
