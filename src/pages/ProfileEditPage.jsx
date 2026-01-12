import {Container, Heading, Spinner, Stack, Text, VStack} from "@chakra-ui/react";
import {useEffect, useMemo, useState} from "react";
import {Navigate, useNavigate} from "react-router-dom";

import {useAuthStore} from "../stores/auth.store.js";
import {fetchMyProfile} from "../api/profile.api.js";
import {DeveloperProfileDetails} from "../models/DeveloperProfileDetails.js";
import {toaster} from "../ui/toaster.jsx";
import {ProfileEditHeaderSection} from "../components/ui/ProfileEditHeaderSection.jsx";
import {ProfileEditContactsSection} from "../components/ui/ProfileEditContactsSection.jsx";
import {ProfileEditSummarySection} from "../components/ui/ProfileEditSummarySection.jsx";
import {ProfileEditSkillsSection} from "../components/ui/ProfileEditSkillsSection.jsx";

const ProfileEditPage = () => {
    const navigate = useNavigate();
    const isAuthenticated = useAuthStore(s => Boolean(s.accessToken || s.refreshToken));

    const [isLoading, setIsLoading] = useState(true);
    const [profile, setProfile] = useState(null);

    const mapProfileToHeader = (profile) => ({
        firstName: profile.firstName ?? "",
        lastName: profile.lastName ?? "",
        role: profile.role ?? "",
        avatarUrl: profile.avatarUrl ?? "",
        openToWork: Boolean(profile.openToWork),
        yearsOfExperience: Number(profile.yearsOfExperience || 0),
        verificationStatus: profile.verificationStatus ?? "NotVerified",
    });
    const [header, setHeader] = useState({
        firstName: "",
        lastName: "",
        role: "",
        avatarUrl: "",
        openToWork: false,
        yearsOfExperience: 0,
        verificationStatus: "NotVerified",
    });

    const mapProfileToContacts = (profile) => ({
        email: profile.email ?? "",
        phone: profile.phone ?? "",
        website: profile.website ?? "",
        location: {
            city: profile.location?.city ?? "",
            country: profile.location?.country ?? "",
        },
        socialLinks: profile.socialLinks ?? {},
    });
    const [contacts, setContacts] = useState({
        email: "",
        phone: "",
        website: "",
        location: {city: "", country: ""},
        socialLinks: {},
    });

    const mapProfileToSummary = (profile) => profile.summary ?? "";
    const [summary, setSummary] = useState("");

    const mapProfileToSkillsText = (profile) => Array.isArray(profile.skills) ? profile.skills.join(", ") : "";
    const [skillsText, setSkillsText] = useState("");
    const skillsArray = useMemo(() => {
        return String(skillsText ?? "")
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

                const profile = DeveloperProfileDetails.fromApi(res.data);
                setProfile(profile);

                setHeader(mapProfileToHeader(profile));
                setContacts(mapProfileToContacts(profile));
                setSummary(mapProfileToSummary(profile));
                setSkillsText(mapProfileToSkillsText(profile));
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
                        <ProfileEditHeaderSection
                            header={header}
                            setHeader={setHeader}
                            isLoading={isLoading}
                            setIsLoading={setIsLoading}
                            refresh={refresh}
                        />

                        <ProfileEditContactsSection
                            contacts={contacts}
                            setContacts={setContacts}
                            isLoading={isLoading}
                            setIsLoading={setIsLoading}
                            refresh={refresh}
                        />
                        <ProfileEditSummarySection
                            summary={summary}
                            setSummary={setSummary}
                            isLoading={isLoading}
                            setIsLoading={setIsLoading}
                            refresh={refresh}
                        />
                        <ProfileEditSkillsSection
                            skills={skillsText}
                            skillsArray={skillsArray}
                            setSkills={setSkillsText}
                            isLoading={isLoading}
                            setIsLoading={setIsLoading}
                            refresh={refresh}
                        />
                    </>
                )}
            </Stack>
        </Container>
    );
};

export default ProfileEditPage;