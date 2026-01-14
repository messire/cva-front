import {Box, HStack, Text} from "@chakra-ui/react";
import SiteIcon from "../../assets/siteIcon.svg?react";

const SiteMainIcon = () => (
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
            color="white"
        >
            <SiteIcon width={36} height={36}/>
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
);

export default SiteMainIcon;
