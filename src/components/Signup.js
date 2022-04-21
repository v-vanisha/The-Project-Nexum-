import React, { useState, useContext, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { AuthContext } from "../context/auth";
import { Link, useNavigate } from "react-router-dom";
import nexumLogo from "../assets/nexumLogo.jpg";
import "./signup.css";
import { setDoc, doc } from "firebase/firestore"; 
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { storage } from "../firebase";
import { db } from "../firebase";


function Signup(){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [bio, setBio] = useState("");
  const navigate = useNavigate();
  const { signup, user } = useContext(AuthContext);
  
  const handleClick = async () => {
      const myEmail = (email.split('@')[1]);
      const validEmail = 'banasthali.in';
      // console.log(myEmail==validEmail);
      if(myEmail == validEmail){
        try {
          setLoading(true);
          setError("");
          
          const userFirebase = await signup(email, password);
          // console.log("Signed Up!");
          // console.log(userFirebase.user.uid);
          const storageRef = ref(storage, `${userFirebase.user.uid}/Profile`);
          const uploadTask = uploadBytesResumable(storageRef, file);
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              // console.log("Upload is " + progress + "% done");
            },
            (error) => {
              console.log(error);
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                // console.log("File available at", downloadURL);
                let obj = {
                  name: name,
                  email: email,
                  bio: bio,
                  uid: userFirebase.user.uid,
                  photoUrl: downloadURL
                }
                setDoc(doc(db, "users", userFirebase.user.uid), obj);
              });
            }
          );
        } catch (err) {
          console.log(err);
          setError(err.message);
          setTimeout(() => {
            setError("");
          }, 2000);
        }
        setLoading(false);
      }
      else{
        setError('This Email is not accepted');

      }
  
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);
    return(
        <div className="signup-container">
        {/* Upper Box */}
        <div className="signup-card">
          <img src={nexumLogo} />
          <TextField
            size="small"
            margin="dense"
            fullWidth
            id="outlined-basic"
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <TextField
            size="small"
            margin="dense"
            fullWidth
            id="outlined-basic"
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <TextField
            size="small"
            margin="dense"
            fullWidth
            id="outlined-basic"
            label="Full Name"
            variant="outlined"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <TextField
            size="small"
            margin="dense"
            fullWidth
            id="outlined-basic"
            label="Tell us something about you"
            variant="outlined"
            value={bio}
            onChange={(e) => {
              setBio(e.target.value);
            }}
          />
          <Button
            variant="outlined"
            component="label"
            fullWidth
            style={{ marginTop: "0.8rem" }}
          >
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={(e) => {
                setFile(e.target.files[0]);
              }}
            />
            Upload
          </Button>

            {/* showing the error */}
            {error != "" && <div style={{ color: "red" }}>{error}</div>}
          {/* signup button */}
          <Button
            variant="contained"
            fullWidth
            style={{ marginTop: "0.8rem" }}
            onClick={handleClick}
            disabled={loading}
          >
            Sign Up
          </Button>
        </div>
             
        {/* Lower Box */}
        <div className="bottom-card">
          Already Have an Account ?
          <Link to="/login">
            <span style={{ color: "blue", cursor: "pointer" }}>Login</span>
          </Link>
        </div>
      </div>
    )
}
export default Signup;