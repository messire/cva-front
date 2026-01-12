import {updateMyProfileSummary} from "../../api/profile.api.js";
import {toaster} from "../../ui/toaster.jsx";
import {Box, Button, Heading, Stack, Textarea} from "@chakra-ui/react";

export function ProfileEditSummarySection({summary, setSummary, isLoading, setIsLoading, refresh}) {
    const handleSaveSummary = async () => {
        setIsLoading(true);
        try {
            const res = await updateMyProfileSummary({summary});

            if (!res.ok) {
                toaster.create({description: res.message || "Failed to save summary.", type: "error", closable: true});
                return;
            }

            toaster.create({description: "Summary saved.", type: "success", closable: true});
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
                <Heading size="md">Summary</Heading>
                <Textarea
                    placeholder="Write something convincing."
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                />
                <Button onClick={handleSaveSummary} isLoading={isLoading} alignSelf="flex-start">
                    Save summary
                </Button>
            </Stack>
        </Box>
    );
}