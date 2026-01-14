import { Button, Dialog } from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { useProfileStore } from "../../model/profile.store.js";
import { toaster } from "../../../../shared/ui/toaster.jsx";
import _ProfileDialogShell from "./_ProfileDialogShell.jsx";
import {Icons} from "../../../../shared/ui/icons.js";
import TagsField from "../../../../shared/ui/TagsField.jsx";

export function SkillsEditModal({ currentSkills }) {
    const initialSkills = useMemo(
        () => (Array.isArray(currentSkills) ? currentSkills.filter(Boolean) : []),
        [currentSkills]
    );

    const [open, setOpen] = useState(false);
    const [_, setValue] = useState("");
    const [skills, setSkills] = useState(initialSkills);

    const replaceSkills = useProfileStore((s) => s.replaceSkills);

    useEffect(() => {
        if (!open) return;
        setValue("");
        setSkills(initialSkills);
    }, [open, initialSkills]);

    const normalize = (s) => (s ?? "").trim();

    const handleSave = async () => {
        const clean = skills.map(normalize).filter(Boolean);

        const res = await replaceSkills({ skills: clean });

        if (res.ok) {
            toaster.create({ title: "Skills updated", type: "success" });
            setOpen(false);
        } else {
            toaster.create({ title: "Failed to update skills", description: res.message, type: "error" });
        }
    };

    const trigger = (
        <Dialog.Trigger asChild>
            <Button variant="ghost" size="xs" colorPalette="blue"><Icons.Edit/></Button>
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
            <TagsField
                label="Skills"
                placeholder="Type a skill and press Enter"
                value={skills}
                onChange={setSkills}
                maxTags={30}
            />
        </_ProfileDialogShell>
    );
}