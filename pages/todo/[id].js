import React from 'react';
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
    Link
} from '@chakra-ui/react';
import Auth from "../../components/Auth";
import useAuth from '../../hooks/useAuth';
import{
    doc,
    getDoc
} from 'firebase/firestore';
import {db} from '../../firebase';

//define the JSX component to show just one single todo
const todoItem = ({itemData}) => {
//enforce user to login first
    const {user} = useAuth() || {};
    if(!user) {
        return;
    }
    //if our code continues execution to here, a user is logged in
    //finally return the jsx component
    return (
        <Container maxW="7xl">
            <Auth />
        <Box border= '5px' mt={5}  borderColor='black'>
            <Heading noOfLines={1} as ="h1" fontSize="xl" textDecoration={"underline"}>
                {itemData.title}
            </Heading>
            <Text>
                {itemData.description}
            </Text>
            <Text>
                {itemData.status}
            </Text>
        </Box>
        <Button bg="green" color="white" mt={7} _hover={{ bg: 'green.800', transform: 'scale(1.10)' }}>
                <Link href="/">Back to List Page</Link>
            </Button>
        </Container>
    )
};

//define the REQUIRED getServerSideProps{} function that Next.js will call
//when it gets a dynamically-routed URL: /todo/random id
export async function getServerSideProps(context) {
    //our function will receive all it needs from Next.js in context variable
    //if you want to get the url parameter that next.js for id 'cuase [id].js
    //context.params.id has it!
     let itemData = null;
    // get a doc from firestore collection
    const docRef= doc(db, "todo", context.params.id);
    const docSnap = await getDoc(docRef);
    if(docSnap.exists()) {
        itemData= docSnap.data();
    }

    return {
        props: {
            itemData
        }
    }
}
//export the component
export default todoItem;