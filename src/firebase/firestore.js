import { app } from "./firebase.config";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
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
  deleteDoc,
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

export const getHousesByOwnerId = async () => {
  try {
    const user = auth.currentUser;
    if (user && user.uid != null) {
      const q = query(
        collection(db, "AppliedDetails"),
        where("ownerId", "==", user.uid)
      );
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({ ...doc.data(), applicationId: doc.id }));
      return data;
    } else {
      return [];
    }
  } catch (e) {
    console.error(e);
    throw e;
  }
}

// users

export const addUser = async (user) => {
  const result = await setDoc(doc(db, "Users", user.uid), {
    ...user,
    createdAt: new Date(),
  });
};

export const getUser = async (uid) => {
  console.log("uid", uid);
  const snapshot = await getDoc(doc(db, "Users", uid));
  console.log("store",snapshot);
  return snapshot.data();
};


export const applyrequest = async (details) => {
  try {
    const user = auth.currentUser;
    const collRef = collection(db, "AppliedDetails");
    setDoc(doc(collRef), { ...details, userId: user.uid });
    return true;
  } catch (error) {
    throw error;    
  }
}

export const withdrawApplication = async (details) => {
  const user = auth.currentUser;
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        unsubscribe();
        try {
          const docRef = doc(db, "AppliedDetails", details.id);
          await deleteDoc(docRef);
          resolve(true)
        } catch (error) {
          reject(error);
        }
      }else{
        reject("UserNot Authenticated")
      }
    });
  });
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
      return null;
    }
  } catch (error) {
    throw error;
  }
};

export const updateHouseDetails = async (house, houseId) => {
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
    const newDocRef = doc(collection(db, "HousingLocations"));
    await setDoc(newDocRef, data);
    return true;
  } catch (e) {
    console.error(e);
    // throw e;
  }
};

export const checkIsApplied = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        unsubscribe();
        try {
          const q = query(
            collection(db, "AppliedDetails"),
            where("userId", "==", user.uid),
            // where("isApplied", "==", isApplied)
          );
          const snap = await getDocs(q);
          const data = snap.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
          resolve(data);
        } catch (error) {
          reject(error);
        }
      } else {
        reject("User not authenticated");
      }
    });
  });
};

export const checkIsSaved = async (houseId) => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        unsubscribe();
        try {
          const collRef = collection(db, "SavedDetails");
          const q = query(
            collRef,
            where("userId", "==", user.uid),
            // where("isSaved", "==", true),
            where("HouseLocationId", "==", houseId)
          );
          const snap = await getDocs(q);
          const data = snap.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
          resolve(data);
        } catch (error) {
          reject(error);
        }
      } else {
        reject("User not authenticated");
      }
    });
  });
};

export const saveRequest = async (details) => {
  try {
    const user = auth.currentUser;
    const collRef = collection(db, "SavedDetails");
    await setDoc(doc(collRef), { ...details, userId: user.uid });
    return true;
  } catch (error) {
    throw error;
  }
};

export const SavedData = async () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        unsubscribe();
        try {
          const collRef = collection(db, "SavedDetails");
          const HouseCollRef = collection(db, "HousingLocations");
          const q = query(collRef, where("userId", "==", user.uid));
          const snap = await getDocs(q);
          const data = await Promise.all(
            snap.docs.map(async (doc) => {
              const savedInfo = doc.data();
              const res = await getHousesById(savedInfo.HouseLocationId);
              return { ...res };
            })
          );
          resolve(data);
        } catch (error) {
          reject(error);
        }
      } else {
        reject("User not authenticated");
      }
    });
  })
}

export const AppliedData = async () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        unsubscribe();
        try {
          const collRef = collection(db, "AppliedDetails");
          const HouseCollRef = collection(db, "HousingLocations");
          const q = query(collRef, where("userId", "==", user.uid));
          const snap = await getDocs(q);
          const data = await Promise.all(
            snap.docs.map(async (doc) => {
              const aapliedInfo = doc.data();
              const res = await getHousesById(aapliedInfo.HouseLocationId);
              return { ...res };
            })
          );
          resolve(data);
        } catch (error) {
          reject(error);
        }
      } else {
        reject("User not authenticated");
      }
    });
  })
}

export const RemoveSavedData = async (houseId) => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        unsubscribe();
        try {
          const collRef = collection(db, "SavedDetails");
          const q = query(
            collRef,
            where("userId", "==", user.uid),
            where("HouseLocationId", "==", houseId)
          );
          const snap = await getDocs(q);
          const data = snap.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
          if (data.length > 0) {
            const docRef = doc(collRef, data[0].id);
            await deleteDoc(docRef);
            resolve(true);
          } else {
            resolve(false);
          }
        } catch (error) {
          reject(error);
        }
      } else {
        reject("User not authenticated");
      }
    });
  });
}

export const deleteHouseById = async (houseId) => {
  try {
    const docRef = doc(db, "HousingLocations", houseId);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error("Error deleting document: ", error);
    return false;
  }
}
