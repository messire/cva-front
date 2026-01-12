import {Box, Flex, Heading, HStack, IconButton, Text, VStack, Image} from "@chakra-ui/react";
import {Icons} from "../../ui/icons";
import TagBadge from "../ui/TagBadge.jsx";
import {useState} from "react";
import {ProjectEditModal} from "./ProjectEditModal.jsx";
import {useProfileStore} from "../../stores/profile.store.js";
import {toaster} from "../../ui/toaster.jsx";
import {mapProfileToDraft, mapDraftToUpdateRequest} from "../../models/mappers/profileMapper.js";

const ProjectCard = ({project, profile, isOwner}) => {
    const [isEditOpen, setIsEditOpen] = useState(false);
    const updateMyProfile = useProfileStore(s => s.updateMyProfile);

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this project?")) return;

        const draft = mapProfileToDraft(profile);
        draft.projects = draft.projects.filter(p => p.id !== project.id);

        const request = mapDraftToUpdateRequest(draft);
        const res = await updateMyProfile(request);

        if (res.ok) {
            toaster.create({title: "Project deleted", type: "success"});
        } else {
            toaster.create({title: "Failed to delete project", description: res.message, type: "error"});
        }
    };

    return (
        <Box w="full">
            <Flex gap={4} align="start" direction={{base: "column", sm: "row"}}>
                {project.imageUrl && (
                    <Image
                        src={project.imageUrl}
                        alt={project.title}
                        boxSize="100px"
                        borderRadius="md"
                        objectFit="cover"
                        flexShrink={0}
                    />
                )}
                <VStack align='left' gap={1} w="full">
                    <HStack justify="space-between" w="full">
                        <Heading
                            fontSize='xl'
                            fontWeight='700'
                            color="text.primary"
                        >
                            {project.title}
                        </Heading>
                        {isOwner && (
                            <HStack gap={1}>
                                <IconButton size="xs" variant="ghost" onClick={() => setIsEditOpen(true)} aria-label="Edit project"><Icons.Edit /></IconButton>
                                <IconButton size="xs" variant="ghost" colorPalette="red" onClick={handleDelete} aria-label="Delete project"><Icons.Trash /></IconButton>
                            </HStack>
                        )}
                    </HStack>

                    {project.url && (
                        <Text
                            as="a"
                            href={project.url}
                            target="_blank"
                            fontSize="sm"
                            color="text.brand"
                            _hover={{textDecoration: "underline"}}
                        >
                            {project.url}
                        </Text>
                    )}

                    <Text color="text.secondary" mt={2}>{project.description}</Text>

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
                    profile={profile}
                    isOpen={isEditOpen}
                    onOpenChange={(e) => setIsEditOpen(e.open)}
                />
            )}
        </Box>
    );
};

export default ProjectCard;