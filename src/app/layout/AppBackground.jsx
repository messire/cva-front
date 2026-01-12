import {Box} from "@chakra-ui/react";

export const AppBackground = ({children}) => {
    return (
        <Box position="fixed"
             inset={0}
             overflowX="hidden"
             pointerEvents="none"
             zIndex={0}
             _before={{
                 content: '""',
                 position: "fixed",
                 inset: 0,
                 pointerEvents: "none",
                 bgImage: "url(/images/bg-waves.svg)",
                 bgRepeat: "no-repeat",
                 bgPosition: "center top",
                 bgSize: "cover",
                 opacity: 0.5,
             }}
             _after={{
                 content: '""',
                 position: "fixed",
                 inset: 0,
                 pointerEvents: "none",
                 bgRepeat: "repeat",
                 opacity: 0.08,
                 mixBlendMode: "overlay",
             }}>
            <Box
                position="fixed"
                inset={0}
                pointerEvents="none"
                bg="radial-gradient(900px 500px at 20% 10%, rgba(99,102,241,0.25), transparent 60%),
                radial-gradient(800px 500px at 80% 20%, rgba(59,130,246,0.18), transparent 60%)"
            />
            {children}
        </Box>
    );
}

export default AppBackground;
