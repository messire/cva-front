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
            zIndex="modal"
            layerIndex={1000}
            portalled
        >
            {trigger}
            <Dialog.Backdrop bg="blackAlpha.600"/>
            <Dialog.Positioner>
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
