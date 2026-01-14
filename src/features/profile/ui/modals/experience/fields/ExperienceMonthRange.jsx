import {Input, Stack, Text} from "@chakra-ui/react";

export function ExperienceMonthRange({startMonth, endMonth, onChangeStart, onChangeEnd}) {
    return (
        <Stack direction="row" gap="4">
            <Stack gap="2" flex="1">
                <Text fontSize="sm" fontWeight="medium">Start Month</Text>
                <Input type="month" value={startMonth} onChange={e => onChangeStart(e.target.value)} />
            </Stack>

            <Stack gap="2" flex="1">
                <Text fontSize="sm" fontWeight="medium">End Month</Text>
                <Input type="month" value={endMonth} onChange={e => onChangeEnd(e.target.value)} />
            </Stack>
        </Stack>
    );
}