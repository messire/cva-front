import {Badge, Box, Icon, Image} from "@chakra-ui/react";

import { getVerificationUi } from "../../utils/profileBadges.js";

import { useColorModeValue } from "../../ui/color-mode.jsx";

/**
 * @typedef {'sm'|'md'|'lg'} ProfilePhotoSize
 */

/**
 * @param {{
 *   profile: import('../models/DeveloperProfileDetails').DeveloperProfileDetails,
 *   avatarUrl?: String,
 *   status?: String,
 *   size?: ProfilePhotoSize,
 *   showVerification?: boolean,
 *   alt?: string
 * }} props
 */
const ProfilePhoto = ({ avatarUrl, status, size = "md", alt = "Profile photo" }) => {
    const defaultPhoto = useColorModeValue("/images/no-photo-light.svg", "/images/no-photo-dark.svg");
    const photoLink = avatarUrl ? avatarUrl : defaultPhoto;
    const verUi = getVerificationUi(status);

    const sizeMap = {
        sm: { outer: "52px", inner: "48px", badgeBottom: "2px", badgeRight: "2px", badgeIcon: "12px" },
        md: { outer: "110px", inner: "100px", badgeBottom: "6px", badgeRight: "6px", badgeIcon: "14px" },
        lg: { outer: "160px", inner: "150px", badgeBottom: "8px", badgeRight: "8px", badgeIcon: "16px" },
    };

    const s = sizeMap[size] ?? sizeMap.md;

    return (
        <Box position="relative" flexShrink={0}>
            <Box
                boxSize={s.outer}
                borderRadius="full"
                display="flex"
                alignItems="center"
                justifyContent="center"
                {...(verUi?.ringProps ?? {})}
            >
                <Image
                    src={photoLink}
                    boxSize={s.inner}
                    borderRadius="full"
                    fit="cover"
                    alt={alt}
                />
            </Box>

            {verUi && (
                <Badge
                    position="absolute"
                    bottom={s.badgeBottom}
                    right={s.badgeRight}
                    display="inline-flex"
                    alignItems="center"
                    gap={1}
                    px={2}
                    py={1}
                    borderRadius="999px"
                    {...verUi.badgeProps}
                >
                    <Icon as={verUi.icon} boxSize={s.badgeIcon} />
                    {/*{verUi.label}*/}
                </Badge>
            )}
        </Box>
    );
};

export default ProfilePhoto;