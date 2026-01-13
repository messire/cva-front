import {Heading} from "@chakra-ui/react";

const SectionHeading = ({children, ...props}) => {
    return (
        <Heading
            fontSize='xl'
            fontWeight='700'
            letterSpacing='-0.02em'
            color="text.primary"
            {...props}
        >
            {children}
        </Heading>
    )
};

export default SectionHeading;
