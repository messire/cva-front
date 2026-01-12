import {Box, Button} from "@chakra-ui/react";
import {Link} from "react-router-dom";

const ProfileCardFooter = ({id}) => {

    return (
        <Box mt="auto" pt={2}>
            <Link to={`/u/${id}`} style={{ display: "block", width: "100%" }}>
                <Button
                    w="full"
                    h="38px"
                    mt="10px"
                    borderRadius="button"
                    bg="bg.page"
                    color="text.primary"
                    _hover={{bg: "bg.main",}}
                >
                    View profile
                </Button>
            </Link>
        </Box>
    )
};

export default ProfileCardFooter;
