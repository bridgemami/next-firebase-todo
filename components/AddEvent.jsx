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
import { makeEvent } from "../api/event";
//now lets define a react jsx component
const AddEvent = () => {
    //every form control (text input) we want to associate a react state
const [title, setTitle] = React.useState("");
const [day, setDay] = React.useState("");
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
day,
time,
status,
userId: user.uid,
};
await makeEvent(event);
setIsLoading(false);
setTitle("");
setDay("");
setTime("");
setStatus("pending");
//show a floaty with status updates
toast({ 
    title: "Event created successfully", 
    status: "success" });
};
//let's return the markup for the addToDo JSX component
return (
<Box w="40%" margin={"0 auto"} display="block" mt={5}>
<Stack direction="column">
<Input 
placeholder="Name of Event"
value={title}
// e just is local variable standing for the event of a changing.
onChange={(e) => setTitle(e.target.value)}
/>
<Textarea
placeholder="Date mm/dd/yy or mm/dd/yyyy"
value={day}
onChange={(e) => setDay(e.target.value)}
/>
<Textarea
placeholder="00:00 AM or PM / 00-24"
value={time}
onChange={(e) => setTime(e.target.value)}
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
onClick={() => handleEventCreate()}
disabled={title.length < 1 || day.length < 1 || time.length < 1  || isLoading}
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