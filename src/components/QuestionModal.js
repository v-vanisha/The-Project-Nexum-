import * as React from "react";
import { useState } from "react";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useContext } from "react";
import Upload from "./Upload";
import Alert from '@mui/material/Alert';
import { AuthContext } from "../context/auth";
import Avatar from "@mui/material/Avatar";
import "./QuestionModal.css";
import {v4 as uuidv4} from 'uuid';
import { arrayUnion, doc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { db, storage } from '../firebase';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function QuestionModal({ userData }) {
  const [input, setInput] = useState("");
  const [file, setFile] = useState("");
  const { user, handleOpen, handleClose, open } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [closeLoading, setCloseLoading] = useState(false);
  const [error, setError] = useState(false);
  
  const handleQuestion = (e)=>{
    e.preventDefault();
    if(input == ""){
        setError("Please enter your question!")
        setTimeout(()=>{
          setError('')
        }, 2000)
        return;
      }
        setLoading(true);
        let quesuid = uuidv4();
        let obj = {
            quesId: quesuid,
            quesImageUrl: file,
            quesContent: input,
            profileName: userData?.name,
            profileUrl: userData?.photoUrl,
            uid: userData?.uid,
            timestamp: serverTimestamp() 
        }
        // console.log(obj); 
        //Now send this object to firebase
        setDoc(doc(db, "questions", quesuid), obj);
        console.log("ques added in questions collection")
        //Update the current user doc
        updateDoc(doc(db, "users", userData?.uid),{
            questions: arrayUnion(quesuid)
        })
        setLoading(false);
        setCloseLoading(false);
        handleClose();
        setInput("");
        setFile("");
  }

  return (
    <div>
      <Button
        onClick={() => {
          handleOpen();
        }}
      >
        Open modal
      </Button>
      <div>
        <Modal
        id="ques-modal"
          className="modal-wrapper"
          open={open}
          onClose={() => {
            handleClose();
          }}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="modal-ques" sx={style}>
            <h2 style={{ marginTop: "-20px", color: "#4682B4" }}>
              Write, Share and Grow!
            </h2>
            <div style={{ display: "flex" }}>
              <Avatar
                style={{ marginRight: "10px" }}
                alt="Remy Sharp"
                src={userData?.photoUrl}
              />
              <p style={{ marginTop: "5px", fontSize: "20px" }}>
                {userData?.name}
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

            <Upload file={file} handleFile={setFile} closeLoading={closeLoading} handleCloseLoading={setCloseLoading}/>
            {/* Buttons of the modal */}
            <div
              style={{
                display: "flex",
                marginTop: "40px",
                justifyContent: "flex-end",
              }}
            >
            {
                error != "" ? <Alert severity="error">{error} </Alert> : 
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
                onClick={handleQuestion}
              >
                Add Question
              </Button>
            }
              
            
              <Button
                onClick={() => handleClose()}
                variant="contained"
                disabled = {closeLoading}
                style={{ marginBottom: "-10px" }}
                href="#contained-buttons"
              >
                Close
              </Button>
            </div>
          </Box>
        </Modal>
      </div>
    </div>
  );
}
export default QuestionModal;
