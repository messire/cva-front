import {Heading, VStack, Text, Separator, HStack} from "@chakra-ui/react";
import {useMemo} from "react";
import ProfileSectionCard from "../ui/ProfileSectionCard.jsx";
import ExperienceCard from "./ExperienceCard.jsx";
import {ExperienceEditModal} from "./ExperienceEditModal.jsx";

const toSortValue = (endDate) => {
    if (!endDate) {
        return Number.POSITIVE_INFINITY;
    }
    const t = Date.parse(endDate);
    return Number.isNaN(t)
        ? Number.NEGATIVE_INFINITY
        : t;
};

const ExperienceSection = ({profile, isOwner}) => {
    const sortedWork = useMemo(() => {
        const items = profile.workExperience;
        if (!Array.isArray(items) || items.length === 0) return [];

        return items
            .slice()
            .sort((a, b) => toSortValue(b.endDate) - toSortValue(a.endDate));
    }, [profile.workExperience]);

    return (
        <ProfileSectionCard id="work">
            <VStack align={'left'} gap={4}>
                <HStack justify="space-between">
                    <Heading
                        fontSize='2xl'
                        fontWeight='800'
                        letterSpacing='-0.02em'
                        color="text.primary"
                    >
                        Work Experience
                    </Heading>
                    {isOwner && <ExperienceEditModal/>}
                </HStack>

                <Separator borderColor="border.subtle"/>

                {sortedWork.length > 0 ? (
                    <VStack align="stretch" gap={6}>
                        {sortedWork.map((work, index) => (
                            <VStack key={work.id || index} align="stretch" gap={4}>
                                <ExperienceCard workExperience={work} isOwner={isOwner}/>
                                {index < sortedWork.length - 1 && <Separator borderColor="border.subtle" variant="dashed"/>}
                            </VStack>
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

export default ExperienceSection;