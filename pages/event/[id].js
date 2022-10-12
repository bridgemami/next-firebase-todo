import React from "react";
import{
    Box,
    Heading,
    SimpleGrid,
    Text
} from "@chakra-ui/react";
import useAuth from "../../hooks/useAuth";
import {
    doc,
    getDoc
} from "firebase/firestore";
import { db } from "../../firebase";

//define the JSX component to show just one single todo
const EventItem = ({itemData}) => {
//enforce user to login first
    const {user} = useAuth() || {};
    if(!user) {
        return;
    }
    //if our code continues execution to here, a user is logged in
    //finally return the jsx component
    return (
        <Box mt={5}>
            <Heading as ={"h3"} fontSize={"xl"}>
                {itemData.event}
            </Heading>
            <Text>
                {itemData.Date}
            </Text>
            <Text>
                {itemData.time}
            </Text>
            <Text>
                {itemData.createdAt}
            </Text>
        </Box>
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
    const docRef= doc(db, "event", context.params.id);
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
export default EventItem;