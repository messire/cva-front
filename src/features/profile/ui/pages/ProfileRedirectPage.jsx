import {Container, Spinner, Text, VStack} from "@chakra-ui/react";
import {useEffect} from "react";
import {Navigate, useNavigate} from "react-router-dom";

import {useAuthStore} from "../../../auth/model/auth.store.js";
import {fetchMyProfile} from "../../api/profile.api.js";
import {toaster} from "../../../../shared/ui/toaster.jsx";

const ProfileRedirectPage = () => {
    const navigate = useNavigate();
    const isAuthenticated = useAuthStore(s => Boolean(s.accessToken || s.refreshToken));

    useEffect(() => {
        if (!isAuthenticated) return;

        const run = async () => {
            const res = await fetchMyProfile();

            if (res.ok && res.data?.id) {
                navigate(`/u/${res.data.id}`, {replace: true});
                return;
            }

            if (!res.ok && res.status === 404) {
                navigate("/profile/create", {replace: true});
                return;
            }

            toaster.create({
                description: res.message || "Failed to load your profile.",
                type: "error",
                closable: true,
            });
        };

        void run();
    }, [isAuthenticated, navigate]);

    if (!isAuthenticated) return <Navigate to="/" replace/>;

    return (
        <Container maxW="container.sm" py={10}>
            <VStack gap={3}>
                <Spinner size="lg"/>
                <Text color="text.secondary">Opening your profile…</Text>
            </VStack>
        </Container>
    );
};

export default ProfileRedirectPage;
