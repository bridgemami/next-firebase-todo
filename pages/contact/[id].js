import React, {useState, useEffect} from 'react';
import{
    Box, 
    Heading,
    Container,
    Text, 
    Button,
    Badge, 
    borderColor,
    Center,
    Link,
    useToast,
    InputLeftElement,
    Input,
    InputGroup,
    Textarea,
    Hide,
    Show,
    Select,
    FormLabel,
} from '@chakra-ui/react';
import { FaEnvelope, FaPhoneAlt, FaRegEnvelope} from "react-icons/fa";

import Auth from "../../components/Auth";
import useAuth from '../../hooks/useAuth';
import{
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore';
import {db} from '../../firebase';
import firebase from 'firebase/app';

//define the JSX component to show just one single contact
const ContactItem = ({itemData}) => {
    console.log(itemData);
    const [inputPhone, setPhone] = useState(itemData.phone);
    const [inputEmail, setEmail] = useState(itemData.email);
    const [inputName, setName] = useState(itemData.name);
    const [inputAddress, setAddress] = useState(itemData.address);
    const toast= useToast();
    //enforce user to login first
    // const {user} = useAuth() || {};
    // if(!user) {
    //     return;
    // }
    const updateContact = async (itemData) => {
        const docRef =  await doc(db, "contact", itemData.id);
        console.log(docRef);
        const docSnap = await getDoc(docRef);
        console.log(docSnap);
        if(docSnap.exists()){
            console.log(inputPhone)
            const newData = {
                name: inputName,
                phone: inputPhone,
                email: inputEmail,
                address: inputAddress
            }
            setDoc(docRef, newData, {merge:true})
            .then(docSnap =>{
                toast({
                    title: 'Contact successfully updated!',
                    status:'success'
                });
                window.location.reload();
            })
            .catch(error => {
                console.log(error);
            })
        }
        
    };


    //if our code continues execution to here, a user is logged in
    //finally return the jsx component
    return (
        <Container maxW="7xl">
            <Auth />
            <Heading textAlign={"center"} as='h1' my={5} noOfLines={1} size='xl'>Update Contact</Heading>

        <Box border= '5px' my={10}  borderColor='black'>
            <Heading noOfLines={1} as ="h1" fontSize="xl" textDecoration={"underline"}>
                {itemData.name}
            </Heading>
            <Text>
                Phone: {itemData.phone}
            </Text>
            <Text>     
                Email: {itemData.email}
            </Text>
            <Text>
                Address: {itemData.address}
            </Text>
            </Box>
           <Box my={5}> 
           <FormLabel fontSize='md'>Name:</FormLabel>
          <Input type="text" value={inputName} onChange={(e) => setName(e.target.value)} placeholder="Name" />
          </Box>
          <Box my={5}>
          <FormLabel fontSize='md'>Phone:</FormLabel>
          <InputGroup>
        <InputLeftElement
      pointerEvents='none'
      children={<FaPhoneAlt />}
            />
          <Input type="phone" value={inputPhone} onChange={(e) => setPhone(e.target.value)} placeholder="phone number" />
          </InputGroup>
          </Box>
          <Box my={5}>
          <FormLabel fontSize='md'>Email:</FormLabel>
          <InputGroup>
        <InputLeftElement
      pointerEvents='none'
      children={<FaRegEnvelope />}
            />
          <Input type="email" value={inputEmail} onChange={(e) => setEmail(e.target.value)} placeholder="email" />
          </InputGroup>
          </Box>
          <Box my={5}> 
           <FormLabel fontSize='md'>Address:</FormLabel>
          <Textarea value={inputAddress} onChange={(e) => setAddress(e.target.value)} placeholder="123 Main Street, Everytown, CA. #####" />
          </Box>
          <Button
            color={'white'}
            bg="green"
            onClick={() => updateContact(itemData)}
            _hover={{ bg: 'green.800', transform: 'scale(1.10)' }}
            >Update</Button>
        
        <Box my={5}>
        <Button bg="green" color="white" mr={5} _hover={{ bg: 'green.800', transform: 'scale(1.10)' }}>
                <Link href="/add-contact">Back to Add Contact Page</Link>
            </Button>
            <Button bg="green" color="white" ml={5} _hover={{ bg: 'green.800', transform: 'scale(1.10)' }}>
                <Link href="/list-contact">Back to Contact List Page</Link>
            </Button>
            </Box>
        </Container>
    )
};

//define the REQUIRED getServerSideProps{} function that Next.js will call
//when it gets a dynamically-routed URL: /contact/random id
export async function getServerSideProps(context) {
    //our function will receive all it needs from Next.js in context variable
    //if you want to get the url parameter that next.js for id 'cuase [id].js
    //context.params.id has it!
     let itemData = null;
    // get a doc from firestore collection
    const docRef= doc(db, "contact", context.params.id);
    const docSnap = await getDoc(docRef);
    if(docSnap.exists()) {
        itemData= docSnap.data();
        itemData.id= context.params.id;
    }

    return {
        props: {
            itemData
        }
    }
}
//export the component
export default ContactItem;