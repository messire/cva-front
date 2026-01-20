import { Button, Dialog, Stack } from "@chakra-ui/react";
import {useState} from "react";

import _ProfileDialogShell from "./_ProfileDialogShell.jsx";
import { SocialLinkField } from "../edit/SocialLinkField.jsx";
import { useSocialLinksForm } from "../edit/useSocialLinksForm.js";
import { useProfileStore } from "../../model/profile.store.js";
import { toaster } from "../../../../shared/ui/toaster.jsx";

import {Icons} from "../../../../shared/ui/icons.js";

export function SocialLinksEditModal({ profile }) {
    const [open, setOpen] = useState(false);
    const updateContacts = useProfileStore(s => s.updateContacts);

    const form = useSocialLinksForm(profile.socialLinks);

    const handleSave = async () => {
        if (!form.validateAll()) {
            toaster.create({ title: "Fix invalid links", type: "error" });
            return;
        }

        const res = await updateContacts({
            email: profile.email,
            phone: profile.phone,
            website: profile.website,
            location: profile.location,
            socialLinks: form.buildSocialLinks(),
        });

        if (res.ok) {
            toaster.create({ title: "Social links updated", type: "success" });
            setOpen(false);
        } else {
            toaster.create({ title: "Failed to update social links", description: res.message, type: "error" });
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
            title="Edit Socials"
            open={open}
            onOpenChange={(e) => setOpen(e.open)}
            trigger={trigger}
            footer={footer}
        >
            <Stack gap="4">
                <SocialLinkField
                    label="Telegram"
                    placeholder="https://t.me/..."
                    value={form.values.telegram}
                    error={form.errors.telegram}
                    onChangeStripped={(v) => form.setField("telegram", v)}
                    onErrorChange={(m) => form.setError("telegram", m)}
                />
                <SocialLinkField
                    label="LinkedIn"
                    placeholder="https://www.linkedin.com/in/..."
                    value={form.values.linkedIn}
                    error={form.errors.linkedIn}
                    onChangeStripped={(v) => form.setField("linkedIn", v)}
                    onErrorChange={(m) => form.setError("linkedIn", m)}
                />
                <SocialLinkField
                    label="GitHub"
                    placeholder="https://github.com/..."
                    value={form.values.gitHub}
                    error={form.errors.gitHub}
                    onChangeStripped={(v) => form.setField("gitHub", v)}
                    onErrorChange={(m) => form.setError("gitHub", m)}
                />
                <SocialLinkField
                    label="Twitter/X"
                    placeholder="https://x.com/..."
                    value={form.values.twitter}
                    error={form.errors.twitter}
                    onChangeStripped={(v) => form.setField("twitter", v)}
                    onErrorChange={(m) => form.setError("twitter", m)}
                />
            </Stack>
        </_ProfileDialogShell>
    );
}