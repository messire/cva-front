import {Heading, VStack, Text, Flex, Badge, Separator} from "@chakra-ui/react";
import {useMemo} from "react";

import {collectUniqueSkills} from "../../utils/profileSkills.js";

import ProfileSectionCard from "../ui/ProfileSectionCard.jsx";
import ProfileWorkItem from "./ProfileWorkItem.jsx";
import TagBadge from "../ui/TagBadge.jsx";

const toSortValue = (endDate) => {
    if (!endDate) return Number.POSITIVE_INFINITY;
    const t = Date.parse(endDate);
    return Number.isNaN(t) ? Number.NEGATIVE_INFINITY : t;
};

/**
 * @param {{ profile: import('../models/DeveloperProfileDetails').DeveloperProfileDetails }} props
 */
const ProfileWork = ({profile}) => {
    const sortedWork = useMemo(() => {
        const items = profile.workExperience;
        if (!Array.isArray(items) || items.length === 0) return [];

        return items
            .slice()
            .sort((a, b) => toSortValue(b.endDate) - toSortValue(a.endDate));
    }, [profile.workExperience]);
    const skills = useMemo(() => collectUniqueSkills(profile), [profile]);

    return (
        <ProfileSectionCard>
            <VStack align={'left'} gap={2}>
                <Heading
                    fontSize='2xl'
                    fontWeight='800'
                    letterSpacing='-0.02em'
                    color="text.primary"
                >
                    Experience
                </Heading>
                {skills?.length > 0 ? (
                    <Flex gap={3} wrap="wrap" pt={2}>
                        {skills.map(skill => (
                            <TagBadge key={skill}>
                                {skill}
                            </TagBadge>
                        ))}
                    </Flex>
                ) : (
                    <Text color="text.secondary" fontStyle="italic">
                        No skills specified.
                    </Text>
                )}
                <Separator borderColor="border.subtle"/>
                {sortedWork.length > 0 ? (
                    <VStack align="stretch" gap={4}>
                        {sortedWork.map((work, index) => (
                            <ProfileWorkItem key={index} workExperience={work}/>
                        ))}
                    </VStack>
                ) : (
                    <Text color="text.secondary" fontStyle="italic">
                        No work experience specified.
                    </Text>
                )}
            </VStack>
        </ProfileSectionCard>
    )
};

export default ProfileWork;