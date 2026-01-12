import {Button, Dialog, Stack, Text, Input, Textarea} from "@chakra-ui/react";
import {useMemo, useState} from "react";
import {useProfileStore} from "../../model/profile.store.js";
import {toaster} from "../../../../shared/ui/toaster.jsx";
import _ProfileDialogShell from "./_ProfileDialogShell.jsx";

export function ExperienceEditModal({experience, isOpen: externalOpen, onOpenChange}) {
    const isEditing = !!experience;
    const [company, setCompany] = useState(experience?.company || "");
    const [role, setRole] = useState(experience?.role || "");
    const [startDate, setStartDate] = useState(experience?.startDate ? experience.startDate.split('T')[0] : "");
    const [endDate, setEndDate] = useState(experience?.endDate ? experience.endDate.split('T')[0] : "");
    const [description, setDescription] = useState(experience?.description || "");
    const [city, setCity] = useState(experience?.location?.city || "");
    const [country, setCountry] = useState(experience?.location?.country || "");
    const [techStack, setTechStack] = useState(Array.isArray(experience?.techStack) ? experience.techStack.join(", ") : "");

    const addExperience = useProfileStore(s => s.addExperience);
    const editExperience = useProfileStore(s => s.editExperience);

    const title = useMemo(() => (isEditing ? "Edit Experience" : "Add Experience"), [isEditing]);

    const handleSave = async () => {
        const payload = {
            company: company.trim(),
            role: role.trim(),
            startDate: startDate || null,
            endDate: endDate || null,
            description: description.trim(),
            location: {city: city.trim(), country: country.trim()},
            techStack: techStack.split(",").map(s => s.trim()).filter(Boolean)
        };

        const res = isEditing
            ? await editExperience(experience.id, payload)
            : await addExperience(payload);

        if (res.ok) {
            toaster.create({title: isEditing ? "Experience updated" : "Experience added", type: "success"});
            if (onOpenChange) {
                onOpenChange({open: false});
            }
        } else {
            toaster.create({title: "Failed to save experience", description: res.message, type: "error"});
        }
    };

    const trigger = !isEditing ? (
        <Dialog.Trigger asChild>
            <Button size="sm" variant="outline">+ Add Experience</Button>
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
            title={title}
            open={externalOpen}
            onOpenChange={onOpenChange}
            trigger={trigger}
            footer={footer}
        >
            <Stack gap="4">
                <Stack gap="2">
                    <Text fontSize="sm" fontWeight="medium">Company</Text>
                    <Input value={company} onChange={e => setCompany(e.target.value)}/>
                </Stack>
                <Stack gap="2">
                    <Text fontSize="sm" fontWeight="medium">Role</Text>
                    <Input value={role} onChange={e => setRole(e.target.value)}/>
                </Stack>
                <Stack direction="row" gap="4">
                    <Stack gap="2" flex="1">
                        <Text fontSize="sm" fontWeight="medium">Start Date</Text>
                        <Input type="date" value={startDate} onChange={e => setStartDate(e.target.value)}/>
                    </Stack>
                    <Stack gap="2" flex="1">
                        <Text fontSize="sm" fontWeight="medium">End Date</Text>
                        <Input type="date" value={endDate} onChange={e => setEndDate(e.target.value)}/>
                    </Stack>
                </Stack>
                <Stack gap="2">
                    <Text fontSize="sm" fontWeight="medium">Location</Text>
                    <Stack direction="row" gap="4">
                        <Input placeholder="City" value={city} onChange={e => setCity(e.target.value)}/>
                        <Input placeholder="Country" value={country} onChange={e => setCountry(e.target.value)}/>
                    </Stack>
                </Stack>
                <Stack gap="2">
                    <Text fontSize="sm" fontWeight="medium">Tech Stack (comma separated)</Text>
                    <Input value={techStack} onChange={e => setTechStack(e.target.value)}/>
                </Stack>
                <Stack gap="2">
                    <Text fontSize="sm" fontWeight="medium">Description</Text>
                    <Textarea value={description} onChange={e => setDescription(e.target.value)} rows={4}/>
                </Stack>
            </Stack>
        </_ProfileDialogShell>
    );
}
