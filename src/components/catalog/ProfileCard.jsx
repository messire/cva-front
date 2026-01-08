import {Box, VStack} from "@chakra-ui/react";

import ProfileCardHeader from "./ProfileCardHeader.jsx";
import ProfileCardFooter from "./ProfileCardFooter.jsx";
import ProfileCardBody from "./ProfileCardBody.jsx";

/**
 * @param {{ profile: import('../models/DeveloperProfile').DeveloperProfile }} props
 */
const ProfileCard = ({profile}) => {
    return (
        <Box
            bg="bg.card"
            border="1px solid"
            borderColor="border.subtle"
            borderRadius="card"
            boxShadow="soft"
            display="flex"
            h="100%"
            _hover={{boxShadow: "cardHover",}}
            flexDirection="column"
            minW={0}
            overflow="hidden"
            p="18px"
            transition="box-shadow 0.15s ease"
            w="full"
        >
            <VStack gap={2} align={'stretch'} h="100%">
                <ProfileCardHeader profile={profile}/>
                <ProfileCardBody profile={profile}/>
                <ProfileCardFooter id={profile.id}/>
            </VStack>
        </Box>
    )
};

export default ProfileCard;