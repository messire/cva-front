import {Box, Container} from '@chakra-ui/react'
import {useEffect, useRef, useState} from "react";

import Navbar from "./layout/Navbar.jsx";
import {Toaster} from "../shared/ui/toaster.jsx";
import AppBackground from "./layout/AppBackground.jsx";
import Footbar from "./layout/Footbar.jsx";
import ScrollToTopButton from "../shared/ui/ScrollToTopButton.jsx";
import {AppRoutes} from "./routes.jsx";

import {useAuthStore} from "../features/auth/model/auth.store.js";
import {refreshTokens} from "../features/auth/api/auth.api.js";

const SHOW_FLOATING_NAVBAR_Y = 64;

function App() {
    const ranRef = useRef(false);
    const [showFloatingNavbar, setShowFloatingNavbar] = useState(false);

    useEffect(() => {
        if (ranRef.current) return;
        ranRef.current = true;

        const run = async () => {
            const store = useAuthStore.getState();

            if (store.accessToken) return;
            if (!store.refreshToken) return;

            try {
                await store.refresh(async (rt) => {
                    const res = await refreshTokens(rt);
                    if (!res.ok) {
                        throw new Error(res.message || "Refresh failed.");
                    }
                    return res.data;
                });
            } catch {
            }
        };

        void run();
    }, []);

    useEffect(() => {
        const onScroll = () => {
            setShowFloatingNavbar(window.scrollY > SHOW_FLOATING_NAVBAR_Y);
        };

        window.addEventListener("scroll", onScroll, {passive: true});
        onScroll();

        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <Box
            minH="100vh"
            minW="md"
            display="flex"
            flexDirection="column"
            position="relative"
            bg="bg.main"
        >
            <AppBackground/>
            <Container
                maxW="full"
                mx="auto"
                my={{base: 4, md: 10}}
                px={{base: 2, md: 6}}
                position="relative"
                zIndex="docked"
            >
                {showFloatingNavbar && <Navbar mode="floating" />}
                <Box
                    bg="bg.page"
                    border="1px solid"
                    borderColor="border.subtle"
                    borderRadius="24px"
                    overflowX="visible"
                    overflowY="hidden"
                    boxShadow="0 18px 60px rgba(0,0,0,0.22)"
                    display="flex"
                    flexDirection="column"
                >
                    <Navbar mode="inline" />
                    <Box px={{base: 3, md: 8}} py={{base: 6, md: 8}} flex="1">
                        <AppRoutes/>
                    </Box>
                    <Footbar/>
                </Box>
            </Container>
            <ScrollToTopButton/>
            <Toaster/>
        </Box>
    );
}

export default App;
