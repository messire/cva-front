import {Box, Button, Heading, Stack} from "@chakra-ui/react";
import {LabeledInput} from "./LabeledField.jsx";
import {updateMyProfileHeader} from "../../api/profile.api.js";
import {toaster} from "../../ui/toaster.jsx";

export function ProfileEditHeaderSection({header, setHeader, isLoading, setIsLoading, refresh}) {
    const handleSaveHeader = async () => {
        setIsLoading(true);
        try {
            const res = await updateMyProfileHeader({
                firstName: header.firstName.trim(),
                lastName: header.lastName.trim(),
                role: header.role?.trim() || "",
                avatarUrl: header.avatarUrl?.trim() || null,
                openToWork: Boolean(header.openToWork),
                yearsOfExperience: Number(header.yearsOfExperience || 0),
                verificationStatus: header.verificationStatus ?? "NotVerified",
            });

            if (!res.ok) {
                toaster.create({description: res.message || "Failed to save header.", type: "error", closable: true});
                return;
            }

            toaster.create({description: "Header saved.", type: "success", closable: true});
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
                <Heading size="md">Personal details</Heading>

                <LabeledInput
                    label="First name"
                    value={header.firstName}
                    type="text"
                    onChange={(e) => setHeader({...header, firstName: e.target.value})}/>
                <LabeledInput
                    label="Last name"
                    value={header.lastName}
                    type="text"
                    onChange={(e) => setHeader({...header, lastName: e.target.value})}/>
                <LabeledInput
                    label="Role"
                    value={header.role}
                    type="text"
                    onChange={(e) => setHeader({...header, role: e.target.value})}/>
                <LabeledInput
                    label="Avatar URL"
                    value={header.avatarUrl}
                    type="text"
                    onChange={(e) => setHeader({...header, avatarUrl: e.target.value})}/>
                <LabeledInput
                    label="Years of experience"
                    value={header.yearsOfExperience}
                    type="number"
                    onChange={(e) => setHeader({...header, yearsOfExperience: Number(e.target.value || 0)})}
                />

                <Button onClick={handleSaveHeader} isLoading={isLoading} alignSelf="flex-start">
                    Save header
                </Button>
            </Stack>
        </Box>
    );
}