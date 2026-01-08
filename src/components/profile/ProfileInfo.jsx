import {Heading, HStack, Text, VStack} from "@chakra-ui/react";

import {getOpenToWorkUi} from "../../utils/profileBadges.js";

import ProfileSectionCard from "../ui/ProfileSectionCard.jsx";
import ProfilePhoto from "../ui/ProfilePhoto.jsx";
import TagBadge from "../ui/TagBadge.jsx";

/**
 * @param {{ profile: import('../models/DeveloperProfileDetails').DeveloperProfileDetails }} props
 */
const ProfileInfo = ({profile}) => {
    const role = profile.role || "Role not specified";
    const description = profile?.summary ? profile?.summary : "No description provided.";
    const openToWorkUi = getOpenToWorkUi(profile.openToWork);

    return (
        <ProfileSectionCard flex="2">
            <VStack align={'left'} gap={6}>
                <HStack gap={6} align="center">
                    <ProfilePhoto avatarUrl={profile.avatarUrl} status={profile.verified} size="md"/>
                    <VStack align='left' gap={1} w="full">
                        <Heading
                            fontSize={{base: '2xl', md: '3xl', lg: '4xl'}}
                            fontWeight="800"
                            letterSpacing="-0.03em"
                            color="text.primary"
                        >
                            {profile.fullName}
                        </Heading>
                        <Text fontSize="lg" color="text.brand" fontWeight="600">
                            {role}
                        </Text>
                        {openToWorkUi && (
                            <TagBadge
                                {...openToWorkUi.badgeProps}
                                w="fit-content"
                            >
                                {openToWorkUi.label}
                            </TagBadge>
                        )}
                    </VStack>
                </HStack>
                <Text fontSize="md" color="text.secondary" lineHeight="tall">
                    {description}
                </Text>
            </VStack>
        </ProfileSectionCard>
    )
};

export default ProfileInfo;