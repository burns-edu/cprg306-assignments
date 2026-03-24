import { db } from "../_utils/firebase";
import { collection, getDocs, addDoc, query } from "firebase/firestore";

export async function getItems(userId: string) {
  const itemsCollection = collection(db, "users", userId, "items");
  const snapshot = await getDocs(itemsCollection);

  const items = [];
  snapshot.forEach((doc) => {
    items.push({ id: doc.id, ...doc.data() });
  });

  return items;
}

export async function addItem(userId: string, item: object) {
  const itemsCollection = collection(db, "users", userId, "items");
  const docRef = await addDoc(itemsCollection, item);

  return docRef.id;
}
