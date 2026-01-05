import {Heading, VStack} from "@chakra-ui/react";

import ProfileSectionCard from "./ProfileSectionCard.jsx";

const ProfilePortfolio = ({user}) => {
    return (
        <ProfileSectionCard>
            <VStack align={'left'} gap={6}>
                <Heading
                    fontSize='2xl'
                    fontWeight='800'
                    letterSpacing='-0.02em'
                    color="text.primary"
                >
                    Portfolio
                </Heading>
                {/* Здесь можно добавить список проектов в будущем */}
            </VStack>
        </ProfileSectionCard>
    )
};

export default ProfilePortfolio;