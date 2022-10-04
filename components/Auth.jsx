import React from "react";
import { Box, Button, Link, Text, useColorMode } from "@chakra-ui/react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { FaGoogle, FaMoon, FaSun } from "react-icons/fa";
import { auth } from "../firebase";
import useAuth from "../hooks/useAuth";
//react jsx login component
const Auth = () => {
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
<Box position={"fixed"} top="5%" right="5%">
<Button onClick={() => toggleColorMode()}>
{colorMode == "dark" ? <FaSun /> : <FaMoon />}
</Button>{" "}
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
</Box>
);
};
// export component
export default Auth;