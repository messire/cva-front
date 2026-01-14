import {Heading, HStack, Text, VStack, Box} from "@chakra-ui/react";

import {getOpenToWorkUi} from "../../../../shared/utils/profileBadges.js";

import ProfilePhoto from "../../../../shared/ui/ProfilePhoto.jsx";
import TagBadge from "../../../../shared/ui/TagBadge.jsx";

import {Icons} from "../../../../shared/ui/icons.js";

/**
 * @param {{ profile: import('../../../entities/profile/model/profile.model').DeveloperProfile }} props
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

                <Text size="lg" lineClamp={1}>{role}</Text>
                <HStack align="start" gap={4}>
                    <HStack gap={2}>
                        <Box color="text.brand"> <Icons.Experience/> </Box>
                        <Text color="text.secondary" whiteSpace="nowrap">{profile.yearsOfExperience ?? 0} year(s)</Text>
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
