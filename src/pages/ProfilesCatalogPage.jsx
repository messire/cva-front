import {Container, Input, InputGroup, SimpleGrid, Text, VStack} from "@chakra-ui/react";
import {useEffect} from "react";

import {useCatalogStore} from "../stores/catalog.store.js";

import ProfileCard from "../components/catalog/ProfileCard.jsx";

import {Icons} from "../ui/icons";

const HomePage = () => {
    const profiles = useCatalogStore((state) => state.profiles);
    const fetchProfiles = useCatalogStore((state) => state.fetchProfiles);

    useEffect(() => {
        void fetchProfiles();
    }, [fetchProfiles]);

    return (
        <Container
            maxW="container.xl"
            py={{base: 6, md: 10}}
            px={{base: 2, md: 8}}
        >
            <VStack gap={8} align="stretch">
                <VStack align="flex-start" gap={1}>
                    <Text fontSize={{base: "32px", md: "40px"}} fontWeight="800" color="text.primary">
                        Developer profiles
                    </Text>
                    <Text mt="2" fontSize="14px" color="text.secondary">
                        Explore and connect with talented developers
                    </Text>
                </VStack>

                {/*<InputGroup*/}
                {/*    width="full"*/}
                {/*    mt="6"*/}
                {/*    startElement={<Icons.Search color="gray.400"/>}*/}
                {/*>*/}
                {/*    <Input*/}
                {/*        h="44px"*/}
                {/*        placeholder="Search by name, role, or skills..."*/}
                {/*        borderRadius="button"*/}
                {/*        bg="bg.card"*/}
                {/*        border="1px solid"*/}
                {/*        borderColor="border.subtle"*/}
                {/*        _focusVisible={{*/}
                {/*            borderColor: "text.brand",*/}
                {/*            boxShadow: "none",*/}
                {/*        }}*/}
                {/*    />*/}
                {/*</InputGroup>*/}

                <SimpleGrid
                    minChildWidth={{base: "260px", md: "300px", lg: "340px"}}
                    gap={{base: 4, md: 6}}
                    w="full"
                >
                    {profiles.map((profile) => (
                        <ProfileCard key={profile.id} profile={profile}/>
                    ))}
                </SimpleGrid>

                {profiles.length === 0 && (
                    <Text fontSize='x1'
                          textAlign={'center'}
                          fontWeight='bold'
                          color={'gray.500'}
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          gap={2}>
                        No CV found
                        <span style={{color: 'gray', display: 'flex', alignItems: 'center'}}> 
                        <Icons.UserNotFound/>
                    </span>
                        {/*<Link to={"/create"}>*/}
                        {/*    <Text as='span' color={'teal.500'} _hover={{textDecoration: 'underline'}}>Create profile</Text>*/}
                        {/*</Link>*/}
                    </Text>
                )}
            </VStack>
        </Container>
    );
};

export default HomePage;