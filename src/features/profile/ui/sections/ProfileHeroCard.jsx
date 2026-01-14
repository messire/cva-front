import {Heading, HStack, Text, VStack, IconButton, Input, Separator, Switch} from "@chakra-ui/react";
import {useState} from "react";
import {getOpenToWorkUi} from "../../../../shared/utils/profileBadges.js";
import ProfileSectionCard from "../components/ProfileSectionCard.jsx";
import ProfilePhoto from "../../../../shared/ui/ProfilePhoto.jsx";
import TagBadge from "../../../../shared/ui/TagBadge.jsx";
import {Icons} from "../../../../shared/ui/icons.js";
import {AvatarEditModal} from "../modals/AvatarEditModal.jsx";
import {useProfileStore} from "../../model/profile.store.js";
import {toaster} from "../../../../shared/ui/toaster.jsx";
import {AboutEditModal} from "../modals/AboutEditModal.jsx";
import SectionHeading from "../components/SectionHeading.jsx";

const ProfileHeroCard = ({profile, isOwner}) => {
    const [isEditingName, setIsEditingName] = useState(false);
    const [isEditingRole, setIsEditingRole] = useState(false);

    const [firstName, setFirstName] = useState(profile.firstName);
    const [lastName, setLastName] = useState(profile.lastName);
    const [role, setRole] = useState(profile.role || "");

    const description = profile?.summary || "No description provided.";

    const updateHeader = useProfileStore(s => s.updateHeader);
    const handleSaveName = async () => {
        const res = await updateHeader({
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            role: profile.role,
            avatarUrl: profile.avatarUrl,
            openToWork: profile.openToWork,
            yearsOfExperience: profile.yearsOfExperience
        });
        if (res.ok) {
            setIsEditingName(false);
            toaster.create({title: "Name updated", type: "success"});
        }
    };
    const handleSaveRole = async () => {
        const res = await updateHeader({
            firstName: profile.firstName,
            lastName: profile.lastName,
            role: role.trim(),
            avatarUrl: profile.avatarUrl,
            openToWork: profile.openToWork,
            yearsOfExperience: profile.yearsOfExperience
        });
        if (res.ok) {
            setIsEditingRole(false);
            toaster.create({title: "Role updated", type: "success"});
        }
    };

    const handleToggleOpenToWork = async (checked) => {
        const res = await updateHeader({
            firstName: profile.firstName,
            lastName: profile.lastName,
            role: profile.role,
            avatarUrl: profile.avatarUrl,
            openToWork: checked,
            yearsOfExperience: profile.yearsOfExperience
        });

        if (res.ok) {
            toaster.create({
                title: checked ? "Open to work enabled" : "Open to work disabled",
                type: "success"
            });
        }
    };

    const openToWorkUi = getOpenToWorkUi(profile.openToWork);

    return (
        <ProfileSectionCard flex="2">
            <VStack align={'left'} gap={6}>
                <HStack gap={6} align="start">
                    <VStack align="center" gap={1}>
                        <ProfilePhoto avatarUrl={profile.avatarUrl} status={profile.verified} size="md"/>
                        {isOwner && <AvatarEditModal currentAvatarUrl={profile.avatarUrl}/>}
                    </VStack>
                    <VStack align='left' gap={1} w="full">
                        {isEditingName ? (
                            <HStack>
                                <Input size="sm" value={firstName} onChange={e => setFirstName(e.target.value)}/>
                                <Input size="sm" value={lastName} onChange={e => setLastName(e.target.value)}/>
                                <IconButton size="xs" aria-label="Save" onClick={handleSaveName}><Icons.Check/></IconButton>
                                <IconButton size="xs" aria-label="Cancel" onClick={() => {
                                    setFirstName(profile.firstName);
                                    setLastName(profile.lastName);
                                    setIsEditingName(false);
                                }} variant="ghost"><Icons.X/></IconButton>
                            </HStack>
                        ) : (
                            <HStack gap={2}>
                                <Heading
                                    fontSize={{base: 'xl', md: '2xl'}}
                                    fontWeight="700"
                                    letterSpacing="-0.03em"
                                    color="text.primary"
                                >
                                    {profile.fullName}
                                </Heading>
                                {isOwner && <IconButton size="xs" variant="ghost" aria-label="Edit name" onClick={() => setIsEditingName(true)}><Icons.Edit/></IconButton>}
                            </HStack>
                        )}

                        {isEditingRole ? (
                            <HStack>
                                <Input size="sm" value={role} onChange={e => setRole(e.target.value)}/>
                                <IconButton size="xs" aria-label="Save" onClick={handleSaveRole}><Icons.Check/></IconButton>
                                <IconButton size="xs" aria-label="Cancel" onClick={() => {
                                    setRole(profile.role || "");
                                    setIsEditingRole(false);
                                }} variant="ghost"><Icons.X/></IconButton>
                            </HStack>
                        ) : (
                            <HStack gap={2}>
                                <Text fontSize="lg" color="text.brand" fontWeight="600">
                                    {profile.role || "Role not specified"}
                                </Text>
                                {isOwner && <IconButton size="xs" variant="ghost" aria-label="Edit role" onClick={() => setIsEditingRole(true)}><Icons.Edit/></IconButton>}
                            </HStack>
                        )}

                        <HStack mt={1} gap={3}>
                            <TagBadge w="fit-content" {...openToWorkUi.badgeProps}>
                                {openToWorkUi.label}
                            </TagBadge>

                            {isOwner && (
                                <HStack gap={2}>
                                    <Switch.Root
                                        size="sm"
                                        checked={!!profile.openToWork}
                                        onCheckedChange={(e) => handleToggleOpenToWork(e.checked)}
                                    >
                                        <Switch.HiddenInput />
                                        <Switch.Control>
                                            <Switch.Thumb />
                                        </Switch.Control>
                                    </Switch.Root>
                                </HStack>
                            )}
                        </HStack>
                    </VStack>
                </HStack>

                <HStack justify="space-between">
                    <SectionHeading> About </SectionHeading>
                    <Separator borderColor="border.subtle" flex="1"/>
                    {isOwner && <AboutEditModal currentSummary={profile.summary} flexShrink="0"/>}
                </HStack>
                <Text fontSize="md" color="text.secondary" lineHeight="tall" whiteSpace="pre-wrap">
                    {description}
                </Text>

            </VStack>
        </ProfileSectionCard>
    )
};

export default ProfileHeroCard;
