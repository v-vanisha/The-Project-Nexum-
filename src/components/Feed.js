// All the things are responsive here
import React from "react";
import Avatar from "@mui/material/Avatar";
import { AuthContext } from '../context/auth';
import { db } from "../firebase";
import { useEffect, useContext, useState } from 'react'
import { doc, collection, onSnapshot, query, orderBy } from 'firebase/firestore'
import "./feed.css";
import Post from './Post';

function Feed({userData}) {
  const [questionPosts, setQuestionPosts] = useState([]);
  const {user} = useContext(AuthContext)
  const getAnswer = [];


//   useEffect(()=>{(async()=>{
//       const unsub = await onSnapshot(query(collection(db, "questions"), orderBy("timestamp", "desc")), (snapshot)=>{
//           let tempArray = []
//           snapshot.docs.map((doc)=>{
//               tempArray.push(doc.data())
//           })
//           setQuestionPosts([...tempArray])
//       })
//       return ()=>{
//         unsub();
//     }
//   })();
// }, [])

useEffect(()=>{
  onSnapshot(query(collection(db, "questions"), orderBy("timestamp", "desc")), (snapshot)=>{
    let tempArray = []
    snapshot.docs.map((doc)=>{
        tempArray.push(doc.data())
    })
    setQuestionPosts([...tempArray])


})
},[])
  


  return (
    <>
    <div className="feed-container">
    
      <div className="feedUser-info">
        <Avatar src={userData?.photoUrl}/>
        <h3>{userData?.name}</h3>
      </div>

      <div className="feed-ques">
      {
         questionPosts != [] && questionPosts.map((question)=>{
            return <Post questionData={question} userData={userData} getAnswer={getAnswer}/>}) 
        
      }
      </div>
      


    </div>
    
    </>
  );
}

export default Feed;
