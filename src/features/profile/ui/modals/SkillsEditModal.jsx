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
    Textarea
} from "@chakra-ui/react";
import {useState} from "react";
import {useProfileStore} from "../../model/profile.store.js";
import {toaster} from "../../../../shared/ui/toaster.jsx";

export function SkillsEditModal({currentSkills}) {
    const [skillsText, setSkillsText] = useState(Array.isArray(currentSkills) ? currentSkills.join(", ") : "");
    const [open, setOpen] = useState(false);
    const replaceSkills = useProfileStore(s => s.replaceSkills);

    const handleSave = async () => {
        const skillsArray = skillsText
            .split(",")
            .map(s => s.trim())
            .filter(Boolean);

        const res = await replaceSkills({ skills: skillsArray });

        if (res.ok) {
            toaster.create({title: "Skills updated", type: "success"});
            setOpen(false);
        } else {
            toaster.create({title: "Failed to update skills", description: res.message, type: "error"});
        }
    };

    return (
        <DialogRoot open={open} onOpenChange={(e) => setOpen(e.open)}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="xs" colorPalette="blue">Edit Skills</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Skills</DialogTitle>
                </DialogHeader>
                <DialogBody pb="4">
                    <Stack gap="4">
                        <Stack gap="2">
                            <Text fontSize="sm" fontWeight="medium">Skills (comma separated)</Text>
                            <Textarea
                                placeholder="C#, React, .NET..."
                                value={skillsText}
                                onChange={(e) => setSkillsText(e.target.value)}
                            />
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
