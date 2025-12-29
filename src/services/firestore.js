import { db } from "../config/firebase";
import {
  collection,
  addDoc,
  deleteDoc,
  getDocs,
  where,
  doc,
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

//Toggle completion for today
export const toggleCompletion = async (uid, habitId, dateStr) => {
  if (!uid || !habitId) return;

  const completionRef = doc(
    db,
    "users",
    uid,
    "habits",
    habitId,
    "completions",
    dateStr
  );

  const snapshot = await getDocs(
    query(
      collection(db, "users", uid, "habits", habitId, "completions"),
      where("__name__", "==", dateStr)
    )
  );

  if (snapshot.empty) {
    // mark as completed
    await addDoc(
      collection(db, "users", uid, "habits", habitId, "completions"),
      {
        date: dateStr,
        completedAt: serverTimestamp(),
      }
    );
  } else {
    // unmark completion
    snapshot.docs.forEach((d) => deleteDoc(d.ref));
  }
};

//Get completions dates for a habit
export const getCompletionDates = async (uid, habitId) => {
  const completionSnap = await getDocs(
    query(
      collection(db, "users", uid, "habits", habitId, "completions"),
      orderBy("completedAt", "desc")
    )
  );
  return completionSnap.docs.map((d) => d.id);
};
