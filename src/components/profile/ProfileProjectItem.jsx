import {Heading, Flex, Text, VStack, HStack, Box, Image} from "@chakra-ui/react";
import {Link} from "react-router-dom";

import TagBadge from "../ui/TagBadge.jsx";

/**
 * @param {{ project: import('../models/Project').Project }} props
 */
const ProfileProjectItem = ({project}) => {

    const projectIcon = project.iconUrl ? project.iconUrl : "/images/project.svg";

    return (
        <Box
            p={4}
            w='full'
            borderRadius="xl"
            bg="bg.page"
            border="1px solid"
            borderColor="border.subtle"
            _hover={{borderColor: "text.brand", boxShadow: "soft"}}
            transition="all 0.2s"
        >
            <HStack gap={2}>
                <Image
                    src={projectIcon}
                    boxSize="64px"
                    borderRadius="sm"
                    fit="cover"
                />
                <VStack gap={2} align='start'>
                    <Link to={project.linkUrl}>
                        <Heading
                            fontSize='xl'
                            fontWeight='500'
                            color="text.primary"
                        >
                            {project.name}
                        </Heading>
                    </Link>
                    <Text fontSize='md'>{project.description}</Text>
                    {project.techStack?.length > 0 && (
                        <Flex gap={3} wrap="wrap" pt={2}>
                            {project.techStack.map(stack => (
                                <TagBadge key={stack}>{stack}</TagBadge>
                            ))}
                        </Flex>
                    )}
                </VStack>
            </HStack>
        </Box>
    )
};

export default ProfileProjectItem;