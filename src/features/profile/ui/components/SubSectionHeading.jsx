import {Heading} from "@chakra-ui/react";

const SubSectionHeading = ({children, ...props}) => {
    return (
        <Heading
            fontSize='md'
            fontWeight='700'
            letterSpacing='-0.02em'
            color="text.primary"
            {...props}
        >
            {children}
        </Heading>
    )
};

export default SubSectionHeading;
