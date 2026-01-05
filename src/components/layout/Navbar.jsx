import {Box, Button, Flex, HStack, Text, ClientOnly} from "@chakra-ui/react";
import {Link} from "react-router-dom";

import {useColorMode} from "../ui/color-mode.jsx";

import {FaMoon, FaRegFileAlt, FaSun} from "react-icons/fa";

const Navbar = () => {
    const {colorMode, toggleColorMode} = useColorMode();

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
                    >
                        <FaRegFileAlt size={22} color="white"/>
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
                {/*<Link to="/create">*/}
                {/*    <Text*/}
                {/*        display={{base: "none", sm: "block"}}*/}
                {/*        color="text.secondary"*/}
                {/*        fontWeight="600"*/}
                {/*        _hover={{color: "text.brand"}}*/}
                {/*        transition="color 0.2s"*/}
                {/*    >*/}
                {/*        Create profile*/}
                {/*    </Text>*/}
                {/*</Link>*/}
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleColorMode}
                    borderRadius="full"
                >
                    <ClientOnly fallback={<FaSun/>}>
                        {colorMode === 'light' ? <FaMoon/> : <FaSun/>}
                    </ClientOnly>
                </Button>
            </HStack>
        </Flex>
    );
}

export default Navbar;