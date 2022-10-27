//this is file in our /api directory has code to interact with firebase db
import { db } from "../firebase";
//now we can import a variety of functions from the firebase sdk
import {
collection,
addDoc,
updateDoc,
doc,
deleteDoc,
} from "firebase/firestore";
//create a function as an arrow function
//const FUNCTIONAME= asyn (arguments) => {code};
const makeEvent = async ({ userId, title, date, time, status }) => {
try {
    //collection name is in " "
await addDoc(collection(db, "event"), {
user: userId,
title: title,
date: date,
time: time,
status: status,
createdAt: new Date().toString()
});
} catch (err) {
    console.log(err);
}
};

const toggleEventStatus = async ({ docId, status }) => {
    try {
    const eventRef = doc(db, "event", docId);
    await updateDoc( 
    eventRef,
    {
        status: status
    }
    
    );
    } catch (err) {
    console.log(err);
    }
    };

const deleteEvent = async (docId) => {
try {
const eventRef = doc(db, "event", docId);
await deleteDoc(eventRef);
} catch (err) {
console.log(err);
}
};
export { makeEvent, toggleEventStatus, deleteEvent };

console.log(makeEvent)