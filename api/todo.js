//this is file in our /api directory has code to interact with firebase db
import { db } from "../firebase";
//now we can import a variety of functions from the firebase sdk
import {
collection,
addDoc,
updateDoc,
doc,
setDoc,
deleteDoc,
DocumentReference,
} from "firebase/firestore";
//create a function as an arrow function
//const FUNCTIONAME= asyn (arguments) => {code};
const addTodo = async ({ userId, title, description, status }) => {
try {
    //collection name is in " "
await addDoc(collection(db, "todo"), {
user: userId,
title: title,
description: description,
status: status,
createdAt: new Date().toString()
});
} catch (err) {
    console.log(err);
}
};
//edit a todo item
const editTodo = async ({docId, title, description}) => {
    const todoRef = doc(db, 'todo', docId);
    const data = {
        user: "userId",
        title: "title",
        description: "description",
        status: true,
    }
    setDoc(todoRef, data, {merge: true})
    .then (docRef => {
        console.log("Update was successful")
    })
    .catch(error => {
        console.error(error);})
    }
//toggle for completing a todo
const toggleTodoStatus = async ({ docId, status }) => {
try {
const todoRef = doc(db, "todo", docId);
await updateDoc( 
todoRef,
{
    status: status
}

);
} catch (err) {
console.log(err);
}
};

//delete a todo
const deleteTodo = async (docId) => {
try {
const todoRef = doc(db, "todo", docId);
await deleteDoc(todoRef);
} catch (err) {
console.log(err);
}
};
export { addTodo, toggleTodoStatus, deleteTodo, editTodo };