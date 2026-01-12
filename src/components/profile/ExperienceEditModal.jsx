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

    return (
        <DialogRoot open={externalOpen} onOpenChange={onOpenChange} size="lg">
            {!isEditing && (
                <DialogTrigger asChild>
                    <Button size="sm" variant="outline">+ Add Experience</Button>
                </DialogTrigger>
            )}
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{isEditing ? "Edit Experience" : "Add Experience"}</DialogTitle>
                </DialogHeader>
                <DialogBody pb="4">
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
                        <Stack direction="row" gap="4">
                            <Stack gap="2" flex="1">
                                <Text fontSize="sm" fontWeight="medium">City</Text>
                                <Input value={city} onChange={e => setCity(e.target.value)}/>
                            </Stack>
                            <Stack gap="2" flex="1">
                                <Text fontSize="sm" fontWeight="medium">Country</Text>
                                <Input value={country} onChange={e => setCountry(e.target.value)}/>
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