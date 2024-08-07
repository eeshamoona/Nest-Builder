import { doc, setDoc, getDoc } from "firebase/firestore";
import { FirebaseError } from "firebase/app";
import { User, UserStatus } from "@/atoms/userAtom";
import { firestore } from "@/firebase/firebaseConfig";

export async function checkUserStatus(
  email: string
): Promise<UserStatus | null> {
  if (!email) {
    console.error("Email is empty or null.");
    return null;
  }

  try {
    const whitelistRef = doc(firestore, "config", "whitelist");
    const graylistRef = doc(firestore, "config", "graylist");
    const adminRef = doc(firestore, "config", "admin");

    const [whitelistDoc, graylistDoc, adminDoc] = await Promise.all([
      getDoc(whitelistRef),
      getDoc(graylistRef),
      getDoc(adminRef),
    ]);

    const whitelistData = whitelistDoc.exists() ? whitelistDoc.data() : null;
    const graylistData = graylistDoc.exists() ? graylistDoc.data() : null;
    const adminData = adminDoc.exists() ? adminDoc.data() : null;

    if (!whitelistData && !adminData) {
      console.error(
        "Both whitelist and admin documents are empty or do not exist."
      );
      return null;
    }

    const isWhitelisted = whitelistData && email in whitelistData;
    const isGraylisted = graylistData && email in graylistData;
    const isAdmin = adminData && email in adminData;

    if (isAdmin) {
      console.log(`${email} is an admin and whitelisted.`);
      return UserStatus.admin;
    } else if (isWhitelisted) {
      console.log(`${email} is approved!`);
      return UserStatus.whitelist;
    } else if (isGraylisted) {
      console.log(`${email} is graylisted.`);
      return UserStatus.pending;
    } else {
      console.log(`${email} is a new nester.`);
      return UserStatus.new;
    }
  } catch (error) {
    if (error instanceof FirebaseError) {
      console.error("Firebase error code:", error.code);
      console.error("Firebase error message:", error.message);
    }
    console.error("Error checking user status:", error);
    return null;
  }
}

export const addUserToGraylist = async (user: User) => {
  const { email, uid, name } = user;

  if (!email || !uid || !name) {
    console.error("Email, UID, or name is empty or null.");
    return;
  }

  try {
    const graylistRef = doc(firestore, "config", "graylist");

    // Set the user's details in the graylist document
    await setDoc(graylistRef, { [email]: { uid, name } }, { merge: true });

    console.log(`Added ${email} in graylist.`);
  } catch (error) {
    if (error instanceof FirebaseError) {
      console.error("Firebase error code:", error.code);
      console.error("Firebase error message:", error.message);
    }
    console.error("Error adding user to graylist:", error);
  }
};
