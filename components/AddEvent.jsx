//our first react component for our todo app
//so we can use jsx to make a component load react
import React from "react";
//now lets add a bunch of chakra ui components
import {
Box,
Input,
Button,
Textarea,
Heading,
Stack,
Select,
Text,
useToast,
FormLabel,
} from "@chakra-ui/react";
//bring in useAuth from our hooks
import useAuth from "../hooks/useAuth";
import { makeEvent } from "../api/event";
//now lets define a react jsx component
const AddEvent = () => {
    //every form control (text input) we want to associate a react state
const [title, setTitle] = React.useState("");
const [date, setDate] = React.useState("");
const [time, setTime] = React.useState("");
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
time,
status,
userId: user.uid,
};
await makeEvent(event);
setIsLoading(false);
setTitle("");
setDate("");
setTime("");
setStatus("success");
//show a floaty with status updates
toast({ 
    title: "Event created successfully", 
    status: "success" });
};
//let's return the markup for the addToDo JSX component
return (
<Box w="40%" margin={"0 auto"} display="block" mt={5}>
<Heading textAlign={"center"} as='h1' my={5} noOfLines={1} size='xl'>Add Event</Heading>
<Stack direction="column">
<FormLabel fontSize='md'>Name of the Event:</FormLabel>
<Input 
placeholder="Name of Event"
value={title}
required="required"
// e just is local variable standing for the event of a changing.
onChange={(e) => setTitle(e.target.value)}
/>
<FormLabel fontSize='md'>Day of the Event:</FormLabel>
<Input
 placeholder="Date of the event"
 size="md"
 type="date"
 value={date}
onChange={(e) => setDate(e.target.value)}
/>
<FormLabel fontSize='md'>Time of the Event:</FormLabel>
<Input
placeholder="Time of the Event"
size="md"
type="time"
pattern="[0-9]{2}:[0-9]{2}"
value={time}
onChange={(e) => setTime(e.target.value)}
/>
<FormLabel fontSize='md'>Did you RSVP?</FormLabel>
<Select value={status} onChange={(e) => setStatus(e.target.value)}>
<option
value={"Yes"}
style={{ color: "green", fontWeight: "bold" }}
>
Yes, I did RSVP
</option>
<option
value={"Pending"}
style={{ color: "red", fontWeight: "bold" }}
>
I have not RSVP or do not need to
</option>
</Select>
<Button
onClick={() => handleEventCreate()}
disabled={title.length < 1 || date.length < 1  || time.length < 1  || isLoading}
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