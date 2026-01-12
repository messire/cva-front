import {Heading, VStack, Text, Separator, HStack} from "@chakra-ui/react";
import ProfileSectionCard from "../ui/ProfileSectionCard.jsx";
import ProjectCard from "./ProjectCard.jsx";
import {ProjectEditModal} from "./ProjectEditModal.jsx";

const ProjectsSection = ({profile, isOwner}) => {
    const projects = profile.projects || [];

    return (
        <ProfileSectionCard id="portfolio">
            <VStack align={'left'} gap={4}>
                <HStack justify="space-between">
                    <Heading
                        fontSize='2xl'
                        fontWeight='800'
                        letterSpacing='-0.02em'
                        color="text.primary"
                    >
                        Portfolio
                    </Heading>
                    {isOwner && <ProjectEditModal />}
                </HStack>

                <Separator borderColor="border.subtle"/>

                {projects.length > 0 ? (
                    <VStack align="stretch" gap={6}>
                        {projects.map((project, index) => (
                            <VStack key={project.id || index} align="stretch" gap={4}>
                                <ProjectCard project={project} isOwner={isOwner}/>
                                {index < projects.length - 1 && <Separator borderColor="border.subtle" variant="dashed" />}
                            </VStack>
                        ))}
                    </VStack>
                ) : (
                    <Text color="text.secondary" fontStyle="italic">
                        No projects specified.
                    </Text>
                )}
            </VStack>
        </ProfileSectionCard>
    )
};

export default ProjectsSection;