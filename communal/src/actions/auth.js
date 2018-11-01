import { LOG_IN, LOG_OUT } from '../types';
import { firebase, googleAuthProvider } from '../firebase/firebase';

export const Login = (uid) => ({
    type: LOG_IN,
    uid
});

export const startLogin = () => {
    return () => {
        return firebase.auth().signInWithPopup(googleAuthProvider);
    };
};

export const Logout = () => ({
    type: LOG_OUT
});

export const startLogout = () => {
    return () => {
        return firebase.auth().signOut();
    };
};
