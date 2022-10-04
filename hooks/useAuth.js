//import 2 react functions to implement react hooks with effect and state
import { useEffect, useState } from "react";
import { auth } from "../firebase";
//use react hooks, learn at: https:reactjs.com/docs/hooks-intro.html
const useAuth = () => {
    //ask react to define a state variable and an associated function to change its value
const [user, setUser] = useState(null);
const [isLoggedIn, setIsLoggedIn] = useState(false);
//ask react to manage our state variable based on a block of code we give it to run
useEffect(
// we are passing an anonymous arrow function to react's useEffect()
() => {
auth.onAuthStateChanged(
//we are passing an anonymous function to firebase's onAuthStateChanged()    
    (user) => {
//with the user object value that firebase returns
// set react state variable is LoggedIn
setIsLoggedIn(user && user.uid ? true : false);
//set react state variable user
setUser(user);
});
});
//remember to return something for this useAuth() function we call four authentication
return { user, isLoggedIn };
};

// don't forget the function
export default useAuth;