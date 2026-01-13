import {Box, Flex, GridItem, HStack, SimpleGrid, Spinner, Text, VStack} from "@chakra-ui/react";
import {useParams} from "react-router-dom";
import {useEffect} from "react";

import {useCatalogStore} from "../../../catalog/model/catalog.store.js";
import {useProfileStore} from "../../model/profile.store.js";
import {useAuthStore} from "../../../auth/model/auth.store.js";
import {tryGetJwtSub} from "../../../../shared/utils/jwt.js";

import ProfileHeroCard from "../sections/ProfileHeroCard.jsx";
import AboutSection from "../sections/AboutSection.jsx";
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

    useEffect(() => {
        if (!id) return;

        if (isOwner) {
            if (!myProfile) {
                void loadMyProfile();
            }
        } else {
            if (!catalogProfile) {
                void fetchProfileDetails(id);
            }
        }
    }, [id, isOwner, myProfile, catalogProfile, loadMyProfile, fetchProfileDetails]);

    if (!id) return null;

    if (!profile) {
        return (
            <VStack py={10}>
                <Spinner size="lg"/>
                <Text>Loading profile…</Text>
            </VStack>
        );
    }

    return (
        <VStack
            maxW="container.lg"
            w="full"
            mx="auto"
            gap={2}
            align="stretch"
            p={{base: 4, md: 8, xl: 10}}
        >
            <Flex
                h="64px"
                align="center"
                justify="space-between"
            >
                <HStack w="full" gap={6} overflowX="auto" py={2}>
                    <Box as="a" href="#profile">Profile</Box>
                    <Box as="a" href="#work" whiteSpace="nowrap" flexShrink={0}>Work experience</Box>
                    <Box as="a" href="#portfolio">Portfolio</Box>
                </HStack>
            </Flex>

            <SimpleGrid columns={{base: 1, md: 3}} gap="18px" w="full" id="profile">
                <GridItem colSpan={{base: 1, md: 2}}>
                    <VStack align="stretch" gap={4}>
                        <ProfileHeroCard profile={profile} isOwner={isOwner}/>
                        <AboutSection profile={profile} isOwner={isOwner}/>
                        <SkillsSection profile={profile} isOwner={isOwner}/>
                    </VStack>
                </GridItem>
                <GridItem colSpan={{base: 1, md: 1}}>
                    <ContactsSection profile={profile} isOwner={isOwner}/>
                </GridItem>
            </SimpleGrid>

            <Box id="work" mt={4}>
                <ExperienceSection profile={profile} isOwner={isOwner}/>
            </Box>

            <Box id="portfolio" mt={4}>
                <ProjectsSection profile={profile} isOwner={isOwner}/>
            </Box>
        </VStack>
    );
};

export default ProfilePage;