import {HStack, Text, VStack} from "@chakra-ui/react";
import ProfileSectionCard from "../ui/ProfileSectionCard.jsx";
import {AboutEditModal} from "./AboutEditModal.jsx";

const AboutSection = ({profile, isOwner}) => {
    const description = profile?.summary || "No description provided.";

    return (
        <ProfileSectionCard>
            <VStack align={'left'} gap={4}>
                <HStack justify="space-between">
                    <Text fontSize="lg" fontWeight="bold">About</Text>
                    {isOwner && <AboutEditModal currentSummary={profile.summary} />}
                </HStack>
                <Text fontSize="md" color="text.secondary" lineHeight="tall" whiteSpace="pre-wrap">
                    {description}
                </Text>
            </VStack>
        </ProfileSectionCard>
    );
};

export default AboutSection;