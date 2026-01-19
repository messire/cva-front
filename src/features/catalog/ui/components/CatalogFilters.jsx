import {Box, HStack, Input, Switch, Text, VStack} from "@chakra-ui/react";
import TagsField from "../../../../shared/ui/TagsField.jsx";
import {Icons} from "../../../../shared/ui/icons.js";

const verificationOptions = [
    {value: "", label: "All"},
    {value: "NotVerified", label: "Not Verified"},
    {value: "Fake", label: "Fake"},
    {value: "Verified", label: "Verified"},
    {value: "Premium", label: "Premium"},
];

function SelectBox({value, onChange, width, children}) {
    return (
        <Box
            as="select"
            height="44px"
            width={width}
            borderRadius="button"
            bg="bg.card"
            border="1px solid"
            borderColor="border.subtle"
            px={3}
            value={value ?? ""}
            onChange={(e) => onChange(e.target.value)}
            _focusVisible={{
                borderColor: "text.brand",
                boxShadow: "none",
                outline: "none",
            }}
        >
            {children}
        </Box>
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
    return (
        <VStack align="stretch" gap={4}>
            <HStack gap={3} wrap="wrap" align="center">
                <HStack flex="1" minW={{base: "100%", md: "320px"}} gap={2}>
                    <Box color="text.brand" display="flex" alignItems="center">
                        <Icons.Search />
                    </Box>

                    <Input
                        h="44px"
                        placeholder="Search by name, role, or skills..."
                        borderRadius="button"
                        bg="bg.card"
                        border="1px solid"
                        borderColor="border.subtle"
                        value={searchText}
                        onChange={(e) => onSearchTextChange(e.target.value)}
                        _focusVisible={{
                            borderColor: "text.brand",
                            boxShadow: "none",
                        }}
                    />
                </HStack>

                <HStack gap={2}>
                    <Text fontSize="sm" color="text.secondary">
                        Open to work
                    </Text>

                    <Switch.Root
                        size="sm"
                        checked={openToWork === true}
                        onCheckedChange={() => onToggleOpenToWork()}
                    >
                        <Switch.HiddenInput />
                        <Switch.Control>
                            <Switch.Thumb />
                        </Switch.Control>
                    </Switch.Root>
                </HStack>

                <SelectBox
                    width={{base: "100%", md: "220px"}}
                    value={verificationStatus ?? ""}
                    onChange={(v) => onVerificationStatusChange(v || undefined)}
                >
                    {verificationOptions.map((x) => (
                        <option key={x.value} value={x.value}>
                            {x.label}
                        </option>
                    ))}
                </SelectBox>

                <SelectBox
                    width={{base: "100%", md: "220px"}}
                    value={sortField ?? "updatedAt"}
                    onChange={onSortFieldChange}
                >
                    <option value="updatedAt">Updated</option>
                    <option value="name">Name</option>
                    <option value="id">Id</option>
                </SelectBox>

                <SelectBox
                    width={{base: "100%", md: "180px"}}
                    value={sortOrder ?? "desc"}
                    onChange={onSortOrderChange}
                >
                    <option value="desc">Desc</option>
                    <option value="asc">Asc</option>
                </SelectBox>
            </HStack>

            <TagsField
                label="Skills"
                hint="Type and press Enter (multiple tags)."
                placeholder="e.g. react, .net, postgres"
                value={skills ?? []}
                onChange={onSkillsChange}
            />
        </VStack>
    );
}