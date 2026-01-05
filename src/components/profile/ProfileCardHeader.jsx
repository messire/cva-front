import {Image, Heading, HStack, VStack} from "@chakra-ui/react";

import {DEFAULT_USER_PHOTO} from "../../constants/defaults.js";

import {useColorModeValue} from "../ui/color-mode.jsx";

const ProfileCardHeader = ({user}) => {
    const photoLink = user.photo ? user.photo : DEFAULT_USER_PHOTO;
    return (
        <HStack>
            <Image
                src={photoLink}
                boxSize="150px"
                borderRadius="full"
                fit="cover"
                alt="User photo"
            />
            <VStack gap={4} align={'left'}>
                <Heading size="xl">{user.name} {user.surname}</Heading>
            </VStack>
        </HStack>
    )
};

export default ProfileCardHeader;