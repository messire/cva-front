import {Box, Button, Container, Heading, Input, Spinner, Stack, Text, Textarea, VStack} from "@chakra-ui/react";
import {useEffect, useMemo, useState} from "react";
import {Navigate, useNavigate} from "react-router-dom";

import {useAuthStore} from "../stores/auth.store.js";
import {fetchMyProfile, updateMyProfileHeader, updateMyProfileSummary, updateMyProfileContacts, replaceMyProfileSkills} from "../api/profile.api.js";
import {DeveloperProfileDetails} from "../models/DeveloperProfileDetails.js";
import {toaster} from "../ui/toaster.jsx";

const ProfileEditPage = () => {
    const navigate = useNavigate();
    const isAuthenticated = useAuthStore(s => Boolean(s.accessToken || s.refreshToken));

    const [isLoading, setIsLoading] = useState(true);
    const [profile, setProfile] = useState(null);

    const [header, setHeader] = useState({
        firstName: "",
        lastName: "",
        role: "",
        avatarUrl: "",
        openToWork: false,
        yearsOfExperience: 0,
        verificationStatus: "NotVerified",
    });

    const [summary, setSummary] = useState("");
    const [contacts, setContacts] = useState({
        email: "",
        phone: "",
        website: "",
        location: {city: "", country: ""},
        socialLinks: {},
    });

    const [skillsText, setSkillsText] = useState("");

    const skillsArray = useMemo(() => {
        return (skillsText || "")
            .split(",")
            .map(s => s.trim())
            .filter(Boolean);
    }, [skillsText]);

    useEffect(() => {
        if (!isAuthenticated) return;

        const run = async () => {
            setIsLoading(true);
            try {
                const res = await fetchMyProfile();

                if (!res.ok && res.status === 404) {
                    navigate("/profile/create", {replace: true});
                    return;
                }

                if (!res.ok) {
                    toaster.create({description: res.message || "Failed to load profile.", type: "error", closable: true});
                    return;
                }

                const p = DeveloperProfileDetails.fromApi(res.data);
                setProfile(p);

                setHeader({
                    firstName: p.firstName ?? "",
                    lastName: p.lastName ?? "",
                    role: p.role ?? "",
                    avatarUrl: p.avatarUrl ?? "",
                    openToWork: Boolean(p.openToWork),
                    yearsOfExperience: Number(p.yearsOfExperience || 0),
                    verificationStatus: p.verificationStatus ?? "NotVerified",
                });

                setSummary(p.summary ?? "");

                setContacts({
                    email: p.email ?? "",
                    phone: p.phone ?? "",
                    website: p.website ?? "",
                    location: {
                        city: p.location?.city ?? "",
                        country: p.location?.country ?? "",
                    },
                    socialLinks: p.socialLinks ?? {},
                });

                setSkillsText(Array.isArray(p.skills) ? p.skills.join(", ") : "");
            } finally {
                setIsLoading(false);
            }
        };

        void run();
    }, [isAuthenticated, navigate]);

    if (!isAuthenticated) return <Navigate to="/" replace/>;

    const refresh = async () => {
        const res = await fetchMyProfile();
        if (res.ok) {
            const p = DeveloperProfileDetails.fromApi(res.data);
            setProfile(p);
        }
    };

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
        <Container maxW="container.md">
            <Stack gap={6} py={{base: 4, md: 8}}>
                <Heading size="xl">Edit profile</Heading>

                {isLoading && !profile ? (
                    <VStack py={10}>
                        <Spinner size="lg"/>
                        <Text color="text.secondary">Loading…</Text>
                    </VStack>
                ) : (
                    <>
                        <Box
                            bg="bg.card"
                            p={{base: 4, md: 6}}
                            borderRadius="card"
                            border="1px solid"
                            borderColor="border.subtle"
                            boxShadow="soft"
                        >
                            <Stack gap={3}>
                                <Heading size="md">Header</Heading>
                                <Stack direction={{base: "column", md: "row"}} gap={3}>
                                    <Input
                                        placeholder="First name"
                                        value={header.firstName}
                                        onChange={(e) => setHeader({...header, firstName: e.target.value})}
                                    />
                                    <Input
                                        placeholder="Last name"
                                        value={header.lastName}
                                        onChange={(e) => setHeader({...header, lastName: e.target.value})}
                                    />
                                </Stack>
                                <Input
                                    placeholder="Role"
                                    value={header.role}
                                    onChange={(e) => setHeader({...header, role: e.target.value})}
                                />
                                <Input
                                    placeholder="Avatar URL"
                                    value={header.avatarUrl}
                                    onChange={(e) => setHeader({...header, avatarUrl: e.target.value})}
                                />
                                <Input
                                    placeholder="Years of experience"
                                    type="number"
                                    value={header.yearsOfExperience}
                                    onChange={(e) => setHeader({...header, yearsOfExperience: Number(e.target.value || 0)})}
                                />

                                <Button onClick={handleSaveHeader} isLoading={isLoading} alignSelf="flex-start">
                                    Save header
                                </Button>
                            </Stack>
                        </Box>

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

                                <Input
                                    placeholder="Email"
                                    type="email"
                                    value={contacts.email}
                                    onChange={(e) => setContacts({...contacts, email: e.target.value})}
                                />
                                <Stack direction={{base: "column", md: "row"}} gap={3}>
                                    <Input
                                        placeholder="Phone"
                                        value={contacts.phone}
                                        onChange={(e) => setContacts({...contacts, phone: e.target.value})}
                                    />
                                    <Input
                                        placeholder="Website"
                                        value={contacts.website}
                                        onChange={(e) => setContacts({...contacts, website: e.target.value})}
                                    />
                                </Stack>

                                <Stack direction={{base: "column", md: "row"}} gap={3}>
                                    <Input
                                        placeholder="City"
                                        value={contacts.location.city}
                                        onChange={(e) => setContacts({
                                            ...contacts,
                                            location: {...contacts.location, city: e.target.value}
                                        })}
                                    />
                                    <Input
                                        placeholder="Country"
                                        value={contacts.location.country}
                                        onChange={(e) => setContacts({
                                            ...contacts,
                                            location: {...contacts.location, country: e.target.value}
                                        })}
                                    />
                                </Stack>

                                <Button onClick={handleSaveContacts} isLoading={isLoading} alignSelf="flex-start">
                                    Save contacts
                                </Button>
                            </Stack>
                        </Box>

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
                                    value={skillsText}
                                    onChange={(e) => setSkillsText(e.target.value)}
                                />
                                <Button onClick={handleSaveSkills} isLoading={isLoading} alignSelf="flex-start">
                                    Save skills
                                </Button>
                            </Stack>
                        </Box>
                    </>
                )}
            </Stack>
        </Container>
    );
};

export default ProfileEditPage;