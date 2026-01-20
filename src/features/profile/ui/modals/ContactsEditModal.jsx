import {Button, Dialog, Stack, Text, Input} from "@chakra-ui/react";
import {useState} from "react";

import {useProfileStore} from "../../model/profile.store.js";
import {toaster} from "../../../../shared/ui/toaster.jsx";
import _ProfileDialogShell from "./_ProfileDialogShell.jsx";

import {Icons} from "../../../../shared/ui/icons.js";

export function ContactsEditModal({profile}) {
    const [open, setOpen] = useState(false);

    const [email, setEmail] = useState(profile.email || "");
    const [phone, setPhone] = useState(profile.phone || "");
    const [website, setWebsite] = useState(profile.website || "");
    const [city, setCity] = useState(profile.location?.city || "");
    const [country, setCountry] = useState(profile.location?.country || "");

    const updateContacts = useProfileStore(s => s.updateContacts);

    const onOpenChange = (e) => {
        setOpen(e.open);

        if (e.open) {
            setEmail(profile.email || "");
            setPhone(profile.phone || "");
            setWebsite(profile.website || "");
            setCity(profile.location?.city || "");
            setCountry(profile.location?.country || "");
        }
    };

    const handleSave = async () => {
        const res = await updateContacts({
            email: email.trim(),
            phone: phone.trim(),
            website: website.trim(),
            location: {
                ...(profile.location ?? {}),
                city: city.trim(),
                country: country.trim(),
            },
            socialLinks: profile.socialLinks,
        });

        if (res.ok) {
            toaster.create({title: "Contacts updated", type: "success"});
            setOpen(false);
        } else {
            toaster.create({
                title: "Failed to update contacts",
                description: res.message,
                type: "error",
            });
        }
    };

    const trigger = (
        <Dialog.Trigger asChild>
            <Button variant="ghost" size="xs"><Icons.Edit/></Button>
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
            title="Edit Contacts"
            open={open}
            onOpenChange={onOpenChange}
            trigger={trigger}
            footer={footer}
        >
            <Stack gap="4">
                <Stack gap="2">
                    <Text fontSize="sm" fontWeight="medium">Email</Text>
                    <Input value={email} onChange={e => setEmail(e.target.value)}/>
                </Stack>

                <Stack gap="2">
                    <Text fontSize="sm" fontWeight="medium">Country</Text>
                    <Input value={country} onChange={e => setCountry(e.target.value)}/>
                </Stack>

                <Stack gap="2">
                    <Text fontSize="sm" fontWeight="medium">City</Text>
                    <Input value={city} onChange={e => setCity(e.target.value)}/>
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
        </_ProfileDialogShell>
    );
}