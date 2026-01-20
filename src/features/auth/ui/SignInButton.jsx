import {Button} from "@chakra-ui/react";

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "";

export default function SignInButton(props) {
    const handleSignIn = () => {
        const returnUrl = `${window.location.origin}/auth/callback`;
        const url = `${API_BASE}/api/auth/google/start?returnUrl=${encodeURIComponent(returnUrl)}`;
        window.location.assign(url);
    };

    return (
        <Button
            onClick={handleSignIn}
            size="sm"
            variant="solid"
            {...props}
        >
            Sign in
        </Button>
    );
}
