import {Button, Dialog, Stack, Text, Textarea} from "@chakra-ui/react";
import {useState} from "react";

import {useProfileStore} from "../../model/profile.store.js";
import {toaster} from "../../../../shared/ui/toaster.jsx";
import _ProfileDialogShell from "./_ProfileDialogShell.jsx";
import {Icons} from "../../../../shared/ui/icons.js";

export function AboutEditModal({currentSummary}) {
    const [summary, setSummary] = useState(currentSummary || "");
    const [open, setOpen] = useState(false);
    const updateSummary = useProfileStore(s => s.updateSummary);

    const handleSave = async () => {
        const res = await updateSummary({summary: summary.trim()});

        if (res.ok) {
            toaster.create({title: "About section updated", type: "success"});
            setOpen(false);
        } else {
            toaster.create({title: "Failed to update about section", description: res.message, type: "error"});
        }
    };

    const trigger = (
        <Dialog.Trigger asChild>
            <Button variant="ghost" size="xs"><Icons.Edit/></Button>
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
            title="Edit About"
            open={open}
            onOpenChange={(e) => setOpen(e.open)}
            trigger={trigger}
            footer={footer}
        >
            <Stack gap="4">
                <Stack gap="2">
                    <Text fontSize="sm" fontWeight="medium">Summary</Text>
                    <Textarea
                        placeholder="Tell us about yourself..."
                        value={summary}
                        onChange={(e) => setSummary(e.target.value)}
                        rows={10}
                    />
                </Stack>
            </Stack>
        </_ProfileDialogShell>
    );
}
