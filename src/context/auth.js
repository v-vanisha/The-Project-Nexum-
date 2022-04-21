import React from "react";
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signOut,
  } from "firebase/auth";
  import { useState, useEffect } from "react";
  import { auth } from "../firebase";
  
  export const AuthContext = React.createContext();
  function AuthWrapper({ children }) {
   
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);
    const [open,setOpen] = useState(false);
    // const [searchData, setSearchData] = useState("");
    // const [openAnswer, setOpenAnswer] = useState(false);
  
   
    useEffect(() => {
      const unsub = onAuthStateChanged(auth, (user) => {
        if(user){
        setUser(user);
        }
        else{
          setUser('');
        }
      });
      setLoading(false);
    }, []);
  
    function login(email, password) {
      return signInWithEmailAndPassword(auth, email, password);
    }
  
    function forgot(email) {
      return sendPasswordResetEmail(auth, email);
    }
    function logout() {
      return signOut(auth);
    }
  
    function signup(email, password) {
      return createUserWithEmailAndPassword(auth, email, password);
    }
  
    function handleOpen(){
      setOpen(true);
    }

    function handleClose(){
      setOpen(false);
    }
    // function handleSearchData(data){
    //   setSearchData(data);
    // }

    // function handleCloseAnswer(){
    //   setOpenAnswer(false);
    // }
    const store = {
      login,
      user,
      logout,
      forgot,
      signup,
      open,
      handleOpen,
      handleClose,
      // searchData,
      // handleSearchData,
      // openAnswer,
      // handleOpenAnswer,
      // handleCloseAnswer,
    };
  
    return (
      <>
      <AuthContext.Provider value={store}>
        {!loading && children}
      </AuthContext.Provider>
      </>
    );
  }
  export default AuthWrapper;
