import {Button, Dialog, Input, Stack, Text, VStack} from "@chakra-ui/react";
import {useState} from "react";

import ProfilePhoto from "../../../../shared/ui/ProfilePhoto.jsx";
import {useProfileStore} from "../../model/profile.store.js";
import {toaster} from "../../../../shared/ui/toaster.jsx";
import _ProfileDialogShell from "./_ProfileDialogShell.jsx";

export function AvatarEditModal({currentAvatarUrl, onSave}) {
    const [url, setUrl] = useState(currentAvatarUrl || "");
    const [open, setOpen] = useState(false);
    const updateHeader = useProfileStore(s => s.updateHeader);
    const myProfile = useProfileStore(s => s.myProfile);

    const handleSave = async () => {
        const res = await updateHeader({
            firstName: myProfile.firstName,
            lastName: myProfile.lastName,
            role: myProfile.role,
            avatarUrl: url.trim() || null,
            openToWork: myProfile.openToWork,
            yearsOfExperience: myProfile.yearsOfExperience
        });

        if (res.ok) {
            toaster.create({title: "Avatar updated", type: "success"});
            setOpen(false);
        } else {
            toaster.create({title: "Failed to update avatar", description: res.message, type: "error"});
        }
    };

    const trigger = (
        <Dialog.Trigger asChild>
            <Button variant="ghost" size="xs" colorPalette="blue">Change Photo</Button>
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
                    <ProfilePhoto avatarUrl={url} size="lg"/>
                </VStack>

                <Stack gap="2">
                    <Text fontSize="sm" fontWeight="medium">Image URL</Text>
                    <Input
                        placeholder="https://example.com/photo.jpg"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                    />
                </Stack>
            </Stack>
        </_ProfileDialogShell>
    );
}
