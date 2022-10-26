import {
    Badge,
    Box,
    Heading,
    SimpleGrid,
    Button,
    Link,
    Text,
    useToast,
    } from "@chakra-ui/react";
    import React, { useEffect } from "react";
    import useAuth from "../hooks/useAuth";
    import { 
        collection, 
        onSnapshot,
        query,
        where 
    } from "firebase/firestore";
    import { db } from "../firebase";
    import { FaToggleOff, FaToggleOn, FaTrash } from "react-icons/fa";
    import { deleteEvent, toggleEventStatus } from "../api/event";
    
    //define the jsx component for the list
const EventList = () => {
    const [events, setEvents] = React.useState([]);
    const {  user } = useAuth() || {};
    const toast = useToast();    
    //tell react to update the ui
    useEffect(() => { if (!user) {
                setEvents([]);
                return;
                }
                //if our code continues execution to here, a user is logged in
                //do a query on firestore collection
                const q = query(
                    collection(db, "event"), 
                    where("user", "==", user.uid)
                    );
                    //since query() is async, here er set up an event handler with firebase
                onSnapshot(
                    q, 
                    (querySnapshot) => {
                        //in this function we have all the results from q in querySnapshot
                let ar = [];
                querySnapshot.docs.forEach(
                    (doc) => {
                ar.push({ 
                    id: doc.id, 
                    ...doc.data() 
                });
                });
                //once we loop thru using forEach and have array of docs in ar 
                setEvents(ar);
                });
            }, 
    [user]
    );
    //build nested function to delete an event
    const handleEventDelete = async (id) => {
    if (confirm("Are you sure you wanna delete this event?")) {
    deleteEvent(id);
    toast(
        { 
            title: "Event deleted successfully", 
            status: "success" 
        }
        );
    }
    };
    //build nested function to toggle status
    const handleToggle = async (id, status) => {
    const newStatus = status == "completed" ? "pending" : "completed";
    await toggleEventStatus(
        { 
            docId: id, 
            status: newStatus 
        }
        );
    toast({
    title: `RSVP ${newStatus}`,
    status: newStatus == "completed" ? "success" : "warning",
    }
    );
    };
    //define the jsx component
    return (
    <Box mt={5}>
    <Heading textAlign={"center"} as='h1' my={5} noOfLines={1} size='xl'>Event List</Heading>
    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
    {events &&
    events.map(
        (event) => (
    <Box
    p={3}
    boxShadow="2xl"
    shadow={"dark-lg"}
    transition="0.2s"
    _hover={{ boxShadow: "sm" }}
    key ={event.id}
    >
    <Heading as="h3" fontSize={"xl"}>
    {event.title}{" "}
   
    <Badge
    color="red.500"
    bg="inherit"
    transition={"0.2s"}
    _hover={{
    bg: "inherit",
    transform: "scale(1.2)",
    }}
    float="right"
    size="xs"
    onClick={() => handleEventDelete(event.id)}
    >
    <FaTrash />
    </Badge>
    <Text fontSize='small'
    //  float="right"
     opacity="0.8"
     align={"right"}
     paddingEnd={2}>
        HAVE YOU RSVP?    
        </Text>
    <Badge
    color={event.status == "pending" ? "gray.500" : "green.500"}
    bg="inherit"
    transition={"0.2s"}
    _hover={{
    bg: "inherit",
    transform: "scale(1.2)",
    }}
    float="right"
    size="xs"
    onClick={() => handleToggle
        (
            event.id, 
            event.status
            )
        }
    >
    {event.status == "pending" ? <FaToggleOff /> : <FaToggleOn />}
    </Badge>

   <Badge
    float="right"
    opacity="0.8"
    bg={event.status == "pending" ? "yellow.500" : "green.500"}
    >
    {event.status}
    </Badge>
    </Heading>
    <Text>{event.date} <br />{event.time}</Text>
    <Link href={`/event/${event.id}`}><Button colorScheme='green' size='xs'>Update</Button></Link>

  
    </Box>
    ))}
    </SimpleGrid>
    </Box>
    );
    };
    export default EventList;