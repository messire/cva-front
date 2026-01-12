import {
    Button,
    DialogActionTrigger, DialogBackdrop,
    DialogBody,
    DialogCloseTrigger,
    DialogContent,
    DialogFooter,
    DialogHeader, DialogPositioner,
    DialogRoot,
    DialogTitle,
    DialogTrigger,
    Input,
    Stack,
    Text,
    VStack
} from "@chakra-ui/react";
import {useState} from "react";
import ProfilePhoto from "../ui/ProfilePhoto.jsx";
import {useProfileStore} from "../../stores/profile.store.js";
import {toaster} from "../../ui/toaster.jsx";

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

    return (
        <DialogRoot open={open} onOpenChange={(e) => setOpen(e.open)}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="xs" colorPalette="blue">Change Photo</Button>
            </DialogTrigger>
            <DialogBackdrop bg="blackAlpha.600"/>
            <DialogPositioner>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Update Avatar</DialogTitle>
                    </DialogHeader>
                    <DialogBody pb="4">
                        <Stack gap="4">
                            <VStack align="center" py="4">
                                <Text fontSize="sm" mb="2">Preview</Text>
                                <ProfilePhoto avatarUrl={url} size="lg"/>
                            </VStack>
                            <Stack gap="2">
                                <Text fontSize="sm" fontWeight="medium">Avatar URL</Text>
                                <Input
                                    placeholder="https://example.com/photo.jpg"
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                />
                            </Stack>
                        </Stack>
                    </DialogBody>
                    <DialogFooter>
                        <DialogActionTrigger asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogActionTrigger>
                        <Button onClick={handleSave}>Save</Button>
                    </DialogFooter>
                    <DialogCloseTrigger/>
                </DialogContent>
            </DialogPositioner>
        </DialogRoot>
    );
}
