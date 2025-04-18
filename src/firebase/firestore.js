import { app } from "./firebase.config";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  getDocs,
  collection,
  getDoc,
  query,
  where,
} from "firebase/firestore";

export const auth = getAuth(app);
const db = getFirestore(app);

export const createUser = async (formDeatails) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      formDeatails.email,
      formDeatails.password
    );
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

export const loggin = async (user) => {
  const userdetails = await signInWithEmailAndPassword(
    auth,
    user.email,
    user.password
  )
    .then((userCredential) => {
      return userCredential.user;
    })
    .catch((e) => {
      throw e;
    });
  return userdetails;
};

// users

export const addUser = async (user) => {
  const result = await setDoc(doc(db, "Users", user.uid), {
    email: user.email,
    userType: user.userType,
    createdAt: new Date(),
  });
  console.log("fire store", result);
};

export const getUser = async (uid) => {
  const snapshot = await getDoc(doc(db, "Users", uid));
  return snapshot.data();
};

//housess

export const getHouses = async () => {
  try {
    const snapshot = await getDocs(collection(db, "HousingLocations"));
    const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    return data;
  } catch (error) {
    console.error("Error fetching data: ", error);
    throw error;
  }
};

export const getHousesByUserId = async () => {
  try {
    const user = auth.currentUser;
    if (user && user.uid != null) {
      const q = query(
        collection(db, "HousingLocations"),
        where("ownerId", "==", user.uid)
      );
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      return data;
    } else {
      return [];
    }
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const getHousesById = async (houseId) => {
  try {
    const docSnap = await getDoc(doc(db, "HousingLocations", houseId));
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    throw error;
  }
};

export const updateHouseDetails = async (house, houseId) => {
  console.log(houseId);
  try {
    await setDoc(doc(db, "HousingLocations", houseId), house);
    return true;
  } catch (error) {
    throw error;
  }
};

export const UploadHouse = async (house) => {
  const images = [
    "/webaliser-_TPTXZd9mOo-unsplash.jpg",
    "/saru-robert-9rP3mxf8qWI-unsplash.jpg",
    "/phil-hearing-IYfp2Ixe9nM-unsplash.jpg",
    "/ian-macdonald-W8z6aiwfi1E-unsplash.jpg",
    "/r-architecture-JvQ0Q5IkeMM-unsplash.jpg",
    "/bernard-hermant-CLKGGwIBTaY-unsplash.jpg",
    "/brandon-griggs-wR11KBaB86U-unsplash.jpg",
    "/r-architecture-GGupkreKwxA-unsplash.jpg",
    "/krzysztof-hepner-978RAXoXnH4-unsplash.jpg",
    "/i-do-nothing-but-love-lAyXdl1-Wmc-unsplash.jpg",
  ];
  const length = images.length;
  const imgUrl = images[Math.floor(Math.random() * length)];
  try {
    const user = auth.currentUser;
    const data = { ...house, photo: imgUrl, ownerId: user.uid };
    // const colRef = collection(db, "HousingLocations")
    const newDocRef = doc(collection(db, "HousingLocations"));
    // console.log(colRef)
    const res = await setDoc(newDocRef, data);
    console.log("insert document", res);
    return true;
  } catch (e) {
    console.error(e)
    // throw e;
  }
};
