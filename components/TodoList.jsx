import {
    Badge,
    Box,
    Heading,
    SimpleGrid,
    Text,
    Link,
    useToast,
    Button,
    } from "@chakra-ui/react";
    import React, { useEffect } from "react";
    import useAuth from "../hooks/useAuth";
    import { 
        collection, 
        onSnapshot,
        query,
        where,
        updateDoc, doc 
    } from "firebase/firestore";
    import { db } from "../firebase";
    import { FaToggleOff, FaToggleOn, FaTrash, FaEdit } from "react-icons/fa";
    import { deleteTodo, toggleTodoStatus } from "../api/todo";
    
    //define the jsx component for the list
const TodoList = () => {
const [title, setTitle] = React.useState("");
const [description, setDescription] = React.useState("");
const [status, setStatus] = React.useState("pending");
const [isLoading, setIsLoading] = React.useState(false);
const [isUpdate, setIsUpdate] = React.useState(false);
    const [todos, setTodos] = React.useState([]);
    const {  user } = useAuth() || {};
    const toast = useToast();    
    //tell react to update the ui
    useEffect(() => { if (!user) {
                setTodos([]);
                return;
                }
                //if our code continues execution to here, a user is logged in
                //do a query on firestore collection
                const q = query(
                    collection(db, "todo"), 
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
                setTodos(ar);
                });
            }, 
    [user]
    );

    //build nested function to delete a todo
    const handleTodoDelete = async (id) => {
    if (confirm("Are you sure you wanna delete this todo?")) {
    deleteTodo(id);
    toast(
        { 
            title: "Todo deleted successfully", 
            status: "success" 
        }
        );
    }
    };
    //build nested function to toggle status
    const handleToggle = async (id, status) => {
    const newStatus = status == "completed" ? "pending" : "completed";
    await toggleTodoStatus(
        { 
            docId: id, 
            status: newStatus 
        }
        );
    toast({
    title: `Todo marked ${newStatus}`,
    status: newStatus == "completed" ? "success" : "warning",
    }
    );
    };

    //define the jsx component
    return (
    <Box mt={5}>
    <Heading textAlign={"center"} as='h1' my={5} noOfLines={1} size='xl'>Todo List</Heading>   
    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
    {todos &&
    todos.map(
        (todo) => (
    <Box
    p={3}
    boxShadow="2xl"
    shadow={"dark-lg"}
    transition="0.2s"
    _hover={{ boxShadow: "sm" }}
    key ={todo.id}
    >
    <Heading as="h3" fontSize={"xl"}>
    {todo.title}{" "}
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
    onClick={() => handleTodoDelete(todo.id)}
    >
    <FaTrash />
    </Badge>
    <Badge
    color={todo.status == "pending" ? "gray.500" : "green.500"}
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
            todo.id, 
            todo.status
            )
        }
    >
    {todo.status == "pending" ? <FaToggleOff /> : <FaToggleOn />}
    </Badge>
    <Badge
    float="right"
    opacity="0.8"
    bg={todo.status == "pending" ? "yellow.500" : "green.500"}
    >
    {todo.status}
    </Badge>
    </Heading>
    <Text>Task: {todo.description}</Text>
    <Link href={`/todo/${todo.id}`}><Button colorScheme='green' size='xs'>Update</Button></Link>
    </Box>
    ))}
    </SimpleGrid> 
</Box>
    );
    };
    export default TodoList;