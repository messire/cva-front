import {
    Button,
    DialogActionTrigger,
    DialogBody,
    DialogCloseTrigger,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogRoot,
    DialogTitle,
    DialogTrigger,
    Stack,
    Text,
    Input,
    Textarea
} from "@chakra-ui/react";
import {useState} from "react";
import {useProfileStore} from "../../stores/profile.store.js";
import {toaster} from "../../ui/toaster.jsx";
import {mapProfileToDraft, mapDraftToUpdateRequest} from "../../models/mappers/profileMapper.js";

export function ProjectEditModal({project, profile, isOpen: externalOpen, onOpenChange}) {
    const isEditing = !!project;
    const [title, setTitle] = useState(project?.title || "");
    const [description, setDescription] = useState(project?.description || "");
    const [url, setUrl] = useState(project?.url || "");
    const [imageUrl, setImageUrl] = useState(project?.imageUrl || "");
    const [techStack, setTechStack] = useState(Array.isArray(project?.techStack) ? project.techStack.join(", ") : "");

    const updateMyProfile = useProfileStore(s => s.updateMyProfile);

    const handleSave = async () => {
        const draft = mapProfileToDraft(profile);
        const newProject = {
            id: project?.id || crypto.randomUUID(),
            title: title.trim(),
            description: description.trim(),
            url: url.trim() || null,
            imageUrl: imageUrl.trim() || null,
            techStack: techStack.split(",").map(s => s.trim()).filter(Boolean)
        };

        if (isEditing) {
            draft.projects = draft.projects.map(p => p.id === project.id ? newProject : p);
        } else {
            draft.projects = [...draft.projects, newProject];
        }

        const request = mapDraftToUpdateRequest(draft);
        const res = await updateMyProfile(request);

        if (res.ok) {
            toaster.create({title: isEditing ? "Project updated" : "Project added", type: "success"});
            if (onOpenChange) onOpenChange({open: false});
        } else {
            toaster.create({title: "Failed to save project", description: res.message, type: "error"});
        }
    };

    return (
        <DialogRoot open={externalOpen} onOpenChange={onOpenChange} size="lg">
            {!isEditing && (
                <DialogTrigger asChild>
                    <Button size="sm" variant="outline">+ Add Project</Button>
                </DialogTrigger>
            )}
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{isEditing ? "Edit Project" : "Add Project"}</DialogTitle>
                </DialogHeader>
                <DialogBody pb="4">
                    <Stack gap="4">
                        <Stack gap="2">
                            <Text fontSize="sm" fontWeight="medium">Title</Text>
                            <Input value={title} onChange={e => setTitle(e.target.value)} />
                        </Stack>
                        <Stack gap="2">
                            <Text fontSize="sm" fontWeight="medium">Project URL</Text>
                            <Input value={url} onChange={e => setUrl(e.target.value)} />
                        </Stack>
                        <Stack gap="2">
                            <Text fontSize="sm" fontWeight="medium">Image URL</Text>
                            <Input value={imageUrl} onChange={e => setImageUrl(e.target.value)} />
                        </Stack>
                        <Stack gap="2">
                            <Text fontSize="sm" fontWeight="medium">Tech Stack (comma separated)</Text>
                            <Input value={techStack} onChange={e => setTechStack(e.target.value)} />
                        </Stack>
                        <Stack gap="2">
                            <Text fontSize="sm" fontWeight="medium">Description</Text>
                            <Textarea value={description} onChange={e => setDescription(e.target.value)} rows={4} />
                        </Stack>
                    </Stack>
                </DialogBody>
                <DialogFooter>
                    <DialogActionTrigger asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogActionTrigger>
                    <Button onClick={handleSave}>Save</Button>
                </DialogFooter>
                <DialogCloseTrigger />
            </DialogContent>
        </DialogRoot>
    );
}