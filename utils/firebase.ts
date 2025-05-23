/// <reference types="vite/client" />

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
  deleteDoc,
  doc,
  endAt,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  setDoc,
  startAfter,
  startAt,
  updateDoc,
  where,
} from "firebase/firestore";
import { query, orderBy } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
export const db = getFirestore(app);
let userId: number = 3;
const booksRef = collection(db, "books");
const writerRef = collection(db, "writer");

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

export const getBookData = async (): Promise<Book[]> => {
  try {
    const snapshot = await getDocs(booksRef);
    const books: Book[] = snapshot.docs.map((doc) => {
      const data = doc.data();

      return {
        id: Number(doc.id),
        book_name: data.book_name || "Unknown",
        author: data.author || "Unknown",
        price: data.price || 0,
        description: data.description || "",
        image: data.image || "",
        genre: data.genre || "Unknown",
        review: data.review || { comment: "", rating: [] },
      };
    });

    return books;
  } catch (error) {
    console.error("Error fetching book data:", error);
    return [];
  }
};

export const deleteBook = async (bookId: string) => {
  try {
    const bookRef = doc(db, "books", bookId);
    await deleteDoc(bookRef);

    toast.success(`Book deleted successfully`);
  } catch (error) {
    console.error("Error deleting book:", error);
  }
};

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

interface Review {
  comment?: string;
  rating?: [] | number[] | undefined;
}

//? --> Tomorrow add comment

export const addRating = async (
  { rating }: { rating: number[] },
  Id: number
) => {
  try {
    if (!Id) throw new Error("Book ID is undefined or invalid");

    const bookId = Id.toString();
    const bookRef = doc(db, "books", bookId);

    const docSnap = await getDoc(bookRef);
    let existingRatings: number[] = [];

    if (docSnap.exists()) {
      const data = docSnap.data();
      existingRatings = data?.review?.rating || [];
    }

    const updatedRatings = [...existingRatings, ...rating];

    await updateDoc(bookRef, {
      "review.rating": updatedRatings,
    });
  } catch (error) {
    toast.error(`Error adding review: ${(error as Error).message}`);
  }
};

export const addComment = async (
  { comment }: { comment: string[] },
  Id: number
) => {
  try {
    if (!Id) toast.error("Book ID is undefined");

    const bookId = Id.toString();
    const bookRef = doc(db, "books", bookId);

    const docSnap = await getDoc(bookRef);
    let existingComment: string[] = [];

    if (docSnap.exists()) {
      const data = docSnap.data();
      existingComment = data?.review?.comment || [];
    }

    const updateComment = [...existingComment, ...comment];
    await updateDoc(bookRef, {
      "review.comment": updateComment,
    });
  } catch (error) {
    toast.error(`Error adding review: ${(error as Error).message}`);
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
    toast.success("Book add to cart");
  } catch (error) {
    console.error("Xəta baş verdi:", error);
    toast.error("Don't add to cart");
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
      console.log("Don't found document.");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

export const getCartBook = async (userId: string) => {
  try {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      const userData = userSnap.data();
      return userData?.cart || [];
    } else {
      console.log("Don't found document.");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

export const deleteBookByIdFromFavorite = async (
  userId: string,
  bookId: number
) => {
  try {
    const userRef = doc(db, "users", userId);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      const favorite = userDoc.data().favorites || [];

      const updateFavorites = favorite.filter(
        (book: any) => book.id !== bookId
      );

      await updateDoc(userRef, {
        favorites: updateFavorites,
      });

      toast.success("Remove book");
    }
  } catch (error) {
    console.error("Error removing book from favorites:", error);
    toast.error("Error delete book from favorites");
  }
};

export const deleteBookIdFromCart = async (userId: string, bookId: number) => {
  try {
    const userRef = doc(db, "users", userId);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      const cart = userDoc.data().cart || [];
      const updateCart = cart.filter((book: any) => book.id !== bookId);

      await updateDoc(userRef, {
        cart: updateCart,
      });

      toast.success("Remove book");
    }
  } catch (error) {
    console.error("Error delete book from cart:", error);
    toast.error("Error delete book from cart");
  }
};

export const checkUserRole = async (uid: string) => {
  try {
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

export const getWriterData = async (): Promise<
  { id: number; [key: string]: any }[]
> => {
  let writerData: { id: number; [key: string]: any }[] = [];
  const writerArr = await getDocs(writerRef)
    .then((snapshot) => {
      const writer = snapshot.docs.map((doc) => ({
        id: Number(doc.id),
        ...doc.data(),
      }));
      return writer;
    })
    .catch((error) => {
      console.log(error);
      return [];
    });
  writerData = writerArr;
  return writerData;
};

export const searchBooksByPartialTitle = async (searchText: string) => {
  if (!searchText.trim()) return [];
  try {
    const q = query(
      booksRef,
      orderBy("book_name"),
      startAt(searchText),
      endAt(searchText + "\uf8ff")
    );

    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      return snapshot.docs.map((doc) => ({
        id: doc.id,
        book_name: doc.data().book_name,
        image: doc.data().image,
      }));
    }
  } catch (error) {
    console.log(error);
  }
};
