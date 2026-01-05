import {Box, Heading, HStack, IconButton, Separator, Text, VStack} from "@chakra-ui/react";

import ProfileSectionCard from "./ProfileSectionCard.jsx";

import {FaAt, FaFacebook, FaPhoneAlt, FaGithub, FaLinkedin, FaTelegram, FaWhatsapp} from "react-icons/fa";

const ProfileContacts = ({user}) => {
    const whatsappPhone = user.phone ? user.phone.replace(/\D/g, '') : '';
    const telPhone = user.phone ? user.phone.replace(/[^\d+]/g, '') : '';
    return (
        <ProfileSectionCard h="full">
            <VStack align={'left'} gap={6}>
                <Heading
                    fontSize='2xl'
                    fontWeight='800'
                    letterSpacing='-0.02em'
                    color="text.primary"
                >
                    Contacts
                </Heading>
                <VStack align="stretch" gap={4}>
                    {user?.email && (
                        <HStack gap={3}>
                            <Box color="text.brand">
                                <FaAt size={18}/>
                            </Box>
                            <Text
                                as="a"
                                href={`mailto:${user.email}`}
                                fontSize="md"
                                color="text.secondary"
                                _hover={{color: "text.brand"}}
                                transition="color 0.2s"
                            >
                                {user.email}
                            </Text>
                        </HStack>
                    )}
                    {user?.phone && (
                        <HStack gap={3}>
                            <Box color="text.brand">
                                <FaPhoneAlt size={16}/>
                            </Box>
                            <Text
                                as="a"
                                href={`tel:${telPhone}`}
                                fontSize="md"
                                color="text.secondary"
                                _hover={{color: "text.brand"}}
                                transition="color 0.2s"
                            >
                                {user.phone}
                            </Text>
                        </HStack>
                    )}
                </VStack>
                <Separator borderColor="border.subtle"/>
                <HStack gap={3} justify="center" pt={2}>
                    <IconButton
                        as="a"
                        href="#"
                        aria-label="LinkedIn"
                        variant="ghost"
                        w="36px"
                        h="36px"
                        borderRadius="button"
                        bg="bg.page"
                        color="text.secondary"
                        _hover={{
                            bg: "bg.main",
                            color: "text.brand"
                        }}
                        transition="all 0.2s"
                    >
                        <FaLinkedin size={20}/>
                    </IconButton>
                    <IconButton
                        as="a"
                        href="#"
                        aria-label="GitHub"
                        variant="ghost"
                        w="36px"
                        h="36px"
                        borderRadius="button"
                        bg="bg.page"
                        color="text.secondary"
                        _hover={{
                            bg: "bg.main",
                            color: "text.brand"
                        }}
                        transition="all 0.2s"
                    >
                        <FaGithub size={20}/>
                    </IconButton>
                    <IconButton
                        as="a"
                        href="#"
                        aria-label="Telegram"
                        variant="ghost"
                        w="36px"
                        h="36px"
                        borderRadius="button"
                        bg="bg.page"
                        color="text.secondary"
                        _hover={{
                            bg: "bg.main",
                            color: "text.brand"
                        }}
                        transition="all 0.2s"
                    >
                        <FaTelegram size={20}/>
                    </IconButton>
                    <IconButton
                        as="a"
                        href="#"
                        aria-label="Facebook"
                        variant="ghost"
                        w="36px"
                        h="36px"
                        borderRadius="button"
                        bg="bg.page"
                        color="text.secondary"
                        _hover={{
                            bg: "bg.main",
                            color: "text.brand"
                        }}
                        transition="all 0.2s"
                    >
                        <FaFacebook size={20}/>
                    </IconButton>
                    <IconButton
                        as="a"
                        href={`https://wa.me/${whatsappPhone}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="WhatsApp"
                        variant="ghost"
                        w="36px"
                        h="36px"
                        borderRadius="button"
                        bg="bg.page"
                        color="text.secondary"
                        _hover={{
                            bg: "bg.main",
                            color: "text.brand"
                        }}
                        transition="all 0.2s"
                    >
                        <FaWhatsapp size={20}/>
                    </IconButton>
                </HStack>
            </VStack>
        </ProfileSectionCard>
    )
};

export default ProfileContacts;