import React, {useState, useEffect} from 'react';
import{
    Box, 
    Heading,
    SimpleGrid,
    Container,
    Text, 
    extendTheme,
    Button,
    Badge, 
    borderColor,
    Center,
    Link,
    useToast,
    Input,
    FormLabel,
    InputGroup,
    Hide,
    Show,
    Select,
} from '@chakra-ui/react';
import Auth from "../../components/Auth";
import useAuth from '../../hooks/useAuth';
import{
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore';
import {db} from '../../firebase';
import firebase from 'firebase/app';

//define the JSX component to show just one single todo
const EventItem = ({itemData}) => {
    const [inputTitle, setTitle] = useState(itemData.title);
    const [inputDate, setDate] = useState(itemData.date);
    const [inputTime, setTime] = useState(itemData.time);
    const [statusCh, setStatusCh] = useState(itemData.status);
    const toast= useToast();
    //enforce user to login first
    // const {user} = useAuth() || {};
    // if(!user) {
    //     return;
    // }
    const updateEvent = async (itemData) => {
        const docRef =  await doc(db, "event", itemData.id);
        console.log(docRef);
        const docSnap = await getDoc(docRef);
        console.log(docSnap);
        if(docSnap.exists()){
            console.log(inputDate)
            const newData = {
                title: inputTitle,
                date: inputDate,
                time: inputTime,
                status: statusCh
            }
            setDoc(docRef, newData, {merge:true})
            .then(docSnap =>{
                toast({
                    title: 'Event successfully updated!',
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
            <Heading textAlign={"center"} as='h1' my={5} noOfLines={1} size='xl'>Update Event</Heading>

        <Box border= '5px' my={10}  borderColor='black'>
            <Heading noOfLines={1} as ="h1" fontSize="xl" textDecoration={"underline"}>
                {itemData.title}
            </Heading>
            <Text>
               Date: {itemData.date}
            </Text>
                Time: {itemData.time}
                <Text>
            RSVP: {itemData.status}
        </Text>
            </Box>
           <Box my={5}> 
           <FormLabel>Title:</FormLabel>
          <Input type="text" value={inputTitle} onChange={(e) => setTitle(e.target.value)} placeholder="title" />
          </Box>
          <Box my={5}>
          <FormLabel>Date:</FormLabel>
          <Input type="date" value={inputDate} onChange={(e) => setDate(e.target.value)} placeholder="description" />
          </Box>
          <Box>
      <FormLabel>Time:</FormLabel>
      <Input type="time" value={inputTime} onChange={(e) => setTime(e.target.value)} placeholder="time" />
      </Box>
      <Box my={5}>
      <FormLabel fontSize={'md'}>Did you RSVP?</FormLabel>
      <Select value={statusCh} onChange={(e) => setStatusCh(e.target.value)}>
<option
value={"Yes"}
style={{ color: "green", fontWeight: "bold" }}
>
Yes, I did RSVP
</option>
<option
value={"Pending"}
style={{ color: "Red", fontWeight: "bold" }}
>
I have not RSVP or do not need to
</option>
</Select>
      </Box>
          <Button
            color={'white'}
            bg="green"
            onClick={() => updateEvent(itemData)}
            _hover={{ bg: 'green.800', transform: 'scale(1.10)' }}
            >Update</Button>
        
        <Box my={5}>
        <Button bg="green" color="white" mr={5} _hover={{ bg: 'green.800', transform: 'scale(1.10)' }}>
                <Link href="/add-event">Back to Add Event Page</Link>
            </Button>
            <Button bg="green" color="white" ml={5} _hover={{ bg: 'green.800', transform: 'scale(1.10)' }}>
                <Link href="/list-event">Back to Event List Page</Link>
            </Button>
            </Box>
        </Container>
    )
};
//define the REQUIRED getServerSideProps{} function that Next.js will call
//when it gets a dynamically-routed URL: /event/random id
export async function getServerSideProps(context) {
    //our function will receive all it needs from Next.js in context variable
    //if you want to get the url parameter that next.js for id 'cuase [id].js
    //context.params.id has it!
     let itemData = null;
    // get a doc from firestore collection
    const docRef= doc(db, "event", context.params.id);
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
export default EventItem;