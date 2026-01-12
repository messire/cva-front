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
import {useProfileStore} from "../../model/profile.store.js";
import {toaster} from "../../../../shared/ui/toaster.jsx";

export function ProjectEditModal({project, isOpen: externalOpen, onOpenChange}) {
    const isEditing = !!project;
    const [title, setTitle] = useState(project?.title || "");
    const [description, setDescription] = useState(project?.description || "");
    const [url, setUrl] = useState(project?.url || "");
    const [imageUrl, setImageUrl] = useState(project?.imageUrl || "");
    const [techStack, setTechStack] = useState(Array.isArray(project?.techStack) ? project.techStack.join(", ") : "");

    const addProject = useProfileStore(s => s.addProject);
    const editProject = useProfileStore(s => s.editProject);

    const handleSave = async () => {
        const payload = {
            title: title.trim(),
            description: description.trim(),
            url: url.trim() || null,
            imageUrl: imageUrl.trim() || null,
            techStack: techStack.split(",").map(s => s.trim()).filter(Boolean)
        };

        const res = isEditing
            ? await editProject(project.id, payload)
            : await addProject(payload);

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
