import {Box, Button, Center} from "@chakra-ui/react";
import {Link} from "react-router-dom";

const ProfileCardFooter = ({id}) => {

    return (
        <Box mt="auto" pt={2} aligh="center">
            <Link to={`/u/${id}`} style={{display: "block", width: "100%"}}>
                <Center>
                    <Button h="28px" mt="10px">
                        View profile
                    </Button>
                </Center>
            </Link>
        </Box>
    )
};

export default ProfileCardFooter;
