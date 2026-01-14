import TagsField from "../../../../../../shared/ui/TagsField.jsx";

export function ExperienceTechStackTags({ value, onChange }) {
    return (
        <TagsField
            label="Tech stack"
            placeholder="Add technology and press Enter"
            value={value}
            onChange={onChange}
            maxTags={20}
        />
    );
}