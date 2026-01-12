import {Box, Button, Heading, Input, Stack} from "@chakra-ui/react";
import {LabeledInput} from "./LabeledField.jsx";
import {updateMyProfileContacts} from "../../api/profile.api.js";
import {toaster} from "../../ui/toaster.jsx";

export function ProfileEditContactsSection({contacts, setContacts, isLoading, setIsLoading, refresh}) {
    const handleSaveContacts = async () => {
        setIsLoading(true);
        try {
            const payload = {
                email: contacts.email.trim(),
                phone: contacts.phone?.trim() || null,
                website: contacts.website?.trim() || null,
                location: (contacts.location?.city || contacts.location?.country)
                    ? {city: contacts.location.city || null, country: contacts.location.country || null}
                    : null,
                socialLinks: contacts.socialLinks ?? {},
            };

            const res = await updateMyProfileContacts(payload);

            if (!res.ok) {
                toaster.create({description: res.message || "Failed to save contacts.", type: "error", closable: true});
                return;
            }

            toaster.create({description: "Contacts saved.", type: "success", closable: true});
            await refresh();
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Box
            bg="bg.card"
            p={{base: 4, md: 6}}
            borderRadius="card"
            border="1px solid"
            borderColor="border.subtle"
            boxShadow="soft"
        >
            <Stack gap={3}>
                <Heading size="md">Contacts</Heading>

                <LabeledInput
                    label="Email"
                    value={contacts.email}
                    type="email"
                    onChange={(e) => setContacts({...contacts, email: e.target.value})}
                />
                <LabeledInput
                    label="Phone"
                    value={contacts.phone}
                    type="tel"
                    onChange={(e) => setContacts({...contacts, phone: e.target.value})}
                />
                <LabeledInput
                    label="Website"
                    value={contacts.website}
                    type="url"
                    onChange={(e) => setContacts({...contacts, website: e.target.value})}
                />
                <LabeledInput
                    label="City"
                    value={contacts.location.city}
                    type="text"
                    onChange={(e) => setContacts({...contacts, location: {...contacts.location, city: e.target.value}})}
                />
                <LabeledInput
                    label="Country"
                    value={contacts.location.country}
                    type="text"
                    onChange={(e) => setContacts({...contacts, location: {...contacts.location, country: e.target.value}})}
                />

                <Button onClick={handleSaveContacts} isLoading={isLoading} alignSelf="flex-start">
                    Save contacts
                </Button>
            </Stack>
        </Box>
    );
}