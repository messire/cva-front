import {Box, Flex, HStack, IconButton, Text, VStack, Image} from "@chakra-ui/react";
import {useState} from "react";

import TagBadge from "../../../../shared/ui/TagBadge.jsx";
import {ProjectEditModal} from "../modals/ProjectEditModal.jsx";
import {useProfileStore} from "../../model/profile.store.js";
import {toaster} from "../../../../shared/ui/toaster.jsx";
import SubSectionHeading from "../components/SubSectionHeading.jsx";

import {Icons} from "../../../../shared/ui/icons.js";
import {useColorModeValue} from "../../../../shared/ui/color-mode.jsx";

import defaultProjectIcon from "/images/project.svg";

const ProjectCard = ({project, isOwner}) => {
    const [isEditOpen, setIsEditOpen] = useState(false);
    const removeProject = useProfileStore(s => s.removeProject);

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this project?")) return;

        const res = await removeProject(project.id);
        if (res.ok) {
            toaster.create({title: "Project deleted", type: "success"});
        } else {
            toaster.create({title: "Failed to delete project", description: res.message, type: "error"});
        }
    };

    return (
        <Box w="full">
            <Flex gap={4} align="start" direction={{base: "column", sm: "row"}} pl={6}>
                <Image
                    src={project.iconUrl || defaultProjectIcon}
                    alt={project.name}
                    boxSize="100px"
                    borderRadius="md"
                    objectFit="cover"
                    flexShrink={0}
                />

                <VStack align='left' gap={1} w="full">
                    <HStack justify="space-between" w="full">
                        <SubSectionHeading> {project.name} </SubSectionHeading>
                        {isOwner && (
                            <HStack gap={1}>
                                <IconButton size="xs" variant="ghost" onClick={() => setIsEditOpen(true)} aria-label="Edit project"><Icons.Edit/></IconButton>
                                <IconButton size="xs" variant="ghost" colorPalette="red" onClick={handleDelete} aria-label="Delete project"><Icons.Trash/></IconButton>
                            </HStack>
                        )}
                    </HStack>

                    {project.linkUrl && (
                        <Text
                            as="a"
                            href={project.linkUrl}
                            target="_blank"
                            fontSize="sm"
                            color="text.brand"
                            _hover={{textDecoration: "underline"}}
                        >
                            {project.linkUrl}
                        </Text>
                    )}

                    <Text color="text.secondary" mt={2} whiteSpace="pre-line">{project.description}</Text>

                    {project.techStack?.length > 0 && (
                        <Flex gap={2} wrap="wrap" mt={2}>
                            {project.techStack.map(stack => (
                                <TagBadge key={stack} variant="subtle" size="sm">
                                    {stack}
                                </TagBadge>
                            ))}
                        </Flex>
                    )}
                </VStack>
            </Flex>

            {isOwner && (
                <ProjectEditModal
                    project={project}
                    isOpen={isEditOpen}
                    onOpenChange={(e) => setIsEditOpen(e.open)}
                />
            )}
        </Box>
    );
};

export default ProjectCard;
