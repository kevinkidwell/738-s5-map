// app/services/snapshots.server.ts
import { db } from "./firebase.server";
import {
  collection,
  addDoc,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";

const snapshotsRef = collection(db, "snapshots");

export async function publishSnapshot(alliances: any[]) {
  return await addDoc(snapshotsRef, {
    alliances,
    publishedAt: new Date(),
  });
}

export async function getSnapshot(id: string) {
  const ref = doc(db, "snapshots", id);
  const snap = await getDoc(ref);
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

export function subscribeSnapshots(callback: (snapshots: any[]) => void) {
  const q = query(snapshotsRef, orderBy("publishedAt", "desc"));
  return onSnapshot(q, (snapshot) => {
    const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    callback(list);
  });
}
