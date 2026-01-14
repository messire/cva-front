import {Box, Flex, Text} from "@chakra-ui/react";

const Footbar = () => {
    return (
        <Box
            as="footer"
            width="100%"
            px={{base: 4, md: 8}}
            borderTop="1px solid"
            borderColor="border.subtle"
        >
            <Flex
                height="60px"
                align="center"
                justify="center"
            >
                <Text fontSize="sm" color="text.secondary" fontWeight="500">
                    © {new Date().getFullYear()} Developers CV • Built for developers
                </Text>
            </Flex>
        </Box>
    );
};

export default Footbar;
