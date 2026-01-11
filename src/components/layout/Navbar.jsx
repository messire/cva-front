import {Button, Flex, HStack, ClientOnly} from "@chakra-ui/react";
import {Link, useLocation, useNavigate} from "react-router-dom";

import {useColorMode} from "../../ui/color-mode.jsx";
import LoginButton from "../auth/LoginButton.jsx";

import {Icons} from "../../ui/icons";

import {useAuthStore} from "../../stores/auth.store.js";
import SiteMainIcon from "../ui/SiteMainIcon.jsx";

const Navbar = () => {
    const {colorMode, toggleColorMode} = useColorMode();

    const navigate = useNavigate();
    const location = useLocation();

    const isAuthenticated = useAuthStore(s => Boolean(s.accessToken || s.refreshToken));
    const clearAuth = useAuthStore(s => s.clear);

    const handleLogout = () => {
        clearAuth();
    };

    const handleBrandClick = (e) => {
        e.preventDefault();
        if (location.pathname === "/") {
            navigate(0);
            return;
        }

        navigate("/");
    };

    return (
        <Flex
            h="64px"
            px={{base: 4, md: 8}}
            align="center"
            justify="space-between"
            bg="bg.page"
            borderBottom="1px solid"
            borderColor="border.subtle"
        >
            <Link to="/" onClick={handleBrandClick}>
                <SiteMainIcon />
            </Link>
            <HStack gap={4}>
                {isAuthenticated ? (
                    <>
                        <Link to="/profile">
                            <Button size="sm" variant="ghost">My profile</Button>
                        </Link>
                        <Button onClick={handleLogout} size="sm" variant="outline">
                            Logout
                        </Button>
                    </>
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