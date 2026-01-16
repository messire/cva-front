import {Button, Dialog} from "@chakra-ui/react";
import {useEffect, useMemo, useState} from "react";
import {useProfileStore} from "../../model/profile.store.js";
import {toaster} from "../../../../shared/ui/toaster.jsx";
import _ProfileDialogShell from "./_ProfileDialogShell.jsx";

import {ExperienceForm} from "./experience/ExperienceForm.jsx";
import {isoToMonth, monthToPeriodEndIso, monthToPeriodStartIso} from "../../../../shared/utils/monthDateUtils.js";
import {Icons} from "../../../../shared/ui/icons.js";

export function ExperienceEditModal({experience, isOpen: externalOpen, onOpenChange}) {
    const isEditing = !!experience;

    const [internalOpen, setInternalOpen] = useState(false);
    const open = externalOpen ?? internalOpen;

    const [company, setCompany] = useState(experience?.company || "");
    const [role, setRole] = useState(experience?.role || "");
    const [startMonth, setStartMonth] = useState(isoToMonth(experience?.startDate));
    const [endMonth, setEndMonth] = useState(isoToMonth(experience?.endDate));
    const [description, setDescription] = useState(experience?.description || "");
    const [city, setCity] = useState(experience?.location?.city || "");
    const [country, setCountry] = useState(experience?.location?.country || "");
    const [techStackTags, setTechStackTags] = useState(
        Array.isArray(experience?.techStack) ? experience.techStack : []
    );

    const addExperience = useProfileStore(s => s.addExperience);
    const editExperience = useProfileStore(s => s.editExperience);

    const title = useMemo(() => (isEditing ? "Edit Experience" : "Add Experience"), [isEditing]);

    useEffect(() => {
        setCompany(experience?.company || "");
        setRole(experience?.role || "");
        setStartMonth(isoToMonth(experience?.startDate));
        setEndMonth(isoToMonth(experience?.endDate));
        setDescription(experience?.description || "");
        setCity(experience?.location?.city || "");
        setCountry(experience?.location?.country || "");
        setTechStackTags(Array.isArray(experience?.techStack) ? experience.techStack : []);
    }, [experience]);

    useEffect(() => {
        if (isEditing) return;
        if (open) return;

        setCompany("");
        setRole("");
        setStartMonth("");
        setEndMonth("");
        setDescription("");
        setCity("");
        setCountry("");
        setTechStackTags([]);
    }, [open, isEditing]);

    const handleSave = async () => {

        const payload = {
            company: company.trim(),
            role: role.trim(),
            startDate: startMonth ? monthToPeriodStartIso(startMonth) : null,
            endDate: endMonth ? monthToPeriodEndIso(endMonth) : null,
            description: description.trim(),
            location: {city: city.trim(), country: country.trim()},
            techStack: (techStackTags || []).map(s => String(s).trim()).filter(Boolean),
        };

        const res = isEditing
            ? await editExperience(experience.id, payload)
            : await addExperience(payload);

        if (res.ok) {
            toaster.create({title: isEditing ? "Experience updated" : "Experience added", type: "success"});
            handleOpenChange({open: false});
            return;
        }

        toaster.create({title: "Failed to save experience", description: res.message, type: "error"});
    };

    const handleOpenChange = (details) => {
        onOpenChange?.(details);
        if (externalOpen === undefined) {
            setInternalOpen(!!details?.open);
        }
    };

    const trigger = !isEditing ? (
        <Dialog.Trigger asChild>
            <Button variant="ghost" size="xs" colorPalette="blue"><Icons.AddExperience/></Button>
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
            open={open}
            onOpenChange={handleOpenChange}
            trigger={trigger}
            footer={footer}
        >
            <ExperienceForm
                company={company}
                role={role}
                startMonth={startMonth}
                endMonth={endMonth}
                city={city}
                country={country}
                techStackTags={techStackTags}
                description={description}
                setCompany={setCompany}
                setRole={setRole}
                setStartMonth={setStartMonth}
                setEndMonth={setEndMonth}
                setCity={setCity}
                setCountry={setCountry}
                setTechStackTags={setTechStackTags}
                setDescription={setDescription}
            />
        </_ProfileDialogShell>
    );
}