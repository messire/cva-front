import {Box, Flex, Spinner, Text, VStack} from "@chakra-ui/react";
import {useParams} from "react-router-dom";
import {useEffect} from "react";

import {useCatalogStore} from "../../../catalog/model/catalog.store.js";
import {useProfileStore} from "../../model/profile.store.js";
import {useAuthStore} from "../../../auth/model/auth.store.js";
import {tryGetJwtSub} from "../../../../shared/utils/jwt.js";

import ProfileHeroCard from "../sections/ProfileHeroCard.jsx";
import ContactsSection from "../sections/ContactsSection.jsx";
import SkillsSection from "../sections/SkillsSection.jsx";
import ExperienceSection from "../sections/ExperienceSection.jsx";
import ProjectsSection from "../sections/ProjectsSection.jsx";

const ProfilePage = () => {
    const {id} = useParams();

    const accessToken = useAuthStore(s => s.accessToken);
    const currentUserId = tryGetJwtSub(accessToken);
    const isOwner = Boolean(currentUserId && id && currentUserId === id);

    const catalogProfile = useCatalogStore((s) => (id ? s.profileDetails?.[id] : null));
    const fetchProfileDetails = useCatalogStore((s) => s.fetchProfileDetails);

    const myProfile = useProfileStore(s => s.myProfile);
    const loadMyProfile = useProfileStore(s => s.loadMyProfile);

    const profile = isOwner ? myProfile : catalogProfile;
    const hasProjects = Array.isArray(profile?.projects || []) && profile?.projects?.length > 0;
    const hasWorks = Array.isArray(profile?.workExperience || []) && profile?.workExperience?.length > 0;

    const profileSkills = Array.isArray(profile?.skills) ? profile.skills : [];
    const experiences = Array.isArray(profile?.workExperience) ? profile.workExperience : [];

    const hasSkillsFromProfile = profileSkills.some(s => String(s ?? "").trim().length > 0);

    const hasSkillsFromExperience = experiences.some(exp =>
        Array.isArray(exp?.techStack) &&
        exp.techStack.some(t => String(t ?? "").trim().length > 0)
    );

    const hasAnySkills = hasSkillsFromProfile || hasSkillsFromExperience;

    useEffect(() => {
        if (!id) return;

        if (isOwner && !myProfile) {
            void loadMyProfile();
            return;
        }

        if (!isOwner && !catalogProfile) {
            void fetchProfileDetails(id);
        }
    }, [id, isOwner, myProfile, catalogProfile, loadMyProfile, fetchProfileDetails]);

    if (!id) {
        return null;
    }

    if (!profile) {
        return (
            <VStack py={10}>
                <Spinner size="lg"/>
                <Text>Loading profile…</Text>
            </VStack>
        );
    }

    return (
        <Box
            data-print-anchor="profile-page"
            w="full"
            maxW="6xl"
            mx="auto"
            px={{base: 4, md: 8, xl: 10}}
            py={{base: 4, md: 8}}
        >
            <VStack align="stretch" spacing={4}>
                <Flex
                    direction={{base: "column", md: "row"}}
                    gap={4}
                    align="stretch"
                >
                    <Box flex={{md: "3"}} minW={0}>
                        <ProfileHeroCard profile={profile} isOwner={isOwner}/>
                    </Box>
                    <Box
                        flex={{md: "2"}}
                        minW={{base: "auto", md: "320px"}}
                        maxW={{md: "420px"}}
                        w={{base: "full", md: "auto"}}
                    >
                        <ContactsSection profile={profile} isOwner={isOwner}/>
                    </Box>
                </Flex>
                {(isOwner || hasAnySkills) && (
                    <SkillsSection profile={profile} isOwner={isOwner}/>
                )}
                {(isOwner || hasWorks) && (
                    <ExperienceSection profile={profile} isOwner={isOwner}/>
                )}
                {(isOwner || hasProjects) && (
                    <ProjectsSection profile={profile} isOwner={isOwner}/>
                )}
            </VStack>
        </Box>
    );
};

export default ProfilePage;