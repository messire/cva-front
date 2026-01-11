import {Box, Button, Flex, HStack, Text, ClientOnly} from "@chakra-ui/react";
import {Link} from "react-router-dom";

import {useColorMode} from "../../ui/color-mode.jsx";
import LoginButton from "../auth/LoginButton.jsx";

import SiteIcon from "../../assets/siteIcon.svg?react";
import { Icons } from "../../ui/icons";

import {useAuthStore} from "../../stores/auth.store.js";

const Navbar = () => {
    const {colorMode, toggleColorMode} = useColorMode();

    const isAuthenticated = useAuthStore(s => Boolean(s.accessToken || s.refreshToken));
    const clearAuth = useAuthStore(s => s.clear);

    const handleLogout = () => {
        clearAuth();
    };

    return (
        <Flex
            h="64px"
            px={{ base: 4, md: 8 }}
            align="center"
            justify="space-between"
            bg="bg.page"
            borderBottom="1px solid"
            borderColor="border.subtle"
        >
            <Link to="/">
                <HStack gap={3}>
                    <Box
                        w="40px"
                        h="40px"
                        bg={{
                            base: "linear-gradient(135deg, {colors.brand.600}, {colors.brand.400})",
                            _dark: "linear-gradient(135deg, {colors.brand.700}, {colors.brand.500})"
                        }}
                        borderRadius="12px"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        boxShadow="0 4px 12px rgba(79, 70, 229, 0.3)"
                        color="white"
                    >
                        <SiteIcon width={36} height={36} />
                    </Box>
                    <Text
                        fontWeight="700"
                        fontSize="xl"
                        letterSpacing="-0.03em"
                        color="text.primary"
                    >
                        Developers CV
                    </Text>
                </HStack>
            </Link>
            <HStack gap={4}>
                {isAuthenticated ? (
                    <Button
                        onClick={handleLogout}
                        size="sm"
                        variant="outline"
                    >
                        Logout
                    </Button>
                ) : (
                    <LoginButton/>
                )}
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleColorMode}
                    borderRadius="full"
                >
                    <ClientOnly fallback={<Icons.Sun/>}>
                        {colorMode === 'light' ? <Icons.Moon/> : <Icons.Sun/>}
                    </ClientOnly>
                </Button>
            </HStack>
        </Flex>
    );
}

export default Navbar;