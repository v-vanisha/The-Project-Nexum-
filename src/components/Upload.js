import React from 'react';
import { useEffect, useContext, useState } from 'react'
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import Box from '@mui/material/Box';
import { AuthContext } from '../context/auth';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import Alert from '@mui/material/Alert';
import {v4 as uuidv4} from 'uuid';
import { arrayUnion, doc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { db, storage } from '../firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';



function Upload({fileModal, handleFile, closeLoading, handleCloseLoading}){
  const [loading, setLoading] = useState(true);
  const {user} = useContext(AuthContext)
  const [error, setError] = useState(false);
  const [progress, setProgress] = useState(0);
//   console.log("Upload is saying"+userData);
  const handleChange = (e)=>{
    const file = e.target.files[0];
    if(file==""){
      return;
    }
    let uuid = uuidv4();
    setLoading(true);
    handleCloseLoading(true);
    // console.log("how"+user.uid);
    const storageRef = ref(storage, `${user.uid}/quesImages/${uuid}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(prog);
        console.log("Upload is " + prog + "% done");
      },
      (error) => {
        // console.log(error);
        setError(error.message)
      setTimeout(()=>{
        setError('')
      }, 2000)
      return;
  
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
        //   let obj = {
        //     likes: [],
        //     postId: uid,
        //     postUrl:downloadURL,
        //     profileName: userData.name,
        //     profileUrl:userData.photoUrl,
        //     uid: userData.uid,
        //     timestamp: serverTimestamp()
        //   }
          // console.log(obj);
        //   console.log(typeof(downloadURL));
 
        //   setDoc(doc(db, "posts", uid), obj);
          // console.log("post added in post collection")
        //   updateDoc(doc(db, "users", userData.uid), {
        //     posts: arrayUnion(uid)
        //   })
  
          //firestore 
  
          setProgress(0);
          handleFile(downloadURL);
          setLoading(false);
          //  setDoc(doc(db, "users", user.user.uid), obj)
        });
      }
    );
  }  

  return(
        <div >
        {
           error != '' ? 
          <Alert severity="error">{error} </Alert> :   
          <Button className="upload-btn" variant="outlined" component="label" startIcon={<PhotoLibraryIcon/>} style={{marginTop: '0.8rem'}}>
          <input type="file" hidden accept="images/*" 
            style={{display:'none'}}
            onChange = {handleChange}/>
          Upload [Optional]
        </Button>
        }
        
        
        <Box sx={{ width: '100%' }}>
     { loading && <LinearProgress variant="determinate" value={progress} style={{marginTop:'0.2rem'}} />
     }
    </Box>
        
        </div>
    )
}
export default Upload