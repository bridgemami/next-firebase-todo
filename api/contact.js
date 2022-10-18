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
const makeContact = async ({ userId, name, phone, email, address }) => {
try {
    //collection name is in " "
await addDoc(collection(db, "contact"), {
user: userId,
name: name,
phone: phone,
email: email,
address: address,
createdAt: new Date().toString()
});
} catch (err) {
    console.log(err);
}
};

const deleteContact = async (docId) => {
try {
const contactRef = doc(db, "contact", docId);
await deleteDoc(contactRef);
} catch (err) {
console.log(err);
}
};
export { makeContact, deleteContact };

console.log(makeContact)