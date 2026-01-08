import {Container, Heading, VStack, Input, Button, Box} from "@chakra-ui/react";
import {useState} from "react";

import {useUserStore} from "../stores/users.store.js";

import {toaster} from "../ui/toaster.jsx";

const CreateUserPage = () => {
    const [newUser, setNewUser] = useState({
        name: "",
        surname: "",
        email: "",
        phone: "",
    });

    const {createUser} = useUserStore()
    const handleAddUser = async () => {
        if (!newUser.name || !newUser.surname || !newUser.email || !newUser.phone) {
            toaster.create({description: "All fields are required.", type: "error",});
            return;
        }

        const {success, message} = await createUser(newUser);
        const toastType = success ? "success" : "error";

        toaster.create({description: message, type: toastType, closable: true});
        setNewUser({name: "", surname: "", email: "", phone: ""});
    };

    return <Container maxW={"Container.sm"}>
        <VStack gap={4}>
            <Heading
                size="xl"
                textAlign="center"
                p={8}
            >
                Create User
            </Heading>
            <Box w={"50%"}
                 bg="bg.card"
                 p={6}
                 borderRadius="card"
                 border="1px solid"
                 borderColor="border.subtle"
                 boxShadow="soft"
            >
                <VStack gap={4}>
                    <Input
                        placeholder="Photo"
                        name='photo'
                        value={newUser.photo}
                        borderColor="border.subtle"
                        onChange={(e) => setNewUser({...newUser, photo: e.target.value})}
                    />
                    <Input
                        placeholder="Name"
                        name='name'
                        value={newUser.name}
                        borderColor="border.subtle"
                        onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                    />
                    <Input
                        placeholder="Surname"
                        name='surname'
                        value={newUser.surname}
                        borderColor="border.subtle"
                        onChange={(e) => setNewUser({...newUser, surname: e.target.value})}
                    />
                    <Input
                        placeholder="email"
                        name='email'
                        type="email"
                        value={newUser.email}
                        borderColor="border.subtle"
                        onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                    />
                    <Input
                        placeholder="Phone"
                        name='phone'
                        type="phone"
                        value={newUser.phone}
                        borderColor="border.subtle"
                        onChange={(e) => setNewUser({...newUser, phone: e.target.value})}
                    />
                    <Button
                        bg="text.brand"
                        color="white"
                        onClick={handleAddUser}
                        w='full'
                        borderRadius="button"
                        _hover={{ opacity: 0.9 }}
                    >
                        Create
                    </Button>
                </VStack>
            </Box>
        </VStack>
    </Container>;
}

export default CreateUserPage;