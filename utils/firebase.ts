import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  updateProfile,
  UserCredential,
  sendPasswordResetEmail,
} from "firebase/auth";
import toast from "react-hot-toast";
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  limit,
  setDoc,
  startAfter,
} from "firebase/firestore";
import { uid } from "uid";
import { query, orderBy } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB44rOI8ZgedBZ1NRPG4kHl6qOoR8crDPM",
  authDomain: "shop-22e7e.firebaseapp.com",
  projectId: "shop-22e7e",
  storageBucket: "shop-22e7e.firebasestorage.app",
  messagingSenderId: "372305781797",
  appId: "1:372305781797:web:213367ceedf9ffc96b0bcc",
  measurementId: "G-C62BD2F3LN",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
let userId: number = 3;

export const signUp = async (
  email: string,
  fullName: string,
  password: string,
  role: string = "user",
  id: number = userId + 1
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    await updateProfile(user, { displayName: fullName });

    await setDoc(doc(db, "users", user.uid), {
      fullName,
      email,
      role,
      id,
    });

    toast.success("Signup Successfully");
    return user;
  } catch (error) {
    toast.error((error as any)?.message);
  }
};

export const signIn = async (
  email: string,
  password: string
): Promise<UserCredential | undefined> => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential;
  } catch (error) {
    toast.error((error as any)?.message);
  }
};

export const signOut = async (): Promise<void> => {
  try {
    await auth.signOut();
    localStorage.removeItem("user");
    toast.success("Sign out successfully");
  } catch (error) {
    toast.error((error as Error).message);
  }
};

export const recoverPass = async (email: string) => {
  try {
    if (auth.currentUser) {
      await sendPasswordResetEmail(auth, email);
      toast.success("Send message. Check your e-mail");
    } else {
      throw new Error("No authenticated user found");
    }
    return true;
  } catch (error) {
    toast.error((error as Error).message);
  }
};

//? READ DATA

const booksRef = collection(db, "books");

export const getBookData = async () => {
  let bookArr: object[] = [];
  const data = await getDocs(booksRef)
    .then((snapshot) => {
      const books = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return books;
    })
    .catch((error) => {
      console.log(error);
      return [];
    });
  bookArr = data;
  return bookArr;
};

//? WRITE DATA

export interface Review {
  comment: string[];
  rating: number;
}

export interface Book {
  id: number;
  author: string;
  book_name: string;
  description: string;
  genre: string;
  image: string;
  review?: Review | null;
}

export const addBook = async ({
  id,
  author,
  book_name,
  description,
  genre,
  image,
  review,
}: Book): Promise<void> => {
  try {
    await setDoc(doc(db, "books", uid()), {
      id: id,
      author: author,
      book_name: book_name,
      description: description,
      image: image,
      genre: genre,
      review: review || null,
    });
  } catch (error) {
    toast.error((error as Error).message);
  }
};

//? Pagination

export const pagination = async (pageSize: number, lastDoc: any = null) => {
  try {
    const booksRef = collection(db, "books");
    const q = lastDoc
      ? query(booksRef, orderBy("id"), startAfter(lastDoc), limit(pageSize))
      : query(booksRef, orderBy("id"), limit(pageSize));
    startAfter;
    const snapshot = await getDocs(q);
    const books = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    return { books, lastDoc: snapshot.docs[snapshot.docs.length - 1] };
  } catch (error) {
    toast.error((error as Error).message);
    return { books: [], lastDoc: null };
  }
};
