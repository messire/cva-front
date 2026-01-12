import {
    Button,
    DialogActionTrigger,
    DialogBackdrop,
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

    return (
        <DialogRoot open={open} onOpenChange={(e) => setOpen(e.open)} size="lg">
            <DialogTrigger asChild>
                <Button variant="ghost" size="xs" colorPalette="blue">Edit About</Button>
            </DialogTrigger>
            <DialogBackdrop bg="blackAlpha.600" />
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit About</DialogTitle>
                </DialogHeader>
                <DialogBody pb="4">
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
                </DialogBody>
                <DialogFooter>
                    <DialogActionTrigger asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogActionTrigger>
                    <Button onClick={handleSave}>Save</Button>
                </DialogFooter>
                <DialogCloseTrigger/>
            </DialogContent>
        </DialogRoot>
    );
}
