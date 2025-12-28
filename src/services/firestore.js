import { db } from "../config/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

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
