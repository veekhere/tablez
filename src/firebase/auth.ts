import { StoragePathConstants } from '@constants';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  User
} from "firebase/auth";
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from "./config";
import { FirebaseErrorCode } from './errors.enum';

type AuthResult = {
  user?: User;
  error?: string;
};

export function doCreateUserWithEmailAndPassword(email: string, password: string): Promise<AuthResult> {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((result) => doCreateUserDoc(result?.user))
    .then((user) => Promise.resolve({ user }))
    .catch((error) => Promise.resolve({ error: FirebaseErrorCode.explain(error?.code) }));
};

export function doSignInWithEmailAndPassword(email: string, password: string): Promise<AuthResult> {
  return signInWithEmailAndPassword(auth, email, password)
    .then((result) => Promise.resolve({ user: result?.user }))
    .catch((error) => Promise.resolve({ error: FirebaseErrorCode.explain(error?.code) }));
};

export function doSignInWithGoogle(): Promise<AuthResult> {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider)
    .then((result) => doCreateUserDoc(result?.user))
    .then((user) => Promise.resolve({ user }))
    .catch((error) => Promise.resolve({ error: FirebaseErrorCode.explain(error?.code) }));
};

export function doSignOut(): Promise<void> {
  return auth.signOut();
};

export function doPasswordReset(email: string): Promise<AuthResult> {
  return sendPasswordResetEmail(auth, email)
    .then(() => Promise.resolve(null))
    .catch((error) => Promise.resolve({ error: FirebaseErrorCode.explain(error?.code) }));
};

// export function doPasswordChange(password: string): Promise<void> {
//   return updatePassword(auth.currentUser, password);
// };

export function doSendEmailVerification(): Promise<AuthResult> {
  return sendEmailVerification(auth.currentUser)
    .then(() => Promise.resolve(null))
    .catch((error) => Promise.resolve({ error: FirebaseErrorCode.explain(error?.code) }));
};

async function doCreateUserDoc(user: User): Promise<User> {
  const userDoc = await getDoc(
    doc(db, StoragePathConstants.ROOT, user.uid)
  );

  if (!userDoc.exists()) {
    await setDoc(doc(db, StoragePathConstants.ROOT, user.uid), null);
  }

  return user;
};
