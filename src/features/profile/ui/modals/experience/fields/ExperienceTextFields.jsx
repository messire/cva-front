import {Input, Stack, Text, Textarea} from "@chakra-ui/react";

export function ExperienceTextFields({company, role, description, onChangeCompany, onChangeRole, onChangeDescription}) {
    return (
        <>
            <Stack gap="2">
                <Text fontSize="sm" fontWeight="medium">Company</Text>
                <Input value={company} onChange={e => onChangeCompany(e.target.value)}/>
            </Stack>

            <Stack gap="2">
                <Text fontSize="sm" fontWeight="medium">Role</Text>
                <Input value={role} onChange={e => onChangeRole(e.target.value)}/>
            </Stack>

            <Stack gap="2">
                <Text fontSize="sm" fontWeight="medium">Description</Text>
                <Textarea value={description} onChange={e => onChangeDescription(e.target.value)} rows={4}/>
            </Stack>
        </>
    );
}