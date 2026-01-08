import {Box, Flex, Heading, HStack, Separator, Text, VStack} from "@chakra-ui/react";

import {formatDate} from "../../utils/dateFormatter.js";

import TagBadge from "../ui/TagBadge.jsx";

import { Icons } from "../../ui/icons";

/**
 * @param {{ workExperience: import('../models/WorkExperience').WorkExperience }} props
 */
const ProfileWorkItem = ({workExperience}) => {
    const startDate = formatDate(workExperience.startDate) || "Not specified";
    const endDate = formatDate(workExperience?.endDate) || "Present";
    const location = [workExperience.location?.city, workExperience.location?.country]
        .filter(Boolean)
        .join(", ");

    return (
        <Box
            p={4}
            borderRadius="xl"
            bg="bg.page"
            border="1px solid"
            borderColor="border.subtle"
            _hover={{borderColor: "text.brand", boxShadow: "soft"}}
            transition="all 0.2s"
        >
            <VStack align={'left'} gap={2}>
                <Flex
                    alignItems={{base: "flex-start", md: "center"}}
                    justifyContent="space-between"
                    flexDir={{base: "column", md: "row"}}
                    gap={2}
                >
                    <Heading
                        fontSize='xl'
                        fontWeight='700'
                        color="text.primary"
                    >
                        {workExperience?.role}
                    </Heading>
                    <HStack gap={2} color="text.secondary" fontSize="sm">
                        <Icons.Calendar size={14}/>
                        <Text fontWeight="600">{startDate} - {endDate}</Text>
                    </HStack>
                </Flex>

                <HStack gap={2} flexWrap="wrap">
                    <Text
                        fontSize="md"
                        color="text.brand"
                        fontWeight="700"
                    >
                        {workExperience?.company}
                    </Text>
                    <Separator
                        orientation="vertical"
                        height="14px"
                        borderColor="border.subtle"
                    />
                    <HStack gap={1} color="text.secondary" fontSize="sm">
                        <Icons.Location size={14}/>
                        <Text>{location}</Text>
                    </HStack>
                </HStack>
                <Text>{workExperience?.description}</Text>

                {workExperience?.techStack?.length > 0 && (
                    <Flex gap={2} wrap="wrap" pt={2}>
                        {workExperience.techStack.map(stack => (
                            <TagBadge key={stack} size='sm'>
                                {stack}
                            </TagBadge>
                        ))}
                    </Flex>
                )}
            </VStack>
        </Box>
    )
};

export default ProfileWorkItem;