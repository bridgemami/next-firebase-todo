import React from "react";
import { useState } from 'react'
import { Box, Button, Link, Text, useColorMode, Switch, Flex, IconButton } from "@chakra-ui/react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { FaGoogle, FaMoon, FaSun } from "react-icons/fa";
import { auth } from "../firebase";
import useAuth from "../hooks/useAuth";
//react jsx login component
const Auth = () => {
const [display, changeDisplay] = useState('none');
const { toggleColorMode, colorMode } = useColorMode();
const { isLoggedIn, user } = useAuth() || {};
//define a function to perform the login operation
const handleAuth = async () => {
const provider = new GoogleAuthProvider();
//some async calls with promise
signInWithPopup(
    auth, 
    provider
    )
.then((result) => {
    //since we got a promise, inside then then we get results returns 
// This gives you a Google Access Token. You can use it to access the Google API.
const credential = GoogleAuthProvider.credentialFromResult(result);
const token = credential.accessToken;
//now we should be able to get info about the user who isl logged in
// The signed-in user info.
const user = result.user;
// ...
})
.catch((error) => {
// Handle Errors here.
const errorCode = error.code;
const errorMessage = error.message;
// The email of the user's account used.
const email = error.customData.email;
// The AuthCredential type that was used.
const credential = GoogleAuthProvider.credentialFromError(error);
console.log(`authentication error ${errorCode} ${errorMessage}.`);
// ...
});
};
//define the jsx component
return (
    <Flex>
        <Flex
        // position="fixed"
        // align="center"
      >
        {/* Desktop Nav Bar */}
<Flex display={['none', 'none', 'flex', 'flex']}  justifyContent="space-evenly" align="center"
w={"90vw"}>
    <Box>
    <Link href="/">
        Add Todo
        </Link>
    </Box>
    <Box>
        <Link href="/list-todo">
        Todo List
        </Link>
    </Box>
    <Box>
    <Link href="/add-event">
        Add Event
        </Link>
    </Box>
    <Box>
    <Link href="/list-event">
        Event List
        </Link>
    </Box>
    <Box>
    <Link href="/add-contact">
        Add Contact
        </Link>
    </Box>
    <Box>
    <Link href="/list-contact">
        Contact List
        </Link>
    </Box>    
    <Box textAlign={"right"}>
<Button onClick={() => toggleColorMode()}>
{colorMode == "dark" ? <FaSun /> : <FaMoon />}
</Button>
    </Box>
{/* to see if you are logged in */}
        {isLoggedIn && (
            <>
            <Text color="green.500">{user.email}</Text>
            <Link color="red.500" onClick={() => auth.signOut()}>
            Logout
            </Link>
            </>
            )}
            {!isLoggedIn && (
            <Button leftIcon={<FaGoogle />} onClick={() => handleAuth()}>
            Login with Google
            </Button>
            )}
            
</Flex>
{/* Mobile Nav Bar */}
<Flex justify="center"
alignContent={"center"}>
<IconButton
alignSelf={"center"}
aria-label="Open Menu"
size= "lg"
mr= {2}
mt={2}
icon= {<HamburgerIcon />}
display={['flex', 'flex', 'none', 'none']}
onClick={() => changeDisplay('flex')}
/>
 </Flex>
</Flex>
<Flex
 w='100vw'
 display={display}
 bgColor="gray.50"
 zIndex={20}
 h="100vh"
 pos="fixed"
 top="0"
 left="0"
 overflowY="auto"
 flexDir="column">
    <Flex justify="flex-end">
          <IconButton
            mt={2}
            mr={2}
            aria-label="Close Menu"
            size="lg"
            icon={
              <CloseIcon />
            }
            onClick={() => changeDisplay('none')}
          />
        </Flex>
<Flex
flexDir={"column"}
align="center"
justifyContent={"space-evenly"}
zIndex={20}
bgColor="gray.50"
>
    <Box>
    <Link href="/">
        Add Todo
        </Link>
    </Box>
    <Box>
        <Link href="/list-todo">
        Todo List
        </Link>
    </Box>
    <Box>
    <Link href="/add-event">
        Add Event
        </Link>
    </Box>
    <Box>
    <Link href="/list-event">
        Event List
        </Link>
    </Box>
    <Box>
    <Link href="/add-contact">
        Add Contact
        </Link>
    </Box>
    <Box>
    <Link href="/list-contact">
        Contact List
        </Link>
    </Box>    
    <Box textAlign={"right"}>
<Button onClick={() => toggleColorMode()}>
{colorMode == "dark" ? <FaSun /> : <FaMoon />}
</Button>
    </Box>
{/* to see if you are logged in */}
        {isLoggedIn && (
            <>
            <Text color="green.500">{user.email}</Text>
            <Link color="red.500" onClick={() => auth.signOut()}>
            Logout
            </Link>
            </>
            )}
            {!isLoggedIn && (
            <Button leftIcon={<FaGoogle />} onClick={() => handleAuth()}>
            Login with Google
            </Button>
            )}
</Flex>
</Flex>
</Flex>

);
};
// export component
export default Auth;