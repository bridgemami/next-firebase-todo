import { Container } from "@chakra-ui/react";
import AddEvent from "../components/AddEvent";
import EventList from "../components/EventList";
import Auth from "../components/Auth";
// import TodoList from "../components/TodoList";

export default function Event() {
return (
        <Container maxW="7xl">
        <Auth />
        <AddEvent />
        </Container>
      );
}