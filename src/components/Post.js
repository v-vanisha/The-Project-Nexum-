import React, {useState, useEffect, useContext} from "react";
import Avatar from "@mui/material/Avatar";
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import ChatIcon from "@mui/icons-material/Chat";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Button from "@mui/material/Button";
import AnswerModal from './AnswerModal';
import { AuthContext } from '../context/auth';
import { arrayUnion, arrayRemove, doc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { getDocs, getDoc, collection, onSnapshot, query, orderBy } from 'firebase/firestore'
import "./post.css";
import Ans from './Ans';

function Post({questionData, userData}) {
  const {user} = useContext(AuthContext);
  const currQuesId = (questionData?.quesId) ? (questionData.quesId) : "";
  // console.log(currQuesId);
  // const [quesId, setQuesId] = useState("");
  // useEffect(()=>{
  //   setQuesId(questionData?.quesId);
  // }, [questionData])
  
  const [openAnswer, setOpenAnswer] = useState(false);
  // const [getAns, setGetAns] = useState([]);
  const date = (questionData?.timestamp?.toDate().toDateString());
  const time = (questionData?.timestamp?.toDate().toLocaleTimeString('en-US'));
  
  function handleOpenAnswer(e){
    setOpenAnswer(true);
  }

  function handleCloseAnswer(){
    setOpenAnswer(false);
  }


  
// useEffect(()=>{
//   if(currQuesId != ""){
   
//     (async()=>{
//       const q = query(collection(db, `questions/${currQuesId}`));
//       const querySnapshot = await getDocs(q);
//       let tempArray = [];
//       querySnapshot.forEach((doc)=>{
//         tempArray.push(doc.data());
//         console.log("hi")
//         console.log(doc.data().quesId)
//       })
//       setGetAns([...tempArray]);
//       console.log("hey");
//       console.log(currQuesId);
//     })();
//   }
  
  
  // console.log(getAnswer);
  
  // if(currQuesId != ""){
  //   query(collection(db, `questions/${currQuesId}/answers`)).map((doc)=>{
  //     let tempArray = [];
  //     tempArray.push(doc.data());
  //     console.log("hi")
  //     console.log(doc.data().quesId)
  //   })
        
  //       setGetAns([...tempArray]);
  //       console.log("hey");
  //       console.log(currQuesId);
  //       console.log(getAns);
  // }
// },[currQuesId])





//   useEffect(()=>{(async()=>{
//     // console.log("this use effect is running");
//     if(questionData?.quesId){
//       const unsub = await onSnapshot(query(collection(db, "questions"), orderBy("timestamp", "desc")), (snapshot)=>{
//         let tempArray = []
//         snapshot.docs.map((doc)=>{
//               tempArray.push(doc.data())
//         })
//         setGetAns([...tempArray])
//         // console.log(tempArray);
//     })
//     }
// })();
// }, [])
  return (
    <div className="post-container">
      <div className="post-info">
        <Avatar src={questionData.profileUrl}/>
        <h5>{questionData.profileName}</h5>
        <small>{date}</small>
        <small>{time}</small>
      </div>

      <div className="post-body">
      <div className="post-upper">
      <div className="post-question">
          <p>{questionData.quesContent}</p>         
          {
  (questionData.quesImageUrl) && <div className="docLink">
     <a style={{textDecoration:'none', color:'black', fontSize:'18px'}} target='_blank' href={questionData.quesImageUrl}><InsertPhotoIcon/>{`${questionData.profileName}.pdf`}</a>
    </div>
    }

    
        </div>

      </div>
        

      <div className="post-btn-container">
        <Button className = "post-btn"
            variant="contained"
            onClick = {()=>{handleOpenAnswer()}}
            style={{backgroundColor: '#779ecb',
  marginLeft: '850px',
  marginTop: '-90px', padding:'20px 30px', height:'54px'}}
          >
            Add Answer
          </Button>

        </div>
        
        <div className="ans-content">
      {
        
        currQuesId != "" && (questionData.answersContent)?.map((objC)=>{
            return <Ans answerData={objC} userData={userData} questionData={questionData}/>})
      }
      </div>


        
        <div style={{display:'none'}}>
            <AnswerModal userData={userData} questionData={questionData} openAnswer={openAnswer} handleOpenAnswer={handleOpenAnswer} handleCloseAnswer={handleCloseAnswer}/>
            </div> 

        
      </div>

      {/* <div className="post-footer">
        <div className="post-footer-content-left">
          <ArrowCircleUpIcon />
          <ArrowCircleDownIcon />
        </div>
        <ChatIcon sx={{ ml: 3, mt: 1 }} />
        <div className="post-footer-content-right">
          <ShareIcon />
          <MoreVertIcon />
        </div>
      </div> */}
    </div>
  );
}

export default Post;
