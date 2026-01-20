import {Badge, Flex, Text, VStack} from "@chakra-ui/react";

const MAX_SKILLS = 5;

const ProfileCardBody = ({profile}) => {
    const skills = profile?.skills ?? [];
    const visibleSkills = skills.slice(0, MAX_SKILLS);
    const hiddenCount = skills.length - visibleSkills.length;

    return (
        <VStack gap={2} alignItems="flex-start" px={2}>
            {skills.length > 0 ? (
                <Flex
                    gap={2}
                    wrap="nowrap"
                    overflow="hidden"
                    width="100%"
                >
                    {visibleSkills.map((skill, index) => (
                        <Badge
                            key={`${skill}-${index}`}
                            p="10px"
                            h="26px"
                            borderRadius="6px"
                            bg="bg.page"
                            color="text.primary"
                            fontSize="12px"
                            fontWeight="600"
                            textTransform="none"
                            flexShrink={0}
                            whiteSpace="nowrap"
                        >
                            {skill}
                        </Badge>
                    ))}
                    {hiddenCount > 0 && (
                        <Badge variant="subtle">+{hiddenCount}</Badge>
                    )}
                </Flex>
            ) : (
                <Text color="text.secondary" fontStyle="italic">
                    No skills specified.
                </Text>
            )}
            <Text
                fontSize="md"
                color="text.secondary"
                lineHeight="tall"
                lineClamp={2}
            >
                {profile?.summary ?? "No description provided."}
            </Text>
        </VStack>
    )
};

export default ProfileCardBody;
