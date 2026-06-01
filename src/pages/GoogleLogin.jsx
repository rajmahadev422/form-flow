import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../utils/fb.js";
import { useState } from "react";

const googleProvider = new GoogleAuthProvider();

const GoogleLogin = () => {
  const [user, setUser] = useState(null);

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);

      const loggedInUser = {
        uid: result.user.uid,
        name: result.user.displayName,
        email: result.user.email,
        photo: result.user.photoURL,
      };

      setUser(loggedInUser);

      console.log(loggedInUser);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {user ? (
        <div>
          <img
            src={user.photo}
            alt={user.name}
            width={50}
            height={50}
            style={{ borderRadius: "50%" }}
          />

          <h3>{user.name}</h3>
          <p>{user.email}</p>

          <button onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : (
        <button onClick={handleLogin}>
          Continue with Google
        </button>
      )}
    </div>
  );
};

export default GoogleLogin;