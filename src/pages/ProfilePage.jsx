import {Box, Button, Flex, GridItem, HStack, SimpleGrid, Spinner, Text, VStack} from "@chakra-ui/react";
import {useParams} from "react-router-dom";
import {Link as RouterLink} from "react-router-dom";
import {useEffect} from "react";

import {useCatalogStore} from "../stores/catalog.store.js";

import ProfileInfo from "../components/profile/ProfileInfo.jsx";
import ProfileContacts from "../components/profile/ProfileContacts.jsx";
import ProfileWork from "../components/profile/ProfileWork.jsx";
import ProfilePortfolio from "../components/profile/ProfileProjects.jsx";

import {tryGetJwtSub} from "../utils/jwt.js";
import {useAuthStore} from "../stores/auth.store.js";

const ProfilePage = () => {
    const {id} = useParams();
    const accessToken = useAuthStore(s => s.accessToken);
    const currentUserId = tryGetJwtSub(accessToken);
    const isOwner = Boolean(currentUserId && id && currentUserId === id);

    const profiles = useCatalogStore((s) => s.profiles);
    const fetchProfiles = useCatalogStore((s) => s.fetchProfiles);
    const profile = useCatalogStore((s) => (id ? s.profileDetails?.[id] : null));
    const fetchProfileDetails = useCatalogStore((s) => s.fetchProfileDetails);

    useEffect(() => {
        if (!id) {
            return;
        }

        if (profiles.length === 0) {
            void fetchProfiles();
        }

        if (!profile) {
            void fetchProfileDetails(id);
        }
    }, [id, profiles.length, profile, fetchProfiles, fetchProfileDetails]);

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
                <HStack gap={4}>
                    {isOwner && (
                        <Button as={RouterLink} to="/profile/edit" variant="outline" size="sm">
                            Edit my profile
                        </Button>
                    )}
                </HStack>
            </Flex>

            <SimpleGrid columns={{base: 1, md: 3}} gap="18px" w="full">
                <GridItem colSpan={{base: 1, md: 2}}>
                    <ProfileInfo profile={profile}/>
                </GridItem>
                <GridItem colSpan={{base: 1, md: 1}}>
                    <ProfileContacts profile={profile}/>
                </GridItem>
            </SimpleGrid>

            <Box id="work" mt={4}>
                <ProfileWork profile={profile}/>
            </Box>

            <Box id="portfolio" mt={4}>
                <ProfilePortfolio projects={profile.projects}/>
            </Box>
        </VStack>
    );
};

export default ProfilePage;