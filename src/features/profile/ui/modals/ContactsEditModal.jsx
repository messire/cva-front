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
    Input, DialogBackdrop, DialogPositioner
} from "@chakra-ui/react";
import {useState} from "react";
import {useProfileStore} from "../../model/profile.store.js";
import {toaster} from "../../../../shared/ui/toaster.jsx";

export function ContactsEditModal({profile}) {
    const [email, setEmail] = useState(profile.email || "");
    const [phone, setPhone] = useState(profile.phone || "");
    const [website, setWebsite] = useState(profile.website || "");
    const [open, setOpen] = useState(false);
    const updateContacts = useProfileStore(s => s.updateContacts);

    const handleSave = async () => {
        const res = await updateContacts({
            email: email.trim(),
            phone: phone.trim(),
            website: website.trim(),
            location: profile.location,
            socialLinks: profile.socialLinks
        });

        if (res.ok) {
            toaster.create({title: "Contacts updated", type: "success"});
            setOpen(false);
        } else {
            toaster.create({title: "Failed to update contacts", description: res.message, type: "error"});
        }
    };

    return (
        <DialogRoot open={open} onOpenChange={(e) => setOpen(e.open)}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="xs" colorPalette="blue">Edit Contacts</Button>
            </DialogTrigger>
            <DialogBackdrop bg="blackAlpha.600"/>
            <DialogPositioner>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Contacts</DialogTitle>
                    </DialogHeader>
                    <DialogBody pb="4">
                        <Stack gap="4">
                            <Stack gap="2">
                                <Text fontSize="sm" fontWeight="medium">Email</Text>
                                <Input value={email} onChange={e => setEmail(e.target.value)}/>
                            </Stack>
                            <Stack gap="2">
                                <Text fontSize="sm" fontWeight="medium">Phone</Text>
                                <Input value={phone} onChange={e => setPhone(e.target.value)}/>
                            </Stack>
                            <Stack gap="2">
                                <Text fontSize="sm" fontWeight="medium">Website</Text>
                                <Input value={website} onChange={e => setWebsite(e.target.value)}/>
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
