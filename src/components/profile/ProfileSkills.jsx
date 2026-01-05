import {Heading, Flex, Badge, VStack, Text} from "@chakra-ui/react";

import ProfileSectionCard from "./ProfileSectionCard.jsx";

const ProfileSkills = ({user}) => {
    return (
        <ProfileSectionCard>
            <VStack align={'left'} gap={6}>
                <Heading
                    fontSize='2xl'
                    fontWeight='800'
                    letterSpacing='-0.02em'
                    color="text.primary"
                >
                    Skills
                </Heading>
                {user?.skills?.length > 0 ? (
                    <Flex
                        gap={3}
                        wrap="wrap"
                    >
                        {user.skills.map(skill => (
                            <Badge
                                key={skill}
                                px="10px"
                                h="26px"
                                borderRadius="999px"
                                bg="bg.page"
                                color="text.primary"
                                fontSize="12px"
                                fontWeight="600"
                                textTransform="none"
                            >
                                {skill}
                            </Badge>
                        ))}
                    </Flex>
                ) : (
                    <Text
                        color="text.secondary"
                        fontStyle="italic"
                    >
                        No skills specified.
                    </Text>
                )}
            </VStack>
        </ProfileSectionCard>
    )
};

export default ProfileSkills;