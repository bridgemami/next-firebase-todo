import {
    Badge,
    Box,
    Heading,
    SimpleGrid,
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
    import { deleteContact } from "../api/contact";
    
    //define the jsx component for the list
const ContactList = () => {
    const [contacts, setContacts] = React.useState([]);
    const {  user } = useAuth() || {};
    const toast = useToast();    
    //tell react to update the ui
    useEffect(() => { if (!user) {
                setContacts([]);
                return;
                }
                //if our code continues execution to here, a user is logged in
                //do a query on firestore collection
                const q = query(
                    collection(db, "contact"), 
                    where("user", "==", user.uid)
                    );
                    //since query() is async, here er set up an contact handler with firebase
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
                setContacts(ar);
                });
            }, 
    [user]
    );
    //build nested function to delete an contact
    const handleContactDelete = async (id) => {
    if (confirm("Are you sure you wanna delete this contact?")) {
    deleteContact(id);
    toast(
        { 
            title: "Contact deleted successfully", 
            status: "success" 
        }
        );
    }
    };
    //build nested function to toggle status
    // const handleToggle = async (id, status) => {
    // const newStatus = status == "completed" ? "pending" : "completed";
    // await toggleContactStatus(
    //     { 
    //         docId: id, 
    //         status: newStatus 
    //     }
    //     );
    // toast({
    // title: `Contact marked ${newStatus}`,
    // status: newStatus == "completed" ? "success" : "warning",
    // }
    // );
    // };
    //define the jsx component
    return (
    <Box mt={5}>
    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
    {contacts &&
    contacts.map(
        (contact) => (
    <Box
    p={3}
    boxShadow="2xl"
    shadow={"dark-lg"}
    transition="0.2s"
    _hover={{ boxShadow: "sm" }}
    key ={contact.id}
    >
    <Heading as="h3" fontSize={"xl"}>
    {contact.name}{" "}
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
    onClick={() => handleContactDelete(contact.id)}
    >
    <FaTrash />
    </Badge>
    {/* <Badge
    color={contact.status == "success" ? "gray.500" : "green.500"}
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
            contact.id, 
            contact.status
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
    </Badge> */}
    </Heading>
    <Text>{contact.email} <br />{contact.phone}</Text>    </Box>
    ))}
    </SimpleGrid>
    </Box>
    );
    };
    export default ContactList;