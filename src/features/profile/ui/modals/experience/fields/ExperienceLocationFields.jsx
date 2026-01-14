import {Input, Stack, Text} from "@chakra-ui/react";

export function ExperienceLocationFields({city, country, onChangeCity, onChangeCountry}) {
    return (
        <Stack gap="2">
            <Text fontSize="sm" fontWeight="medium">Location</Text>
            <Stack direction="row" gap="4">
                <Input placeholder="City" value={city} onChange={e => onChangeCity(e.target.value)} />
                <Input placeholder="Country" value={country} onChange={e => onChangeCountry(e.target.value)} />
            </Stack>
        </Stack>
    );
}