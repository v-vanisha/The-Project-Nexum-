import * as React from "react";
import { useState } from "react";
import Link from "@mui/material/Link";

import Box from "@mui/material/Box";
import Fade from '@mui/material/Fade';
import Backdrop from '@mui/material/Backdrop';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useContext } from "react";
import Alert from '@mui/material/Alert';
import { AuthContext } from "../context/auth";
import Avatar from "@mui/material/Avatar";
import "./answerModal.css";
import {v4 as uuidv4} from 'uuid';
import { arrayUnion, doc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { db, storage } from '../firebase';



function AnswerModal({ userData, questionData, openAnswer, handleOpenAnswer, handleCloseAnswer }) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 4,
    p: 4,
 
  };
  const [input, setInput] = useState("");
  const { user} = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('hi');

  const handleAnswer = (e)=>{
   e.preventDefault();
   if(questionData){
      if(input == ""){
      setError("Please enter your Answer!")
      setTimeout(()=>{
        setError('')
      }, 2000)
      return;
    }
      setLoading(true);
      let answeruid = uuidv4();
      let obj = {
          ansId: answeruid,
          ansContent: input,
          quesId: questionData?.quesId,
          // quesContent: questionData?.quesContent,
          profileName: userData?.name,
          profileUrl: userData?.photoUrl,
          uid: userData?.uid,
          timestamp: serverTimestamp() 
      }
      console.log(obj); 

      //now send this object to firebase
       setDoc(doc(db, "answers", answeruid),obj);

      console.log("answer added in answers collection")
     // Update the current user doc
       updateDoc(doc(db, "users", userData.uid),{
          answers: arrayUnion(answeruid)
      })
      // Update the current question doc
      let objNew = {
        ansInput: input,
        ansId: answeruid,
      }
       updateDoc(doc(db, "questions", questionData?.quesId),{
        answersContent: arrayUnion(objNew)
      })
      setLoading(false);
      setInput("");
      handleCloseAnswer();
   }
  }

  return (
     
      
      <>
        <Modal
          id="ans-modal"
          className="modal-wrapper"
          // I spent one day figuring out this
          BackdropProps={{invisible:true}}
          open={openAnswer}
          data-backdrop={false}
          onClose={() => {
            handleCloseAnswer();
          }}
          style={{
            overlay:{
              zIndex:"1000",
              backgroundColor:"rgba(0,0,0,0.8",
            }
          }}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="modal-answer" sx={style}>
          {/* {console.log(questionData?.quesContent)} */}
          <div>
          <h1 style={{ marginTop: "-15px", color: "#4682B4" }}>{questionData?.quesContent}</h1>
          <h3 style={{ marginTop: "-12px", color: "#5F9EA0" }}>
              Write your Response Buddy!
            </h3>
          </div>
            
            <div style={{ display: "flex" }}>
            
            <h4 style={{marginTop:'7px',
    marginRight:'15px'}}>Asked By:</h4>
              <Avatar
                style={{ marginRight: "10px" }}
                alt="Remy Sharp"
                src={questionData?.profileUrl}
              />
              <p style={{ marginTop: "1px", fontSize: "20px" }}>
                {questionData?.profileName}
              </p>
            </div>

            <Typography id="modal-modal-title" variant="h6" component="h2">
              <TextField
                value={input}
                onChange={(e) => setInput(e.target.value)}
                required
                id="standard-textarea"
                placeholder="Write down whatever you want to ask!"
                multiline
                variant="standard"
                fullWidth
              />
            </Typography>

    
            {/* Buttons of the modal */}
            <div
              style={{
                display: "flex",
                marginTop: "40px",
                justifyContent: "flex-end",
              }}
            >
            
                
                <Button
                variant="contained"
                style={{
                  backgroundColor: "green",
                  marginBottom: "-10px",
                  marginRight: "10px",
                  width: "110px",
                  height: "50px",
                  textAlign: "center",
                }}
                disabled={loading}
                href="#contained-buttons"
                onClick={handleAnswer}
              >
                Add Answer
              </Button>
            
              
            
              <Button
                onClick={() => handleCloseAnswer()}
                variant="contained"
                // disabled = {loading}
                style={{ marginBottom: "-10px" }}
                href="#contained-buttons"
              >
                Close
              </Button>
            </div>
          </Box>
        </Modal>
        </>
    
  );
}
export default AnswerModal;
