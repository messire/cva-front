import {Button, Dialog, Stack, Text, VStack} from "@chakra-ui/react";
import {useEffect, useState} from "react";

import ProfilePhoto from "../../../../shared/ui/ProfilePhoto.jsx";
import {useProfileStore} from "../../model/profile.store.js";
import {toaster} from "../../../../shared/ui/toaster.jsx";
import _ProfileDialogShell from "./_ProfileDialogShell.jsx";
import ImageFileField from "../../../../shared/ui/ImageFileField.jsx";

export function AvatarEditModal({currentAvatarUrl}) {
    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [open, setOpen] = useState(false);

    const uploadAvatar = useProfileStore(s => s.uploadAvatar);

    useEffect(() => {
        if (!file) {
            setPreviewUrl(null);
            return;
        }

        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
        return () => URL.revokeObjectURL(url);
    }, [file]);

    const handleSave = async () => {
        if (!file) {
            toaster.create({
                title: "No file selected",
                description: "Please select an image file to upload.",
                type: "warning"
            });
            return;
        }

        const res = await uploadAvatar(file);

        if (res.ok) {
            toaster.create({
                title: "Avatar updated",
                type: "success"
            });
            setOpen(false);
            setFile(null);
            return;
        }

        toaster.create({
            title: "Avatar upload failed",
            description: res.message,
            type: "error"
        });
    };

    const trigger = (
        <Dialog.Trigger asChild>
            <Button variant="plain" size="xs">
                Change Photo
            </Button>
        </Dialog.Trigger>
    );

    const footer = (
        <Dialog.Footer>
            <Dialog.ActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
            </Dialog.ActionTrigger>
            <Button onClick={handleSave}>Save</Button>
        </Dialog.Footer>
    );

    return (
        <_ProfileDialogShell
            title="Update Avatar"
            open={open}
            onOpenChange={(e) => setOpen(e.open)}
            trigger={trigger}
            footer={footer}
        >
            <Stack gap="4">
                <VStack align="center" py="4">
                    <Text fontSize="sm" mb="2">Preview</Text>
                    <ProfilePhoto avatarUrl={currentAvatarUrl} size="lg"/>
                </VStack>

                <ImageFileField
                    label="Upload avatar"
                    helperText="Supported formats: JPEG, PNG, WebP. Upload a file from your device."
                    maxBytes={500 * 1024}
                    initialUrl={currentAvatarUrl}
                    value={file}
                    onChange={setFile}
                    onError={(message) =>
                        toaster.create({
                            title: "Invalid file",
                            description: message,
                            type: "error"
                        })
                    }
                />
            </Stack>
        </_ProfileDialogShell>
    );
}