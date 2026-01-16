import {Badge, Box, Icon, Image, Popover, Portal} from "@chakra-ui/react";

import {getVerificationUi} from "../utils/profileBadges.js";

import {useColorModeValue} from "./color-mode.jsx";
import {Tooltip} from "./tooltip.jsx";

/**
 * @typedef {'sm'|'md'|'lg'} ProfilePhotoSize
 */

/**
 * @param {{
 *   profile: import('../../entities/profile/model/profile.model').DeveloperProfileDetails,
 *   avatarUrl?: String,
 *   avatarPreviewUrl?: String,
 *   status?: String,
 *   size?: ProfilePhotoSize,
 *   showVerification?: boolean,
 *   alt?: string
 * }} props
 */
const ProfilePhoto = ({avatarUrl, avatarPreviewUrl, status, size = "md", alt = "Profile photo"}) => {
    const defaultPhoto = useColorModeValue("/images/no-photo-light.svg", "/images/no-photo-dark.svg");
    const photoLink = avatarUrl ? avatarUrl : defaultPhoto;
    const previewLink = avatarPreviewUrl ? avatarPreviewUrl : photoLink;
    const verUi = getVerificationUi(status);

    const sizeMap = {
        sm: {outer: "52px", inner: "48px", badgeBottom: "2px", badgeRight: "2px", badgeIcon: "12px"},
        md: {outer: "110px", inner: "100px", badgeBottom: "6px", badgeRight: "6px", badgeIcon: "14px"},
        lg: {outer: "160px", inner: "150px", badgeBottom: "8px", badgeRight: "8px", badgeIcon: "16px"},
    };

    const s = sizeMap[size] ?? sizeMap.md;

    const showHoverPreview = Boolean(avatarPreviewUrl);

    const photo = (
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
    );

    return (
        <Box position="relative" flexShrink={0}>
            {showHoverPreview ? (
                <Popover.Root
                    openDelay={150}
                    closeDelay={75}
                    positioning={{placement: "right-start"}}
                >
                    <Popover.Trigger asChild>
                        <Box cursor="zoom-in">{photo}</Box>
                    </Popover.Trigger>

                    <Portal>
                        <Popover.Positioner>
                            <Popover.Content
                                w="auto"
                                bg="bg.page"
                                borderColor="border.subtle"
                                borderRadius="xl"
                                overflow="hidden"
                                boxShadow="lg"
                            >
                                <Popover.Body p={0}>
                                    <Image
                                        src={previewLink}
                                        alt={alt}
                                        maxW="360px"
                                        maxH="360px"
                                        fit="cover"
                                    />
                                </Popover.Body>
                            </Popover.Content>
                        </Popover.Positioner>
                    </Portal>
                </Popover.Root>
            ) : (
                photo
            )}

            {verUi && (
                <Tooltip content={status}>
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
                        <Icon as={verUi.icon} boxSize={s.badgeIcon}/>
                        {/*{verUi.label}*/}
                    </Badge>
                </Tooltip>
            )}
        </Box>
    );
};

export default ProfilePhoto;