import {Box} from "@chakra-ui/react";

const ProfileSectionCard = ({children, ...props}) => {
    return (
        <Box
            w="full"
            h="full"
            mt="auto"
            px={{base: 4, md: 6}}
            py={{base: 2, md: 4}}
            bg="bg.card"
            borderRadius="card"
            border="1px solid"
            borderColor="border.subtle"
            boxShadow="soft"
            transition="all 0.2s ease"
            {...props}
        >
            <Box position="relative" zIndex={1}>
                {children}
            </Box>
        </Box>
    )
};

export default ProfileSectionCard;