import {Heading, HStack, Text, VStack, Box} from "@chakra-ui/react";

import {getOpenToWorkUi} from "../../utils/profileBadges.js";

import ProfilePhoto from "../ui/ProfilePhoto.jsx";
import TagBadge from "../ui/TagBadge.jsx";

import {Icons} from "../../ui/icons";

/**
 * @param {{ profile: import('../models/DeveloperProfile').DeveloperProfile }} props
 */
const ProfileCardHeader = ({profile}) => {
    const role = profile.role || "Role not specified";
    const openToWorkUi = getOpenToWorkUi(profile.openToWork);

    return (
        <HStack align="start" gap={4}>
            <ProfilePhoto avatarUrl={profile.avatarUrl} status={profile.verificationStatus} size="md"/>
            <VStack gap={2} align='start' minW={0}>
                <HStack gap={2} wrap="wrap">
                    <Heading size="xl">
                        {profile.fullName}
                    </Heading>
                    {openToWorkUi && (
                        <TagBadge
                            {...openToWorkUi.badgeProps}
                            w="fit-content"
                        >
                            {openToWorkUi.label}
                        </TagBadge>
                    )}
                </HStack>

                <Text size="lg" noOfLines={1}>{role}</Text>
                <HStack align="start" gap={4}>
                    <HStack gap={2}>
                        <Box color="text.brand"> <Icons.Experience/> </Box>
                        <Text color="text.secondary">{profile.yearsOfExperience ?? 0} year(s)</Text>
                    </HStack>
                    <Box flex="1"/>
                    <HStack gap={2}>
                        <Box color="text.brand"> <Icons.Projects/> </Box>
                        <Text color="text.secondary">{profile.projectsCount}</Text>
                    </HStack>
                </HStack>
            </VStack>
        </HStack>
    )
};

export default ProfileCardHeader;