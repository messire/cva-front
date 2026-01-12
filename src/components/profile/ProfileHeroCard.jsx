import {Box, Heading, HStack, Text, VStack, IconButton, Input, Badge} from "@chakra-ui/react";
import {useState} from "react";
import {getOpenToWorkUi} from "../../utils/profileBadges.js";
import ProfileSectionCard from "../ui/ProfileSectionCard.jsx";
import ProfilePhoto from "../ui/ProfilePhoto.jsx";
import TagBadge from "../ui/TagBadge.jsx";
import {Icons} from "../../ui/icons";
import {AvatarEditModal} from "./AvatarEditModal.jsx";
import {useProfileStore} from "../../stores/profile.store.js";
import {toaster} from "../../ui/toaster.jsx";

const ProfileHeroCard = ({profile, isOwner}) => {
    const [isEditingName, setIsEditingName] = useState(false);
    const [isEditingRole, setIsEditingRole] = useState(false);
    const [isEditingLocation, setIsEditingLocation] = useState(false);

    const [firstName, setFirstName] = useState(profile.firstName);
    const [lastName, setLastName] = useState(profile.lastName);
    const [role, setRole] = useState(profile.role || "");
    const [city, setCity] = useState(profile.location?.city || "");
    const [country, setCountry] = useState(profile.location?.country || "");

    const updateHeader = useProfileStore(s => s.updateHeader);
    const updateContacts = useProfileStore(s => s.updateContacts);

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

    const handleSaveLocation = async () => {
        const res = await updateContacts({
            email: profile.email,
            phone: profile.phone,
            website: profile.website,
            location: {
                city: city.trim(),
                country: country.trim()
            },
            socialLinks: profile.socialLinks
        });
        if (res.ok) {
            setIsEditingLocation(false);
            toaster.create({title: "Location updated", type: "success"});
        }
    };

    const openToWorkUi = getOpenToWorkUi(profile.openToWork);

    return (
        <ProfileSectionCard flex="2">
            <VStack align={'left'} gap={6}>
                <HStack gap={6} align="start">
                    <VStack align="center" gap={1}>
                        <ProfilePhoto avatarUrl={profile.avatarUrl} status={profile.verified} size="md"/>
                        {isOwner && <AvatarEditModal currentAvatarUrl={profile.avatarUrl} />}
                    </VStack>

                    <VStack align='left' gap={1} w="full">
                        {isEditingName ? (
                            <HStack>
                                <Input size="sm" value={firstName} onChange={e => setFirstName(e.target.value)} />
                                <Input size="sm" value={lastName} onChange={e => setLastName(e.target.value)} />
                                <IconButton size="xs" aria-label="Save" onClick={handleSaveName}><Icons.Check /></IconButton>
                                <IconButton size="xs" aria-label="Cancel" onClick={() => { setFirstName(profile.firstName); setLastName(profile.lastName); setIsEditingName(false); }} variant="ghost"><Icons.X /></IconButton>
                            </HStack>
                        ) : (
                            <HStack gap={2}>
                                <Heading
                                    fontSize={{base: '2xl', md: '3xl', lg: '4xl'}}
                                    fontWeight="800"
                                    letterSpacing="-0.03em"
                                    color="text.primary"
                                >
                                    {profile.fullName}
                                </Heading>
                                {isOwner && <IconButton size="xs" variant="ghost" aria-label="Edit name" onClick={() => setIsEditingName(true)}><Icons.Edit /></IconButton>}
                            </HStack>
                        )}

                        {isEditingRole ? (
                            <HStack>
                                <Input size="sm" value={role} onChange={e => setRole(e.target.value)} />
                                <IconButton size="xs" aria-label="Save" onClick={handleSaveRole}><Icons.Check /></IconButton>
                                <IconButton size="xs" aria-label="Cancel" onClick={() => { setRole(profile.role || ""); setIsEditingRole(false); }} variant="ghost"><Icons.X /></IconButton>
                            </HStack>
                        ) : (
                            <HStack gap={2}>
                                <Text fontSize="lg" color="text.brand" fontWeight="600">
                                    {profile.role || "Role not specified"}
                                </Text>
                                {isOwner && <IconButton size="xs" variant="ghost" aria-label="Edit role" onClick={() => setIsEditingRole(true)}><Icons.Edit /></IconButton>}
                            </HStack>
                        )}

                        {isEditingLocation ? (
                            <HStack>
                                <Input size="sm" placeholder="City" value={city} onChange={e => setCity(e.target.value)} />
                                <Input size="sm" placeholder="Country" value={country} onChange={e => setCountry(e.target.value)} />
                                <IconButton size="xs" aria-label="Save" onClick={handleSaveLocation}><Icons.Check /></IconButton>
                                <IconButton size="xs" aria-label="Cancel" onClick={() => { setCity(profile.location?.city || ""); setCountry(profile.location?.country || ""); setIsEditingLocation(false); }} variant="ghost"><Icons.X /></IconButton>
                            </HStack>
                        ) : (
                            <HStack gap={2}>
                                <Text fontSize="sm" color="text.secondary">
                                    {profile.location?.city ? `${profile.location.city}, ${profile.location.country}` : "Location not specified"}
                                </Text>
                                {isOwner && <IconButton size="xs" variant="ghost" aria-label="Edit location" onClick={() => setIsEditingLocation(true)}><Icons.Edit /></IconButton>}
                            </HStack>
                        )}

                        {openToWorkUi && (
                            <TagBadge
                                {...openToWorkUi.badgeProps}
                                w="fit-content"
                                mt={1}
                            >
                                {openToWorkUi.label}
                            </TagBadge>
                        )}
                    </VStack>
                </HStack>
            </VStack>
        </ProfileSectionCard>
    )
};

export default ProfileHeroCard;