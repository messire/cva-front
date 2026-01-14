import {Box, Button, Container, Heading, HStack, Input, Spinner, Stack, Text, VStack} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import {Navigate, useNavigate} from "react-router-dom";

import {useAuthStore} from "../../../auth/model/auth.store.js";
import {fetchMyProfile, createMyProfile} from "../../api/profile.api.js";
import {toaster} from "../../../../shared/ui/toaster.jsx";

const ProfileCreatePage = () => {
    const navigate = useNavigate();
    const isAuthenticated = useAuthStore(s => Boolean(s.accessToken || s.refreshToken));

    const [isLoading, setIsLoading] = useState(true);
    const [allowCreate, setAllowCreate] = useState(false);

    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
    });

    useEffect(() => {
        if (!isAuthenticated) return;

        const run = async () => {
            setIsLoading(true);
            try {
                const res = await fetchMyProfile();

                if (res.ok) {
                    navigate(`/u/${res.data.id}`, {replace: true});
                    return;
                }

                if (!res.ok && res.status === 404) {
                    setAllowCreate(true);
                    return;
                }

                toaster.create({
                    description: res.message || "Failed to check profile.",
                    type: "error",
                    closable: true,
                });
            } finally {
                setIsLoading(false);
            }
        };

        void run();
    }, [isAuthenticated, navigate]);

    if (!isAuthenticated) return <Navigate to="/" replace/>;

    const handleCreate = async () => {
        if (!form.firstName.trim() || !form.lastName.trim() || !form.email.trim()) {
            toaster.create({description: "First name, last name and email are required.", type: "error", closable: true});
            return;
        }

        setIsLoading(true);
        try {
            const payload = {
                firstName: form.firstName.trim(),
                lastName: form.lastName.trim(),
                email: form.email.trim(),
                role: null,
                summary: null,
                avatarUrl: null,
                openToWork: false,
                yearsOfExperience: Number(form.yearsOfExperience || 0),
                phone: null,
                website: null,
                location: null,
                socialLinks: null,
            };

            const res = await createMyProfile(payload);

            if (!res.ok) {
                toaster.create({description: res.message || "Create failed.", type: "error", closable: true});
                return;
            }

            toaster.create({description: "Profile created.", type: "success", closable: true});
            navigate(`/u/${res.data.id}`, {replace: true});
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Container maxW="container.sm">
            <Stack gap={6} py={{base: 4, md: 8}}>
                <Heading size="xl">Create profile</Heading>

                {isLoading && !allowCreate ? (
                    <VStack py={10}>
                        <Spinner size="lg"/>
                        <Text color="text.secondary">Checking…</Text>
                    </VStack>
                ) : (
                    <Box
                        bg="bg.card"
                        p={{base: 4, md: 6}}
                        borderRadius="card"
                        border="1px solid"
                        borderColor="border.subtle"
                        boxShadow="soft"
                    >
                        <VStack gap={4}>
                            <HStack gap={4} justify="center">
                                <Text mt="2" fontSize="14px" color="text.secondary" w="150px" align="right">
                                    Your name:
                                </Text>
                                <Input
                                    placeholder="First name"
                                    value={form.firstName}
                                    onChange={(e) => setForm({...form, firstName: e.target.value})}
                                />
                            </HStack>
                            <HStack gap={4} justify="center">
                                <Text mt="2" fontSize="14px" color="text.secondary" w="150px" align="right">
                                    Your surname:
                                </Text>
                                <Input
                                    placeholder="Last name"
                                    value={form.lastName}
                                    onChange={(e) => setForm({...form, lastName: e.target.value})}
                                />
                            </HStack>
                            <HStack gap={4} justify="center">
                                <Text mt="2" fontSize="14px" color="text.secondary" w="150px" align="right">
                                    Your email:
                                </Text>
                                <Input
                                    placeholder="Email"
                                    type="email"
                                    value={form.email}
                                    onChange={(e) => setForm({...form, email: e.target.value})}
                                />
                            </HStack>

                            <Button
                                bg="text.brand"
                                color="white"
                                borderRadius="button"
                                onClick={handleCreate}
                                isLoading={isLoading}
                                _hover={{opacity: 0.9}}
                            >
                                Create
                            </Button>
                        </VStack>
                    </Box>
                )}
            </Stack>
        </Container>
    );
};

export default ProfileCreatePage;
