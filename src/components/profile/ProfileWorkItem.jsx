import {Heading, Flex, List, Text, VStack, Badge, HStack, Separator, Box} from "@chakra-ui/react";

import {formatDate} from "../../utils/dateFormatter.js";

import {FaCalendarAlt, FaMapMarkerAlt} from "react-icons/fa";

const ProfileWorkItem = ({workExperience}) => {
    const startDate = formatDate(workExperience?.startDate) || "Not specified";
    const endDate = formatDate(workExperience?.endDate) || "Present";

    return (
        <Box
            p={5}
            borderRadius="xl"
            bg="bg.page"
            border="1px solid"
            borderColor="border.subtle"
            _hover={{borderColor: "text.brand", boxShadow: "soft"}}
            transition="all 0.2s"
        >
            <VStack align={'left'} gap={4}>
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
                        <FaCalendarAlt size={14}/>
                        <Text fontWeight="600">{startDate} - {endDate}</Text>
                    </HStack>
                </Flex>

                <HStack gap={3} flexWrap="wrap">
                    <Text
                        fontSize="md"
                        color="text.brand"
                        fontWeight="700"
                    >
                        {workExperience?.companyName}
                    </Text>
                    <Separator
                        orientation="vertical"
                        height="14px"
                        borderColor="border.subtle"
                    />
                    <HStack gap={1} color="text.secondary" fontSize="sm">
                        <FaMapMarkerAlt size={14}/>
                        <Text>{workExperience?.location}</Text>
                    </HStack>
                </HStack>

                {workExperience?.achievements?.length > 0 && (
                    <List.Root
                        ps={{base: 6, md: 8, xl: 10}}
                        gap={2}
                        color="text.secondary"
                        fontSize="md">
                        {workExperience.achievements.map((a, i) => (
                            <List.Item key={i}>{a}</List.Item>
                        ))}
                    </List.Root>
                )}

                {workExperience?.techStack?.length > 0 && (
                    <Flex gap={2} wrap="wrap" pt={2}>
                        {workExperience.techStack.map(stack => (
                            <Badge
                                key={stack}
                                size='sm'
                                variant="outline"
                                colorPalette="gray"
                                borderRadius="md"
                                textTransform="none"
                            >
                                {stack}
                            </Badge>
                        ))}
                    </Flex>
                )}
            </VStack>
        </Box>
    )
};

export default ProfileWorkItem;