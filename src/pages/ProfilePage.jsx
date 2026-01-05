import {Box, GridItem, HStack, SimpleGrid, Spinner, Text, VStack} from "@chakra-ui/react";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";

import {useUserStore} from "../stores/users.store.js";

import ProfileCommon from "../components/profile/ProfileCommon.jsx";
import ProfileContacts from "../components/profile/ProfileContacts.jsx";
import ProfileSkills from "../components/profile/ProfileSkills.jsx";
import ProfileWork from "../components/profile/ProfileWork.jsx";
import ProfilePortfolio from "../components/profile/ProfileProtfolio.jsx";

const ProfilePage = () => {
    const {id} = useParams();

    const fetchUser = useUserStore((state) => state.fetchUser);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUser = async () => {
            setLoading(true);
            const result = await fetchUser(id);
            if (result.success) {
                setUser(result.data);
            }
            setLoading(false);
        };
        loadUser();
    }, [id, fetchUser]);

    if (loading) {
        return (
            <VStack py={10}>
                <Spinner size="xl"/>
                <Text>Loading profile...</Text>
            </VStack>
        );
    }

    if (!user) {
        return (
            <VStack py={10}>
                <Text fontSize="xl" color="red.500">User not found</Text>
            </VStack>
        );
    }

    return (
        <VStack
            maxW="container.lg"
            w="full"
            mx="auto"
            gap={6}
            align="stretch"
            p={{base: 4, md: 8, xl: 10}}
        >
            <HStack
                w="full"
                gap={6}
                overflowX="auto"
                pb={2}
                py={2}
            >
                <Box as="a" href="#profile" fontWeight="600" color="text.secondary" _hover={{color: "text.brand"}}>
                    Profile
                </Box>
                <Box as="a" href="#skills" fontWeight="600" color="text.secondary" _hover={{color: "text.brand"}}>
                    Skills
                </Box>
                <Box as="a" href="#work" fontWeight="600" color="text.secondary" _hover={{color: "text.brand"}}>
                    Work experience
                </Box>
                <Box as="a" href="#portfolio" fontWeight="600" color="text.secondary" _hover={{color: "text.brand"}}>
                    Portfolio
                </Box>
            </HStack>

            <SimpleGrid columns={{ base: 1, md: 3 }} gap="18px" w="full">
                <GridItem colSpan={{ base: 1, md: 2 }}>
                    <ProfileCommon user={user}/>
                </GridItem>
                <GridItem colSpan={{ base: 1, md: 1 }}>
                    <ProfileContacts user={user}/>
                </GridItem>
            </SimpleGrid>

            <Box id="skills" mt={4}>
                <ProfileSkills user={user}/>
            </Box>
            <Box id="work" mt={4}>
                <ProfileWork user={user}/>
            </Box>
            <Box id="portfolio" mt={4}>
                <ProfilePortfolio user={user}/>
            </Box>
        </VStack>
    );
}

export default ProfilePage;