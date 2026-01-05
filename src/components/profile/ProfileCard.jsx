import {Box, VStack, Button} from "@chakra-ui/react";
import {Link} from "react-router-dom";

import ProfileCardHeader from "./ProfileCardHeader.jsx";

const ProfileCard = ({user}) => {
    return (
        <Box
            bg="bg.card"
            border="1px solid"
            borderColor="border.subtle"
            borderRadius="card"
            p="18px"
            boxShadow="soft"
            _hover={{
                boxShadow: "cardHover",
            }}
            transition="box-shadow 0.15s ease"
            w="full"
            minW={0}
            overflow="hidden"
        >
            <VStack gap={6} align={'stretch'}>
                <ProfileCardHeader user={user}/>
                <Link to={`/u/${user.id}`}>
                    <Button
                        w="full"
                        h="38px"
                        mt="10px"
                        borderRadius="button"
                        bg="bg.page"
                        color="text.primary"
                        _hover={{
                            bg: "bg.main",
                        }}
                    >
                        View profile
                    </Button>
                </Link>
            </VStack>
        </Box>
    )
};

export default ProfileCard;