import {Heading, VStack, Text} from "@chakra-ui/react";
import {useMemo} from "react";

import ProfileSectionCard from "./ProfileSectionCard.jsx";
import ProfileWorkItem from "./ProfileWorkItem.jsx";

const toSortValue = (endDate) => {
    if (!endDate) return Number.POSITIVE_INFINITY;
    const t = Date.parse(endDate);
    return Number.isNaN(t) ? Number.NEGATIVE_INFINITY : t;
};

const ProfileWork = ({user}) => {
    const sortedWork = useMemo(() => {
        const items = user?.workExperience;
        if (!Array.isArray(items) || items.length === 0) return [];

        return items
            .slice()
            .sort((a, b) => toSortValue(b.endDate) - toSortValue(a.endDate));
    }, [user?.workExperience]);
    return (
        <ProfileSectionCard>
            <VStack align={'left'} gap={6}>
                <Heading
                    fontSize='2xl'
                    fontWeight='800'
                    letterSpacing='-0.02em'
                    color="text.primary"
                >
                    Work experience
                </Heading>

                {sortedWork.length > 0 ? (
                    <VStack align="stretch" gap={6}>
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