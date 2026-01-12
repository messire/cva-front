import {Button, Dialog, Stack, Text, Textarea} from "@chakra-ui/react";
import {useState} from "react";
import {useProfileStore} from "../../model/profile.store.js";
import {toaster} from "../../../../shared/ui/toaster.jsx";
import _ProfileDialogShell from "./_ProfileDialogShell.jsx";

export function SkillsEditModal({currentSkills}) {
    const [skillsText, setSkillsText] = useState(Array.isArray(currentSkills) ? currentSkills.join(", ") : "");
    const [open, setOpen] = useState(false);
    const replaceSkills = useProfileStore(s => s.replaceSkills);

    const handleSave = async () => {
        const skillsArray = skillsText
            .split(",")
            .map(s => s.trim())
            .filter(Boolean);

        const res = await replaceSkills({skills: skillsArray});

        if (res.ok) {
            toaster.create({title: "Skills updated", type: "success"});
            setOpen(false);
        } else {
            toaster.create({title: "Failed to update skills", description: res.message, type: "error"});
        }
    };

    const trigger = (
        <Dialog.Trigger asChild>
            <Button variant="ghost" size="xs" colorPalette="blue">Edit Skills</Button>
        </Dialog.Trigger>
    );

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
            title="Edit Skills"
            open={open}
            onOpenChange={(e) => setOpen(e.open)}
            trigger={trigger}
            footer={footer}
        >
            <Stack gap="4">
                <Stack gap="2">
                    <Text fontSize="sm" fontWeight="medium">Skills (comma separated)</Text>
                    <Textarea
                        placeholder="Enter your skills"
                        value={skillsText}
                        onChange={(e) => setSkillsText(e.target.value)}
                        rows={6}
                    />
                </Stack>
            </Stack>
        </_ProfileDialogShell>
    );
}
