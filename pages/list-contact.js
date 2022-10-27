import { Container } from "@chakra-ui/react";
// import AddTodo from "../components/AddTodo";
import Auth from "../components/Auth";
import ContactList from "../components/ContactList";

export default function Home() {
return (
        <Container maxW="7xl">
        <Auth />
        {/* <AddTodo /> */}
        <ContactList />
        </Container>
      );
}