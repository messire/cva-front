import {
    Button,
    DialogActionTrigger,
    DialogBody,
    DialogCloseTrigger,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogRoot,
    DialogTitle,
    DialogTrigger,
    Stack,
    Text,
    Input
} from "@chakra-ui/react";
import {useState} from "react";
import {useProfileStore} from "../../model/profile.store.js";
import {toaster} from "../../../../shared/ui/toaster.jsx";

export function SocialLinksEditModal({profile}) {
    const [telegram, setTelegram] = useState(profile.socialLinks?.telegram || "");
    const [linkedIn, setLinkedIn] = useState(profile.socialLinks?.linkedIn || "");
    const [gitHub, setGitHub] = useState(profile.socialLinks?.gitHub || "");
    const [twitter, setTwitter] = useState(profile.socialLinks?.twitter || "");
    const [open, setOpen] = useState(false);
    const updateContacts = useProfileStore(s => s.updateContacts);

    const handleSave = async () => {
        const res = await updateContacts({
            email: profile.email,
            phone: profile.phone,
            website: profile.website,
            location: profile.location,
            socialLinks: {
                telegram: telegram.trim() || null,
                linkedIn: linkedIn.trim() || null,
                gitHub: gitHub.trim() || null,
                twitter: twitter.trim() || null
            }
        });

        if (res.ok) {
            toaster.create({title: "Social links updated", type: "success"});
            setOpen(false);
        } else {
            toaster.create({title: "Failed to update social links", description: res.message, type: "error"});
        }
    };

    return (
        <DialogRoot open={open} onOpenChange={(e) => setOpen(e.open)}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="xs" colorPalette="blue">Edit Socials</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Social Links</DialogTitle>
                </DialogHeader>
                <DialogBody pb="4">
                    <Stack gap="4">
                        <Stack gap="2">
                            <Text fontSize="sm" fontWeight="medium">Telegram</Text>
                            <Input value={telegram} onChange={e => setTelegram(e.target.value)} />
                        </Stack>
                        <Stack gap="2">
                            <Text fontSize="sm" fontWeight="medium">LinkedIn</Text>
                            <Input value={linkedIn} onChange={e => setLinkedIn(e.target.value)} />
                        </Stack>
                        <Stack gap="2">
                            <Text fontSize="sm" fontWeight="medium">GitHub</Text>
                            <Input value={gitHub} onChange={e => setGitHub(e.target.value)} />
                        </Stack>
                        <Stack gap="2">
                            <Text fontSize="sm" fontWeight="medium">Twitter/X</Text>
                            <Input value={twitter} onChange={e => setTwitter(e.target.value)} />
                        </Stack>
                    </Stack>
                </DialogBody>
                <DialogFooter>
                    <DialogActionTrigger asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogActionTrigger>
                    <Button onClick={handleSave}>Save</Button>
                </DialogFooter>
                <DialogCloseTrigger />
            </DialogContent>
        </DialogRoot>
    );
}
