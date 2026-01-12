import {HStack, Input, Text} from "@chakra-ui/react";
import {createInputHandlers} from "../../utils/numberInputHandlers.js";

export function LabeledInput({label, value, type, onChange}) {
    const isNumber = type === "number";
    const {handleChange, handleKeyDown} = createInputHandlers({isNumber, onChange});

    return (
        <HStack gap={3} w="full">
            <Text
                fontSize="sm"
                fontWeight="semibold"
                w="150px"
                whiteSpace="nowrap"
                flexShrink={0}>
                {label}
            </Text>
            <Input
                value={value ?? ""}
                type={type}
                placeholder={`Enter ${label.toLowerCase()}`}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
            />
        </HStack>
    );
}
