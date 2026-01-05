import {Heading, HStack, Text, VStack} from "@chakra-ui/react";

import ProfileSectionCard from "./ProfileSectionCard.jsx";
import ProfilePhoto from "./ProfilePhoto.jsx";
import {DEFAULT_USER_PHOTO} from "../../constants/defaults.js";

const ProfileCommon = ({user}) => {
    const photoLink = user.photo ? user.photo : DEFAULT_USER_PHOTO;
    return (
        <ProfileSectionCard flex="2">
            <VStack align={'left'} gap={6}>
                <HStack gap={6} align="center">
                    <ProfilePhoto photoLink={photoLink}/>
                    <VStack align='left' gap={1}>
                        <Heading
                            fontSize={{base: '2xl', md: '3xl', lg: '4xl'}}
                            fontWeight="800"
                            letterSpacing="-0.03em"
                            color="text.primary"
                        >
                            {user?.name} {user?.surname}
                        </Heading>
                        <Text fontSize="lg" color="text.brand" fontWeight="600">
                            {user?.role ? user?.role : "Role not specified."}
                        </Text>
                    </VStack>
                </HStack>
                <Text fontSize="md" color="text.secondary" lineHeight="tall">
                    {user?.summaryInfo ? user?.summaryInfo : "No description provided."}
                </Text>
            </VStack>
        </ProfileSectionCard>
    )
};

export default ProfileCommon;