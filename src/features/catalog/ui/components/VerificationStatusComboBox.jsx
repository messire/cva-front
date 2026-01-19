import {Combobox, Input, useFilter, useListCollection,} from "@chakra-ui/react";

const options = [
    {value: "", label: "All"},
    {value: "NotVerified", label: "Not Verified"},
    {value: "Fake", label: "Fake"},
    {value: "Verified", label: "Verified"},
    {value: "Premium", label: "Premium"},
];

/**
 * @param {{
 *   value?: string,
 *   onChange: (value?: string) => void
 * }} props
 */
export function VerificationStatusComboBox({value, onChange}) {
    const {contains} = useFilter({sensitivity: "base"});

    const {collection, setInputValue} = useListCollection({
        initialItems: options,
        filter: contains,
    });

    const selectedValue = value ?? ""; // "" == All

    return (
        <Combobox.Root
            collection={collection}
            value={[selectedValue]}
            onValueChange={(e) => {
                const next = e.value?.[0] ?? "";
                onChange(next === "" ? undefined : next);
            }}
            onInputValueChange={(e) => {
                setInputValue(e.inputValue ?? "");
            }}
            openOnClick
        >
            <Combobox.Control>
                <Combobox.Input
                    as={Input}
                    h="44px"
                    border="1px solid"
                    colorPalette="brand"
                    placeholder="Verification status"
                    _focusVisible={{borderColor: "text.brand", boxShadow: "none"}}
                />
                <Combobox.IndicatorGroup>
                    <Combobox.ClearTrigger/>
                    <Combobox.Trigger/>
                </Combobox.IndicatorGroup>
            </Combobox.Control>

            <Combobox.Positioner>
                <Combobox.Content>
                    <Combobox.Empty>No results</Combobox.Empty>
                    {collection.items.map((item) => (
                        <Combobox.Item
                            key={item.value || "__all__"}
                            item={item}
                        >
                            <Combobox.ItemText>{item.label}</Combobox.ItemText>
                            <Combobox.ItemIndicator />
                        </Combobox.Item>
                    ))}
                </Combobox.Content>
            </Combobox.Positioner>
        </Combobox.Root>
    );
}