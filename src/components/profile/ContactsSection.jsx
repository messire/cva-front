import {Box, Heading, HStack, IconButton, Separator, Text, VStack} from "@chakra-ui/react";
import ProfileSectionCard from "../ui/ProfileSectionCard.jsx";
import { Icons } from "../../ui/icons";
import {ContactsEditModal} from "./ContactsEditModal.jsx";
import {SocialLinksEditModal} from "./SocialLinksEditModal.jsx";

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

    return (
        <ProfileSectionCard h="full">
            <VStack align={'left'}>
                <HStack justify="space-between" pb={4}>
                    <Heading
                        fontSize='2xl'
                        fontWeight='800'
                        letterSpacing='-0.02em'
                        color="text.primary"
                    >
                        Contacts
                    </Heading>
                    {isOwner && <ContactsEditModal profile={profile} />}
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

                <Separator borderColor="border.subtle" my={2}/>

                <HStack justify="space-between" pb={2}>
                    <Text fontSize="sm" fontWeight="bold">Social Links</Text>
                    {isOwner && <SocialLinksEditModal profile={profile} />}
                </HStack>

                <HStack gap={3} justify="center">
                    {linkedin && (
                        <IconButton
                            as="a"
                            href={`${linkedin}`}
                            aria-label="LinkedIn"
                            variant="ghost"
                            w="36px"
                            h="36px"
                            borderRadius="button"
                            bg="bg.page"
                            color="text.secondary"
                            _hover={{bg: "bg.main", color: "text.brand"}}
                            transition="all 0.2s"
                        >
                            <Icons.Linkedin size={20}/>
                        </IconButton>
                    )}
                    {github && (
                        <IconButton
                            as="a"
                            href={`${github}`}
                            aria-label="GitHub"
                            variant="ghost"
                            w="36px"
                            h="36px"
                            borderRadius="button"
                            bg="bg.page"
                            color="text.secondary"
                            _hover={{bg: "bg.main", color: "text.brand"}}
                            transition="all 0.2s"
                        >
                            <Icons.Github size={20}/>
                        </IconButton>
                    )}
                    {telegram && (
                        <IconButton
                            as="a"
                            href={`${telegram}`}
                            aria-label="Telegram"
                            variant="ghost"
                            w="36px"
                            h="36px"
                            borderRadius="button"
                            bg="bg.page"
                            color="text.secondary"
                            _hover={{bg: "bg.main", color: "text.brand"}}
                            transition="all 0.2s"
                        >
                            <Icons.Telegram size={20}/>
                        </IconButton>
                    )}
                    {twitter && (
                        <IconButton
                            as="a"
                            href={`${twitter}`}
                            aria-label="X"
                            variant="ghost"
                            w="36px"
                            h="36px"
                            borderRadius="button"
                            bg="bg.page"
                            color="text.secondary"
                            _hover={{bg: "bg.main", color: "text.brand"}}
                            transition="all 0.2s"
                        >
                            <Icons.Twitter size={20}/>
                        </IconButton>
                    )}
                    {whatsapp && (
                        <IconButton
                            as="a"
                            href={`https://wa.me/${whatsapp}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="WhatsApp"
                            variant="ghost"
                            w="36px"
                            h="36px"
                            borderRadius="button"
                            bg="bg.page"
                            color="text.secondary"
                            _hover={{bg: "bg.main", color: "text.brand"}}
                            transition="all 0.2s"
                        >
                            <Icons.Whatsapp size={20}/>
                        </IconButton>
                    )}
                </HStack>
            </VStack>
        </ProfileSectionCard>
    )
};

export default ContactsSection;