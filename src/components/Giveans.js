// import React, {useState, useEffect, useContext} from "react";
// import { arrayUnion, arrayRemove, doc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
// import { db } from '../firebase';
// import { AuthContext } from "../context/auth";
// import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
// import { collection, onSnapshot, query, orderBy } from 'firebase/firestore'
// import Ans from './Ans';

// function Giveans({getAns, handleGetans, questionId, userData}){
//     const { user } = useContext(AuthContext);
//     useEffect(()=>{(async()=>{
//     if(questionId){
//       const unsub = await onSnapshot(query(collection(db, "answers"), orderBy("timestamp", "desc")), (snapshot)=>{
//         let tempArray = []
//         snapshot.docs.map((doc)=>{
//           //  console.log(doc.data().quesId);
//           //  console.log(currQuesId);
//              if(doc.data().quesId == questionId){
//               tempArray.push(doc.data())
//              }
            
//         })
//         handleGetans([...tempArray])
        
//         // console.log("speaking from Post ans");
//     })


//     return ()=>{
//         unsub();
//     }
//     }
    
   
// })();
// },[questionId])

// return(
//     <>
  
//                 {
          
//         getAns != [] && getAns.map((answerobj)=>{
            
//             return <Ans answerData={answerobj} userData={userData}/>
//         })
//       }
//     </>
// )
// }

// export default Giveans;