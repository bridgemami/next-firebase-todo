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
Text,
useToast,
} from "@chakra-ui/react";
//bring in useAuth from our hooks
import useAuth from "../hooks/useAuth";
import { makeEvent } from "../api/event";
//now lets define a react jsx component
const AddEvent = () => {
    //every form control (text input) we want to associate a react state
const [title, setTitle] = React.useState("");
const [date, setDate] = React.useState("");
// const [time, setTime] = React.useState("");
const [status, setStatus] = React.useState("pending");
const [isLoading, setIsLoading] = React.useState(false);
const toast = useToast();
//let's call useAuth()
const { isLoggedIn, user } = useAuth() || {};
//let's define a function to run that handles the add todo operation
const handleEventCreate = async () => {
if (!isLoggedIn) {
    //are we logged in
toast({
title: "You must be logged in to add an event",
status: "error",
duration: 9000,
isClosable: true,
});
return;
}
//if our code continues excution this far, user is logged in
setIsLoading(true);
const event = {
title,
date,
status,
userId: user.uid,
};
await makeEvent(event);
setIsLoading(false);
// setTitle("");
// setDay("");
setDate("");
// setTime("");
setStatus("success");
//show a floaty with status updates
toast({ 
    title: "Event created successfully", 
    status: "success" });
};
//let's return the markup for the addToDo JSX component
return (
<Box w="40%" margin={"0 auto"} display="block" mt={5}>
<Stack direction="column">
<Text fontSize='md'>Name of the Event:</Text>
<Input 
placeholder="Name of Event"
value={title}
// e just is local variable standing for the event of a changing.
onChange={(e) => setTitle(e.target.value)}
/>
<Text fontSize='md'>Day of the Event:</Text>
<Input
 placeholder="Date and Time of the event"
 size="md"
 type="datetime-local"
 value={date}
input
onChange={(e) => setDate(e.target.value)}
/>
{/* <Text fontSize='md'>Time of the Event:</Text>
<Textarea
placeholder="00:00 AM or PM / 00-24"
value={time}
input
onChange={(e) => setTime(e.target.value)}
/> */}
<Text fontSize='md'>Did you RSVP?</Text>
<Select value={status} onChange={(e) => setStatus(e.target.value)}>
<option
value={"yes"}
style={{ color: "green", fontWeight: "bold" }}
>
Yes, I did RSVP
</option>
<option
value={"no"}
style={{ color: "red", fontWeight: "bold" }}
>
I have not RSVP or do not need to
</option>
</Select>
<Button
onClick={() => handleEventCreate()}
disabled={title.length < 1 || date.length < 1  || isLoading}
colorScheme="teal"
variant="solid"
>
Add
</Button>
</Stack>
</Box>
);
};
export default AddEvent;