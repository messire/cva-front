import {Button, Dialog, Stack, Text, Input, Textarea} from "@chakra-ui/react";
import {useMemo, useState} from "react";
import {useProfileStore} from "../../model/profile.store.js";
import {toaster} from "../../../../shared/ui/toaster.jsx";
import _ProfileDialogShell from "./_ProfileDialogShell.jsx";
import TagsField from "../../../../shared/ui/TagsField.jsx";

import {Icons} from "../../../../shared/ui/icons.js";

export function ProjectEditModal({project, isOpen: externalOpen, onOpenChange}) {
    const isEditing = !!project;
    const [name, setName] = useState(project?.name || "");
    const [description, setDescription] = useState(project?.description || "");
    const [linkUrl, setLinkUrl] = useState(project?.linkUrl || "");
    const [iconUrl, setIconUrl] = useState(project?.iconUrl || "");
    const [techStack, setTechStack] = useState(Array.isArray(project?.techStack) ? project.techStack.join(", ") : "");

    const addProject = useProfileStore(s => s.addProject);
    const editProject = useProfileStore(s => s.editProject);

    const handleSave = async () => {
        const payload = {
            name: name.trim(),
            description: description.trim(),
            linkUrl: linkUrl.trim() || null,
            iconUrl: iconUrl.trim() || null,
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

    const dialogTitle = useMemo(() => (isEditing ? "Edit Project" : "Add Project"), [isEditing]);

    const trigger = !isEditing ? (
        <Dialog.Trigger asChild>
            <Button variant="ghost" size="xs" colorPalette="blue"><Icons.AddProject/></Button>
        </Dialog.Trigger>
    ) : null;

    const footer = (
        <Dialog.Footer>
            <Dialog.ActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
            </Dialog.ActionTrigger>
            <Button onClick={handleSave}>Save</Button>
        </Dialog.Footer>
    );

    return (
        <_ProfileDialogShell
            title={dialogTitle}
            open={externalOpen}
            onOpenChange={onOpenChange}
            trigger={trigger}
            footer={footer}
        >
            <Stack gap="4">
                <Stack gap="2">
                    <Text fontSize="sm" fontWeight="medium">Title</Text>
                    <Input value={name} onChange={e => setName(e.target.value)}/>
                </Stack>
                <Stack gap="2">
                    <Text fontSize="sm" fontWeight="medium">URL</Text>
                    <Input value={linkUrl} onChange={e => setLinkUrl(e.target.value)} placeholder="https://..."/>
                </Stack>
                <Stack gap="2">
                    <Text fontSize="sm" fontWeight="medium">Image URL</Text>
                    <Input value={iconUrl} onChange={e => setIconUrl(e.target.value)} placeholder="https://..."/>
                </Stack>
                <TagsField
                    label="Tech Stack"
                    placeholder="Add tag..."
                    value={techStack}
                    onChange={setTechStack}
                    maxTags={20}
                />
                <Stack gap="2">
                    <Text fontSize="sm" fontWeight="medium">Description</Text>
                    <Textarea value={description} onChange={e => setDescription(e.target.value)} rows={4}/>
                </Stack>
            </Stack>
        </_ProfileDialogShell>
    );
}
