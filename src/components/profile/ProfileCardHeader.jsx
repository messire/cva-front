import {Image, Heading, HStack, VStack} from "@chakra-ui/react";
import {useColorModeValue} from "../ui/color-mode.jsx";

const ProfileCardHeader = ({user}) => {
    const defaultPhoto = useColorModeValue("/images/no-photo-light.svg", "/images/no-photo-dark.svg");
    const photoLink = user.photo ? user.photo : defaultPhoto;
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