import {replaceMyProfileSkills} from "../../api/profile.api.js";
import {toaster} from "../../ui/toaster.jsx";
import {Box, Button, Heading, Stack, Text, Textarea} from "@chakra-ui/react";

export function ProfileEditSkillsSection({skills, skillsArray, setSkills, isLoading, setIsLoading, refresh}) {
    const handleSaveSkills = async () => {
        setIsLoading(true);
        try {
            const res = await replaceMyProfileSkills({skills: skillsArray});

            if (!res.ok) {
                toaster.create({description: res.message || "Failed to save skills.", type: "error", closable: true});
                return;
            }

            toaster.create({description: "Skills saved.", type: "success", closable: true});
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
                <Heading size="md">Skills</Heading>
                <Text color="text.secondary">
                    Comma-separated.
                </Text>
                <Textarea
                    placeholder="C#, .NET, React, Kafka..."
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                />
                <Button onClick={handleSaveSkills} isLoading={isLoading} alignSelf="flex-start">
                    Save skills
                </Button>
            </Stack>
        </Box>
    );
}