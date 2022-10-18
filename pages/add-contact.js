import { Container } from "@chakra-ui/react";
import AddContact from "../components/AddContact";
import ContactList from "../components/ContactList";
import Auth from "../components/Auth";
// import TodoList from "../components/TodoList";

export default function Contact() {
return (
        <Container maxW="7xl">
        <Auth />
        <AddContact />
        </Container>
      );
}