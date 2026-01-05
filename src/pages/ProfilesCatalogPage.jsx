import {Container, Input, InputGroup, SimpleGrid, Text, VStack} from "@chakra-ui/react";
import {Link} from "react-router-dom";
import {useEffect} from "react";

import {useUserStore} from "../stores/users.store.js";

import ProfileCard from "../components/profile/ProfileCard.jsx";

import {FaSearch, FaUsersSlash} from "react-icons/fa";

const HomePage = () => {
    const {fetchUsers, users} = useUserStore();
    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    return (
        <Container
            maxW='container.xl'
            py={{base: 6, md: 10}}
            px={{base: 4, md: 8}}
        >
            <VStack gap={8} align="stretch">
                <VStack align="flex-start" gap={1}>
                    <Text fontSize={{ base: "32px", md: "40px" }} fontWeight="800" color="text.primary">
                        Developer profiles
                    </Text>
                    <Text mt="2" fontSize="14px" color="text.secondary">
                        Explore and connect with talented developers
                    </Text>
                </VStack>

                <InputGroup
                    width="full"
                    mt="6"
                    startElement={<FaSearch color="gray.400"/>}
                >
                    <Input
                        h="44px"
                        placeholder="Search by name, role, or skills..."
                        borderRadius="button"
                        bg="bg.card"
                        border="1px solid"
                        borderColor="border.subtle"
                        _focusVisible={{
                            borderColor: "text.brand",
                            boxShadow: "none",
                        }}
                    />
                </InputGroup>

                <SimpleGrid
                    minChildWidth="280px"
                    gap={{base: 4, md: 6}}
                    w="full"
                >
                    {
                        users.map((user) => (
                            <ProfileCard key={user.id} user={user}/>
                        ))}
                </SimpleGrid>

                {users.length === 0 && (
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
                        <FaUsersSlash/>
                    </span>
                        <Link to={"/create"}>
                            <Text as='span' color={'teal.500'} _hover={{textDecoration: 'underline'}}>Create profile</Text>
                        </Link>
                    </Text>
                )}
            </VStack>
        </Container>
    );
};

export default HomePage;