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
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  setDoc,
  startAfter,
  updateDoc,
  where,
} from "firebase/firestore";
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
  comment?: string[] | undefined;
  rating?: number | undefined;
}

export interface Book {
  id: number;
  author: string;
  book_name: string;
  description: string;
  genre: string;
  image: string;
  review?: Review | null;
  price: number;
}

export const addReview = async ({ comment }: Review): Promise<void> => {
  try {
    const bookRef = doc(db, "books", "062b6ce859c");
    await updateDoc(bookRef, {
      review: arrayUnion({ comment: comment }),
    });
    toast.success("Review added successfully");
  } catch (error) {
    toast.error((error as Error).message);
  }
};

export const addBook = async ({
  author,
  book_name,
  description,
  genre,
  image,
  review,
  price,
}: Book): Promise<void> => {
  try {
    let bookId = localStorage.getItem("bookId");

    if (!bookId) {
      bookId = "1";
      localStorage.setItem("bookId", bookId);
    }

    const newBookId = parseInt(bookId) + 1;

    await setDoc(doc(db, "books", bookId), {
      id: parseInt(bookId),
      author,
      book_name,
      description,
      image,
      genre,
      review: review || null,
      price,
    });

    localStorage.setItem("bookId", newBookId.toString());
  } catch (error) {
    toast.error((error as Error).message);
  }
};

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

export const fetchDocumentsByCondition = async (
  collectionName: string,
  id: string | number
) => {
  try {
    const q = query(collection(db, collectionName), where("id", "==", id));

    const querySnapshot = await getDocs(q)
      .then((snapshot) => {
        const book = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        return book;
      })
      .catch((error) => console.log(error));
    return querySnapshot;
  } catch (error) {
    console.error("Xəta baş verdi:", error);
    throw error;
  }
};

export const addToFavourites = async (user: string, favoriteBook: object) => {
  if (!user) {
    toast.error("Don't found user");
    return;
  }

  const userRefId = doc(db, "users", user);
  try {
    await updateDoc(userRefId, {
      favorites: arrayUnion(favoriteBook),
    });
    toast.success("Book add to favourites");
  } catch (error) {
    console.error("Xəta baş verdi:", error);
    toast.error("Don't add to favourites");
  }
};

export const addToCart = async (user: string, addCartBook: object) => {
  if (!user) {
    toast.error("Don't found user");
    return;
  }

  const userRefId = doc(db, "users", user);
  try {
    await updateDoc(userRefId, {
      cart: arrayUnion(addCartBook),
    });
    toast.success("Book add to favourites");
  } catch (error) {
    console.error("Xəta baş verdi:", error);
    toast.error("Don't add to favourites");
  }
};

export const getFavorites = async (userId: string) => {
  try {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      const userData = userSnap.data();
      return userData?.favorites || [];
    } else {
      console.log("Sənəd tapılmadı.");
    }
  } catch (error) {
    console.error("Xəta baş verdi:", error);
  }
};

export const checkUserRole = async (uid: string | undefined) => {
  try {
    if (!uid) {
      toast.error("User ID is undefined");
      throw new Error("User ID is undefined");
    }
    const userRefToAdmin = doc(db, "users", uid);
    const userSnap = await getDoc(userRefToAdmin);
    if (userSnap.exists()) {
      const userData = userSnap.data();
      if (userData.role === "admin") {
        toast.success("You have access to the admin panel");
        return true;
      } else {
        toast.error("This user does not have admin permission");
      }
    } else {
      toast.error("Don't found document.");
    }
  } catch (error) {
    toast.error((error as Error).message);
  }
};
