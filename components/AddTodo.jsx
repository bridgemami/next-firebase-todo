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
useToast,
} from "@chakra-ui/react";
//bring in useAuth from our hooks
import useAuth from "../hooks/useAuth";
import { addTodo } from "../api/todo";
//now lets define a react jsx component
const AddTodo = () => {
    //every form control (text input) we want to associate a react state
const [title, setTitle] = React.useState("");
const [description, setDescription] = React.useState("");
const [status, setStatus] = React.useState("pending");
const [isLoading, setIsLoading] = React.useState(false);
const toast = useToast();
//let's call useAuth()
const { isLoggedIn, user } = useAuth() || {};
//let's define a function to run that handles the add todo operation
const handleTodoCreate = async () => {
if (!isLoggedIn) {
    //are we logged in
toast({
title: "You must be logged in to create a todo",
status: "error",
duration: 9000,
isClosable: true,
});
return;
}
//if our code continues excution this far, user is logged in
setIsLoading(true);
const todo = {
title,
description,
status,
userId: user.uid,
};
await addTodo(todo);
setIsLoading(false);
setTitle("");
setDescription("");
setStatus("pending");
//show a floaty with status updates
toast({ 
    title: "Todo created successfully", 
    status: "success" });
};
//let's return the markup for the addToDo JSX component
return (
<Box w="40%" margin={"0 auto"} display="block" mt={5}>
<Stack direction="column">
<Input
placeholder="Title"
value={title}
// e just is local variable standing for the event of a changing.
onChange={(e) => setTitle(e.target.value)}
/>
<Textarea
placeholder="Description"
value={description}
onChange={(e) => setDescription(e.target.value)}
/>
<Select value={status} onChange={(e) => setStatus(e.target.value)}>
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
<Button
onClick={() => handleTodoCreate()}
disabled={title.length < 1 || description.length < 1 || isLoading}
colorScheme="teal"
variant="solid"
>
Add
</Button>
</Stack>
</Box>
);
};
export default AddTodo;