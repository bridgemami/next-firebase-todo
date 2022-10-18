//our first react component for our todo app
//so we can use jsx to make a component load react
import React from "react";
//now lets add a bunch of chakra ui components
import {
Box,
Input,
Button,
Textarea,
Stack,
Select,
InputGroup,
InputLeftElement,
InputRightElement,
Text,
useToast,
} from "@chakra-ui/react";
import { PhoneIcon, EmailIcon, AddIcon, WarningIcon } from '@chakra-ui/icons'
//bring in useAuth from our hooks
import useAuth from "../hooks/useAuth";
import { makeContact } from "../api/contact";
//now lets define a react jsx component
const AddContact = () => {
    //every form control (text input) we want to associate a react state
const [name, setName] = React.useState("");
const [phone, setPhone] = React.useState("");
const [email, setEmail] = React.useState("");
const [address, setAddress] = React.useState("");
const [isLoading, setIsLoading] = React.useState(false);
const toast = useToast();
//let's call useAuth()
const { isLoggedIn, user } = useAuth() || {};
//let's define a function to run that handles the add todo operation
const handleContactCreate = async () => {
if (!isLoggedIn) {
    //are we logged in
toast({
title: "You must be logged in to add a contact.",
status: "error",
duration: 9000,
isClosable: true,
});
return;
}
//if our code continues excution this far, user is logged in
setIsLoading(true);
const contact = {
name,
phone,
email,
address,
userId: user.uid,
};
await makeContact(contact);
setIsLoading(false);
setName("");
setPhone("");
setEmail("");
setAddress("");//show a floaty with status updates
toast({ 
    title: "Contact created successfully", 
    status: "success" });
};
//let's return the markup for the addToDo JSX component
return (
<Box w="40%" margin={"0 auto"} display="block" mt={5}>
<Stack direction="column">
<Text fontSize='md'>Name:</Text>
<Input 
input= 'text'
placeholder="Name of Contact"
value={name}
// e just is local variable standing for the contact of a changing.
onChange={(e) => setName(e.target.value)}
/>
<Text fontSize='md'>Phone:</Text>
{/* <Input
type="tel"
placeholder="Phone Number"
value={phone}
onChange={(e) => setPhone(e.target.value)}
/> */}
<InputGroup>
    <InputLeftElement
      pointerEvents='none'
      children={<PhoneIcon color='gray.300' />}
    />
    <Input type='tel' placeholder='Phone number'value={phone}
onChange={(e) => setPhone(e.target.value)} />
  </InputGroup>
<Text fontSize='md'>Email:</Text>
<InputGroup>
    <InputLeftElement
      pointerEvents='none'
      children={<EmailIcon color='gray.300' />}
    />
    <Input type='email' placeholder='Email' value={email}
onChange={(e) => setEmail(e.target.value)} />
  </InputGroup>
<Text fontSize='md'>Address:</Text>
<Textarea
placeholder="123 Main Street, Everytown, CA. #####"
value={address}
onChange={(e) => setAddress(e.target.value)}
/>
<Button
onClick={() => handleContactCreate()}
disabled={name.length < 1 || isLoading}
colorScheme="teal"
variant="solid"
>
Add
</Button>
</Stack>
</Box>
);
};
export default AddContact;