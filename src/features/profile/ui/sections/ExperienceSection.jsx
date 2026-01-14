import {VStack, Text, Separator, HStack} from "@chakra-ui/react";
import {useMemo} from "react";
import ProfileSectionCard from "../components/ProfileSectionCard.jsx";
import ExperienceCard from "../cards/ExperienceCard.jsx";
import {ExperienceEditModal} from "../modals/ExperienceEditModal.jsx";
import SectionHeading from "../components/SectionHeading.jsx";

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
                    <SectionHeading flexShrink="0"> Work Experience </SectionHeading>
                    <Separator borderColor="border.subtle" flex="1"/>
                    {isOwner && <ExperienceEditModal flexShrink="0"/>}
                </HStack>

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
