import {Box, HStack, IconButton, Separator, Text, VStack} from "@chakra-ui/react";
import ProfileSectionCard from "../components/ProfileSectionCard.jsx";
import {Icons} from "../../../../shared/ui/icons.js";
import {ContactsEditModal} from "../modals/ContactsEditModal.jsx";
import {SocialLinksEditModal} from "../modals/SocialLinksEditModal.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import {Tooltip} from "../../../../shared/ui/tooltip.jsx";

const ContactsSection = ({profile, isOwner}) => {
    const location = [profile.location?.city, profile.location?.country]
        .filter(Boolean)
        .join(", ");

    const telephone = profile.phone ? profile.phone.replace(/[^\d+]/g, '') : '';
    const whatsapp = profile.phone ? profile.phone.replace(/\D/g, '') : '';

    const telegram = profile.socialLinks?.telegram;
    const linkedin = profile.socialLinks?.linkedIn;
    const github = profile.socialLinks?.gitHub;
    const twitter = profile.socialLinks?.twitter;

    const socialButtons = [
        {
            key: "linkedin",
            label: "LinkedIn",
            icon: <Icons.Linkedin size={20}/>,
            href: linkedin || null,
            external: true,
        },
        {
            key: "github",
            label: "GitHub",
            icon: <Icons.Github size={20}/>,
            href: github || null,
            external: true,
        },
        {
            key: "telegram",
            label: "Telegram",
            icon: <Icons.Telegram size={20}/>,
            href: telegram || null,
            external: true,
        },
        {
            key: "twitter",
            label: "X",
            icon: <Icons.Twitter size={20}/>,
            href: twitter || null,
            external: true,
        },
        {
            key: "whatsapp",
            label: "WhatsApp",
            icon: <Icons.Whatsapp size={20}/>,
            href: whatsapp ? `https://wa.me/${whatsapp}` : null,
            external: true,
        },
    ];

    return (
        <ProfileSectionCard h="full">
            <VStack align={'left'}>
                <HStack justify="space-between" pb={4}>
                    <SectionHeading flexShrink="0"> Contacts </SectionHeading>
                    <Separator borderColor="border.subtle" flex="1"/>
                    {isOwner && <ContactsEditModal profile={profile} flexShrink="0"/>}
                </HStack>

                <VStack align="stretch" gap={2}>
                    {location && (
                        <HStack gap={3}>
                            <Box color="text.brand">
                                <Icons.Location size={18}/>
                            </Box>
                            <Text color="text.secondary">
                                {location}
                            </Text>
                        </HStack>
                    )}
                    {profile.email && (
                        <HStack gap={3}>
                            <Box color="text.brand">
                                <Icons.Email size={18}/>
                            </Box>
                            <Text
                                as="a"
                                href={`mailto:${profile.email}`}
                                fontSize="md"
                                color="text.secondary"
                                _hover={{color: "text.brand"}}
                                transition="color 0.2s"
                            >
                                {profile.email}
                            </Text>
                        </HStack>
                    )}
                    {profile.phone && (
                        <HStack gap={3}>
                            <Box color="text.brand">
                                <Icons.Phone size={16}/>
                            </Box>
                            <Text
                                as="a"
                                href={`tel:${telephone}`}
                                fontSize="md"
                                color="text.secondary"
                                _hover={{color: "text.brand"}}
                                transition="color 0.2s"
                            >
                                {profile.phone}
                            </Text>
                        </HStack>
                    )}
                    {profile.website && (
                        <HStack gap={3}>
                            <Box color="text.brand">
                                <Icons.Website size={16}/>
                            </Box>
                            <Text
                                as="a"
                                href={`${profile.website}`}
                                fontSize="md"
                                color="text.secondary"
                                _hover={{color: "text.brand"}}
                                transition="color 0.2s"
                            >
                                {profile.website}
                            </Text>
                        </HStack>
                    )}
                </VStack>

                <HStack justify="space-between" p={2}>
                    <SectionHeading flexShrink="0"> Social Links </SectionHeading>
                    <Separator borderColor="border.subtle" flex="1"/>
                    {isOwner && <SocialLinksEditModal profile={profile} flexShrink="0"/>}
                </HStack>

                <HStack gap={3} justify="center">
                    {socialButtons.map((b) => {
                        const isActive = Boolean(b.href);
                        const commonProps = {
                            "aria-label": b.label,
                            variant: "ghost",
                            w: "36px",
                            h: "36px",
                            borderRadius: "button",
                            transition: "all 0.2s",
                        };
                        if (isActive) {
                            console.log(b);
                            return (
                                <Tooltip content={b.label}>
                                    <IconButton
                                        key={b.key}
                                        as="a"
                                        href={b.href}
                                        target={b.external ? "_blank" : undefined}
                                        rel={b.external ? "no opener no referrer" : undefined}
                                        bg="bg.main"
                                        color="text.brand"
                                        _hover={{bg: "bg.page", color: "text.brand"}}
                                        {...commonProps}
                                    >
                                        {b.icon}
                                    </IconButton>
                                </Tooltip>
                            );
                        }

                        return (
                            <IconButton
                                key={b.key}
                                isDisabled
                                aria-disabled="true"
                                bg="bg.page"
                                color="text.secondary"
                                opacity={0.45}
                                cursor="default"
                                _hover={{bg: "bg.page", color: "text.secondary"}}
                                {...commonProps}
                            >
                                {b.icon}
                            </IconButton>
                        );
                    })}
                </HStack>
            </VStack>
        </ProfileSectionCard>
    )
};

export default ContactsSection;
