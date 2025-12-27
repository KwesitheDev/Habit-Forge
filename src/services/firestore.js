import { db } from "../config/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

export const addHabit = async (habitData) => {
  const { user } = useAuth();
  if (!user) throw new Error("User not authenticated");

  const userHabitsRef = collection(db, "users", user.uid, "habits");
  const docRef = await addDoc(userHabitsRef, {
    ...habitData,
    createdAt: serverTimestamp(),
  });
  return docRef.id; // Return ID for potential local updates
};
