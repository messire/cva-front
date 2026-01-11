import {useEffect, useMemo, useRef, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {Box, Button, Heading, Text, VStack} from "@chakra-ui/react";
import {exchangeOneTimeCode} from "../api/auth.api.js";

export default function AuthCallbackPage() {
    const ranRef = useRef(false);
    const location = useLocation();
    const navigate = useNavigate();

    const [status, setStatus] = useState("loading");
    const [message, setMessage] = useState("");

    const params = useMemo(() => new URLSearchParams(location.search), [location.search]);
    const code = params.get("code");
    const error = params.get("error");
    const errorDescription = params.get("errorDescription");

    useEffect(() => {
        if (ranRef.current) return;
        ranRef.current = true;

        const run = async () => {
            if (error) {
                useAuthStore.getState().clear();
                setStatus("error");
                setMessage(errorDescription ? `${error}: ${errorDescription}` : error);
                return;
            }

            if (!code) {
                useAuthStore.getState().clear();
                setStatus("error");
                setMessage("Missing one-time code.");
                return;
            }

            const res = await exchangeOneTimeCode(code);

            if (!res.ok) {
                useAuthStore.getState().clear();
                setStatus("error");
                setMessage(res.message || "Exchange failed.");
                return;
            }

            const token = res.data;

            if (!token?.accessToken || !token?.refreshToken) {
                useAuthStore.getState().clear();
                setStatus("error");
                setMessage("Invalid token payload.");
                return;
            }

            useAuthStore.getState().setTokens({
                accessToken: token.accessToken,
                refreshToken: token.refreshToken,
            });

            setStatus("ok");
            setMessage("Signed in.");

            navigate("/", {replace: true});
        };

        void run();
    }, [code, error, errorDescription, navigate]);

    return (
        <Box py={{base: 10, md: 16}}>
            <VStack spacing={4} align="start">
                <Heading size="md">Auth callback</Heading>

                {status === "loading" && (
                    <Text color="text.secondary">Finishing sign-in…</Text>
                )}

                {status === "error" && (
                    <>
                        <Text color="red.500">{message}</Text>
                        <Button onClick={() => navigate("/", {replace: true})}>
                            Back to home
                        </Button>
                    </>
                )}

                {status === "ok" && (
                    <Text color="text.secondary">{message}</Text>
                )}
            </VStack>
        </Box>
    );
}