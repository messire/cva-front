import {Flex, HStack, Text, VStack} from "@chakra-ui/react";
import ProfileSectionCard from "../components/ProfileSectionCard.jsx";
import TagBadge from "../../../../shared/ui/TagBadge.jsx";
import {SkillsEditModal} from "../modals/SkillsEditModal.jsx";

const SkillsSection = ({profile, isOwner}) => {
    const skills = profile.skills || [];

    return (
        <ProfileSectionCard>
            <VStack align={'left'} gap={4}>
                <HStack justify="space-between">
                    <Text fontSize="lg" fontWeight="bold">Skills</Text>
                    {isOwner && <SkillsEditModal currentSkills={profile.skills} />}
                </HStack>
                {skills.length > 0 ? (
                    <Flex gap={2} wrap="wrap">
                        {skills.map(skill => (
                            <TagBadge key={skill}>{skill}</TagBadge>
                        ))}
                    </Flex>
                ) : (
                    <Text fontSize="sm" color="text.secondary">No skills specified.</Text>
                )}
            </VStack>
        </ProfileSectionCard>
    );
};

export default SkillsSection;
