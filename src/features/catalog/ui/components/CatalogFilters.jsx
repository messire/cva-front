import {Box, HStack, IconButton, Input, Switch, Text, VStack} from "@chakra-ui/react";
import TagsField from "../../../../shared/ui/TagsField.jsx";
import {Icons} from "../../../../shared/ui/icons.js";
import {VerificationStatusComboBox} from "./VerificationStatusComboBox.jsx";

function SortButton({active, label, sortOrder, onClick}) {
    const icon = sortOrder === "asc" ? <Icons.SortUp/> : <Icons.SortDown/>;
    return (
        <IconButton
            size="sm"
            p={2}
            fontWeight={active ? "bold" : "normal"}
            variant="plain"
            onClick={onClick}
        >
            <Text>{label}</Text>
            {active && icon}
        </IconButton>
    );
}

export function CatalogFilters({
                                   searchText,
                                   onSearchTextChange,

                                   skills,
                                   onSkillsChange,

                                   openToWork,
                                   onToggleOpenToWork,

                                   verificationStatus,
                                   onVerificationStatusChange,

                                   sortField,
                                   onSortFieldChange,

                                   sortOrder,
                                   onSortOrderChange,
                               }) {
    const effectiveSortField = sortField ?? "updatedAt";
    const effectiveSortOrder = sortOrder ?? "desc";

    const toggleOrder = () => (effectiveSortOrder === "asc" ? "desc" : "asc");

    const handleSortClick = (field) => {
        if (field === effectiveSortField) {
            onSortOrderChange(toggleOrder());
            return;
        }

        onSortFieldChange(field);
    };

    return (
        <VStack align="stretch" gap={4}>
            <HStack flex="1" minW={{base: "100%", md: "320px"}} gap={2}>
                <Box color="text.brand" display="flex" alignItems="center">
                    <Icons.Search/>
                </Box>

                <Input
                    h="44px"
                    placeholder="Search by name, role, or skills..."
                    borderRadius="button"
                    bg="bg.card"
                    border="1px solid"
                    borderColor="text.brand"
                    value={searchText}
                    onChange={(e) => onSearchTextChange(e.target.value)}
                    _focusVisible={{
                        borderColor: "text.brand",
                        boxShadow: "none",
                    }}
                />
            </HStack>

            <HStack gap={3} align="center" wrap="wrap" maxW="900px">
                <HStack gap={2} whiteSpace="nowrap" flexShrink={0}>
                    <Text fontSize="sm" color="text.secondary">
                        Open to work
                    </Text>
                    <Switch.Root
                        size="sm"
                        checked={openToWork === true}
                        onCheckedChange={onToggleOpenToWork}
                    >
                        <Switch.HiddenInput/>
                        <Switch.Control>
                            <Switch.Thumb/>
                        </Switch.Control>
                    </Switch.Root>
                </HStack>

                <Box minW="200px" maxW="220px" flexShrink={0}>
                    <VerificationStatusComboBox
                        value={verificationStatus}
                        onChange={onVerificationStatusChange}
                        size="sm"
                        placeholder="Verification"
                    />
                </Box>

                <Box flex="1" minW={{base: "100%", sm: "260px"}} maxW="420px">
                    <TagsField
                        compact
                        placeholder="Skills"
                        value={skills ?? []}
                        onChange={onSkillsChange}
                        size="sm"
                    />
                </Box>
            </HStack>

            <HStack gap={2} align="end" justify="flex-end">
                <SortButton
                    active={effectiveSortField === "name"}
                    label="By Name"
                    sortOrder={effectiveSortOrder}
                    onClick={() => handleSortClick("name")}
                />

                <SortButton
                    active={effectiveSortField === "updatedAt"}
                    label="By Activity"
                    sortOrder={effectiveSortOrder}
                    onClick={() => handleSortClick("updatedAt")}
                />
            </HStack>
        </VStack>
    );
}