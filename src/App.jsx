import {Box, Container} from '@chakra-ui/react'
import {Route, Routes, Navigate} from 'react-router-dom'

import ProfilesCatalogPage from "./pages/ProfilesCatalogPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import AuthCallbackPage from "./pages/AuthCallbackPage.jsx";
import Navbar from "./components/layout/Navbar.jsx";
import {Toaster} from "./ui/toaster.jsx";
import AppBackground from "./components/layout/AppBackground.jsx";
import Footbar from "./components/layout/Footbar.jsx";
import ScrollToTopButton from "./components/ui/ScrollToTopButton.jsx";

function App() {
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
                zIndex={1}
            >
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
                    <Navbar/>
                    <Box px={{base: 3, md: 8}} py={{base: 6, md: 8}} flex="1">
                        <Routes>
                            <Route path="/" element={<ProfilesCatalogPage/>}/>
                            <Route path="/u/:id" element={<ProfilePage/>}/>
                            <Route path="/auth/callback" element={<AuthCallbackPage/>}/>
                            <Route path="*" element={<Navigate to="/" replace/>}/>
                        </Routes>
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