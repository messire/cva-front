import {Box, Flex, Heading, HStack, IconButton, Text, VStack} from "@chakra-ui/react";
import {formatDate} from "../../utils/dateFormatter.js";
import {Icons} from "../../ui/icons";
import TagBadge from "../ui/TagBadge.jsx";
import {useState} from "react";
import {ExperienceEditModal} from "./ExperienceEditModal.jsx";
import {useProfileStore} from "../../stores/profile.store.js";
import {toaster} from "../../ui/toaster.jsx";

const ExperienceCard = ({workExperience, isOwner}) => {
    const [isEditOpen, setIsEditOpen] = useState(false);
    const removeExperience = useProfileStore(s => s.removeExperience);

    const startDate = formatDate(workExperience.startDate) || "Not specified";
    const endDate = formatDate(workExperience?.endDate) || "Present";
    const location = [workExperience.location?.city, workExperience.location?.country]
        .filter(Boolean)
        .join(", ");

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this experience?")) return;

        const res = await removeExperience(workExperience.id);

        if (res.ok) {
            toaster.create({title: "Experience deleted", type: "success"});
        } else {
            toaster.create({title: "Failed to delete experience", description: res.message, type: "error"});
        }
    };

    return (
        <Box w="full">
            <Flex justify="space-between" align="start">
                <VStack align='left' gap={1} w="full">
                    <HStack justify="space-between" w="full">
                        <Heading
                            fontSize='xl'
                            fontWeight='700'
                            color="text.primary"
                        >
                            {workExperience?.role}
                        </Heading>
                        {isOwner && (
                            <HStack gap={1}>
                                <IconButton size="xs" variant="ghost" onClick={() => setIsEditOpen(true)} aria-label="Edit experience"><Icons.Edit /></IconButton>
                                <IconButton size="xs" variant="ghost" colorPalette="red" onClick={handleDelete} aria-label="Delete experience"><Icons.Trash /></IconButton>
                            </HStack>
                        )}
                    </HStack>

                    <Text fontSize="md" color="text.brand" fontWeight="600">
                        {workExperience?.company}
                    </Text>

                    <HStack gap={4} color="text.secondary" fontSize="sm">
                        <HStack gap={1}>
                            <Icons.Calendar size={14}/>
                            <Text>{startDate} — {endDate}</Text>
                        </HStack>
                        {location && (
                            <HStack gap={1}>
                                <Icons.Location size={14}/>
                                <Text>{location}</Text>
                            </HStack>
                        )}
                    </HStack>

                    <Text color="text.secondary" mt={2}>{workExperience?.description}</Text>

                    {workExperience?.techStack?.length > 0 && (
                        <Flex gap={2} wrap="wrap" mt={2}>
                            {workExperience.techStack.map(stack => (
                                <TagBadge key={stack} variant="subtle" size="sm">
                                    {stack}
                                </TagBadge>
                            ))}
                        </Flex>
                    )}
                </VStack>
            </Flex>

            {isOwner && (
                <ExperienceEditModal
                    experience={workExperience}
                    isOpen={isEditOpen}
                    onOpenChange={(e) => setIsEditOpen(e.open)}
                />
            )}
        </Box>
    );
};

export default ExperienceCard;