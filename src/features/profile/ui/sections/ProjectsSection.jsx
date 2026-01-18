import {VStack, Text, Separator, HStack} from "@chakra-ui/react";
import ProfileSectionCard from "../components/ProfileSectionCard.jsx";
import ProjectCard from "../cards/ProjectCard.jsx";
import {ProjectEditModal} from "../modals/ProjectEditModal.jsx";
import SectionHeading from "../components/SectionHeading.jsx";

const ProjectsSection = ({profile, isOwner}) => {
    const projects = profile.projects || [];

    return (
        <ProfileSectionCard id="portfolio">
            <VStack align={'left'} gap={4}>
                <HStack justify="space-between">
                    <SectionHeading flexShrink="0"> Portfolio </SectionHeading>
                    <Separator flex="1"/>
                    {isOwner && <ProjectEditModal flexShrink="0"/>}
                </HStack>
                {projects.length > 0 ? (
                    <VStack align="stretch" gap={6}>
                        {projects.map((project, index) => (
                            <VStack key={project.id || index} align="stretch" gap={4}>
                                <ProjectCard project={project} isOwner={isOwner}/>
                                {index < projects.length - 1 && <Separator variant="dashed"/>}
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
