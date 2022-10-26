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
const todoItem = ({itemData}) => {
    const [inputTitle, setTitle] = useState(itemData.title);
    const [inputDesc, setDesc] = useState(itemData.description);
    const [statusCh, setStatusCh] = useState(itemData.status);
    const toast= useToast();
    //enforce user to login first
    // const {user} = useAuth() || {};
    // if(!user) {
    //     return;
    // }
    const updateToDo = async (itemData) => {
        const docRef =  await doc(db, "todo", itemData.id);
        console.log(docRef);
        const docSnap = await getDoc(docRef);
        console.log(docSnap);
        if(docSnap.exists()){
            console.log(inputDesc)
            const newData = {
                title: inputTitle,
                description: inputDesc,
                status: statusCh
            }
            setDoc(docRef, newData, {merge:true})
            .then(docSnap =>{
                toast({
                    title: 'Todo successfully updated!',
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
            <Heading textAlign={"center"} as='h1' my={5} noOfLines={1} size='xl'>Update Todo</Heading>

        <Box border= '5px' my={10}  borderColor='black'>
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
           <Box my={5}> 
           <Text>Title:</Text>
          <Input type="text" value={inputTitle} onChange={(e) => setTitle(e.target.value)} placeholder="title" />
          </Box>
          <Box my={5}>
          <Text>Description:</Text>
          <Input type="text" value={inputDesc} onChange={(e) => setDesc(e.target.value)} placeholder="description" />
          </Box>
          <Box my={5}>
          <Text>Status:</Text>
          <Select value={statusCh} onChange={(e) => setStatusCh(e.target.value)}>
<option
value={"pending"}
style={{ color: "yellow", fontWeight: "bold" }}
>
Pending ⌛
</option>
<option
value={"completed"}
style={{ color: "green", fontWeight: "bold" }}
>
Completed ✅
</option>
</Select>
          </Box>
          <Button
            color={'white'}
            bg="green"
            onClick={() => updateToDo(itemData)}
            _hover={{ bg: 'green.800', transform: 'scale(1.10)' }}
            >Update</Button>
        
        <Box mt={5}>
        <Button bg="green" color="white" mr={5} _hover={{ bg: 'green.800', transform: 'scale(1.10)' }}>
                <Link href="/">Back to Add Todo Page</Link>
            </Button>
            <Button bg="green" color="white" ml={5} _hover={{ bg: 'green.800', transform: 'scale(1.10)' }}>
                <Link href="/list-todo">Back toTodo List Page</Link>
            </Button>
            </Box>
        </Container>
    )
};
// updateToDo(itemData)
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
        itemData.id= context.params.id;
    }

    return {
        props: {
            itemData
        }
    }
}
//export the component
export default todoItem;