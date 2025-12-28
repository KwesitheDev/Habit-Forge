import { db } from "../config/firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
// Pass uid explicitly instead of using hook
export const addHabit = async (uid, habitData) => {
  if (!uid) throw new Error("User UID required");

  const userHabitsRef = collection(db, "users", uid, "habits");
  const docRef = await addDoc(userHabitsRef, {
    ...habitData,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
};

export const subscribeToHabits = (uid, callback) => {
  if (!uid) return () => {};

  const habitsQuery = query(
    collection(db, "users", uid, "habits"),
    orderBy("createdAt", "desc")
  );

  return onSnapshot(habitsQuery, (snapshot) => {
    const habits = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(habits);
  });
};
