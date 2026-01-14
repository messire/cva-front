import {Dialog} from "@chakra-ui/react";

function _ProfileDialogShell({title, children, footer, open, onOpenChange, trigger}) {
    return (
        <Dialog.Root
            open={open}
            onOpenChange={onOpenChange}
            size="lg"
            key="center"
            placement="center"
            motionPreset="slide-in-bottom"
            portalled
        >
            {trigger}
            <Dialog.Backdrop bg="blackAlpha.600" zIndex="modal"/>
            <Dialog.Positioner zIndex="modal">
                <Dialog.Content>
                    <Dialog.Header>
                        <Dialog.Title>{title}</Dialog.Title>
                    </Dialog.Header>
                    <Dialog.Body pb="4">
                        {children}
                    </Dialog.Body>
                    {footer}
                    <Dialog.CloseTrigger/>
                </Dialog.Content>
            </Dialog.Positioner>
        </Dialog.Root>
    );
}

export default _ProfileDialogShell
