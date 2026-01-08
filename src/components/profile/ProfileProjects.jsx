import {Heading, Text, VStack} from "@chakra-ui/react";

import {Project} from "../../models/Project.js";

import ProfileSectionCard from "../ui/ProfileSectionCard.jsx";
import ProfileProjectItem from "./ProfileProjectItem.jsx";

/**
 * @param {{ profile: import('../models/Project').Project[] }} props
 */
const ProfilePortfolio = ({projects}) => {
    return (
        <ProfileSectionCard>
            <VStack align={'left'} gap={2}>
                <Heading
                    fontSize='2xl'
                    fontWeight='800'
                    letterSpacing='-0.02em'
                    color="text.primary"
                >
                    Portfolio
                </Heading>
                {projects?.length > 0 ? (
                    <VStack gap={3} pt={2}>
                        {projects.map(p => (
                            <ProfileProjectItem project={p}/>
                        ))}
                    </VStack>
                ) : (
                    <Text color="text.secondary" fontStyle="italic">
                        No project specified.
                    </Text>
                )}
            </VStack>
        </ProfileSectionCard>
    )
};

export default ProfilePortfolio;