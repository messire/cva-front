import {Checkbox, Flex, HStack, Separator, Text, VStack} from "@chakra-ui/react";
import {useMemo, useState} from "react";

import ProfileSectionCard from "../components/ProfileSectionCard.jsx";
import TagBadge from "../../../../shared/ui/TagBadge.jsx";
import {SkillsEditModal} from "../modals/SkillsEditModal.jsx";

import {buildSkillsModel} from "../../../../shared/utils/profileSkills.js";
import SectionHeading from "../components/SectionHeading.jsx";

const SkillsSection = ({profile, isOwner}) => {
    const [showCombined, setShowCombined] = useState(false);

    const model = useMemo(() => buildSkillsModel(profile), [profile]);

    const visible = showCombined
        ? [
            ...model.curated.map((s) => ({value: s, source: "profile"})),
            ...model.inferred.map((s) => ({value: s, source: "experience"})),
        ]
        : model.curated.map((s) => ({value: s, source: "profile"}));

    const isCombinedDisabled = model.counts.inferred === 0;

    return (
        <ProfileSectionCard>
            <VStack align={"left"} gap={4}>
                <HStack justify="space-between">
                    <SectionHeading flexShrink="0"> Skills </SectionHeading>
                    <Separator borderColor="border.subtle" flex="1" />
                    <Checkbox.Root
                        checked={showCombined}
                        size="sm"
                        variant="subtle"
                        colorPalette="gray"
                        onCheckedChange={(e) => setShowCombined(Boolean(e.checked))}
                        disabled={isCombinedDisabled}
                        alignSelf="center"
                        flexShrink="0"
                    >
                        <Checkbox.HiddenInput />
                        <Checkbox.Control />
                        <Checkbox.Label>Include experience</Checkbox.Label>
                    </Checkbox.Root>
                    <Separator p={2} orientation="vertical" colorPalette="red" size="md" variant="solid" />
                    {isOwner && <SkillsEditModal currentSkills={profile.skills} flexShrink="0" />}
                </HStack>

                {visible.length > 0 ? (
                    <Flex gap={2} wrap="wrap">
                        {visible.map(({ value, source }) => (
                            <TagBadge
                                key={`${source}-${value}`}
                                colorPalette={source === "profile" ? "green" : "gray"}
                            >
                                {value}
                            </TagBadge>
                        ))}
                    </Flex>
                ) : (
                    <Text fontSize="sm" color="text.secondary">
                        No skills specified.
                    </Text>
                )}
            </VStack>
        </ProfileSectionCard>
    );
};

export default SkillsSection;
