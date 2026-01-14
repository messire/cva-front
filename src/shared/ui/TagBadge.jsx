import {Badge} from "@chakra-ui/react";

const TagBadge = ({children, ...props}) => (
    <Badge
        borderRadius="sm"
        size="md"
        fontWeight="600"
        textTransform="none"
        variant="subtle"
        colorPalette="text.primary"
        {...props}
    >
        {children}
    </Badge>
);

export default TagBadge;
