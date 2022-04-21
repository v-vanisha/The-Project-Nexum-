import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import "./ans.css"
import Avatar from "@mui/material/Avatar";
import Tooltip from '@mui/material/Tooltip';
import { AuthContext } from "../context/auth";
import { useContext, useState, useEffect } from "react";
import { getDoc, deleteDoc, arrayUnion, arrayRemove, doc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { db, storage } from '../firebase';

function Ans({answerData, userData, questionData}){
    const { user} = useContext(AuthContext);
    const [answerPost, setAnswerPost] = useState();
    const [downvote, setDownvote] = useState(false);
    const [updisable, setUpdisable] = useState(false);
    const [upvote, setUpvote] = useState(false);
    const [downdisable, setDowndisable] = useState(false);
    const [run, setRun] = useState(0);

    useEffect(()=>{
        (async()=>{
            const docRef = doc(db, "answers", answerData.ansId);
            const docSnap = await getDoc(docRef);
            if(docSnap.exists()){
                setAnswerPost(docSnap.data());
            }

            //making the changes
            if(answerPost?.upvotes?.includes(user?.uid)){
               setUpvote(true);
            }
            else{
               setUpvote(false);
            }

            if(answerPost?.downvotes?.includes(user?.uid)){
               setDownvote(true);
            }
            else{
              setDownvote(false);
            }

        })(); 
    })
    // console.log(answerPost);
    

    // useEffect(()=>{
    //     console.log("I am running useEffect from Ans");
    //     if(answerPost?.upvotes?.includes(user?.uid)){
    //         setUpvote(true);
    //     }
    //     else{
    //         setUpvote(false);
    //     }
    //     if(answerPost?.downvotes?.includes(user?.uid)){
    //         setDownvote(true);
    //     }
    //     else{
    //         setDownvote(false);
    //     }

    // }, [run])

    const handleDelete = async()=>{
        if(user?.uid == answerPost?.uid){
            updateDoc(doc(db, "questions", questionData?.quesId),{
                answersContent : arrayRemove(answerData)
            })
            console.log("hi");
            console.log(user?.uid);
            console.log(answerPost?.ansId);
            updateDoc(doc(db, "users", user?.uid),{
                answers : arrayRemove(answerPost?.ansId)
            })
            await deleteDoc(doc(db, "answers", answerPost?.ansId))
            console.log("document deleted");
        }
        
    }

    const handleUpvote = async()=>{
        if(updisable == false){
            setDowndisable(true);
        if(!upvote){
            await updateDoc(doc(db, "answers", answerPost?.ansId),{
                upvotes: arrayUnion(user?.uid)
            })
            // setUpvote(true);
            console.log(answerPost?.upvotes?.length)
        }
        else{
            setDowndisable(false);
            await updateDoc(doc(db, "answers", answerPost?.ansId),{
              upvotes: arrayRemove(user?.uid)
            })
            // setUpvote(false);
        }
    }
}

    const handleDownvote = async()=>{
        if(downdisable == false){
            setUpdisable(true);
        if(!downvote){
             await updateDoc(doc(db, "answers", answerPost?.ansId),{
                downvotes: arrayUnion(user?.uid)
              })
            //   setDownvote(true);
        }
        else{
            setUpdisable(false);
            await updateDoc(doc(db, "answers", answerPost?.ansId),{
               downvotes: arrayRemove(user?.uid)
            })
            // setDownvote(false);
        }
    }
}

    // const handleUpvote = async()=>{
    //    setDownvote(false)
    //    console.log("handleUpvote running")
    //     // if(updisable == false){
    //         // setDowndisable(true);
    //         if(!upvote){
    //             setUpvote(true)
    //             await updateDoc(doc(db, "answers", answerPost?.ansId),{
    //                 upvotes: arrayUnion(user?.uid)
    //             })
    //         }
    //         else{
    //             // setDowndisable(false);
    //             setUpvote(false)
    //             await updateDoc(doc(db, "answers", answerPost?.ansId),{
    //                 upvotes: arrayRemove(user?.uid)
    //             })
    //         }
            
    //     // }
    //     setRun(run+1);
    // }

    // const handleDownvote = async()=>{
     
    //     console.log("handle downvote running")
    //     setUpvote(false);
    //     // if(downdisable == false){
    //         // setUpdisable(true);
    //         if(!downvote){
    //             setDownvote(true);
    //            await updateDoc(doc(db, "answers", answerPost?.ansId),{
    //                 downvotes: arrayUnion(user?.uid)
    //             })
    //         }
    //         else{
    //             // setUpdisable(false);
    //             setDownvote(false);
    //             await updateDoc(doc(db, "answers", answerPost?.ansId),{
    //                 downvotes: arrayRemove(user?.uid)
    //             })
    //         }
    //     // }
    //     setRun(run+1);
    // }
    const date = (answerPost?.timestamp?.toDate().toDateString());
    const time = (answerPost?.timestamp?.toDate().toLocaleTimeString('en-US'));

    return(
        <>
       
            <div className="ans-container" >
            <div className="ans-info">
                <Avatar src={answerPost?.profileUrl}/>
                <h5>{answerPost?.profileName}</h5>
                <small>{date}</small>
                <small>{time}</small>
                </div>
                <div 
                className="ans-text"
                style={{fontSize:'17px'}}>{answerData?.ansInput}</div>
          
            <div className="ans-icons">
            <div className="upvote-icon" style={{paddingRight:'10px', display:'flex'}}>
            <Tooltip title="Upvote Ans">
                   <ArrowCircleUpIcon onClick={handleUpvote} style={upvote?{color:"red"}:{color:"grey"}}/>
                   </Tooltip>
                    {answerPost?.upvotes?.length>0 && answerPost?.upvotes?.length}
                   </div>
                    
                    <div className="downvote-icon" style={{paddingLeft:'10px', display:'flex'}}>
                    <Tooltip title="Downvote Ans">
                    <ArrowCircleDownIcon onClick={handleDownvote} style={downvote?{color:"red"}:{color:"grey"}}/>
                    </Tooltip>
                    {answerPost?.downvotes?.length>0 && answerPost?.downvotes?.length}
                    </div> 

                    {
                        (user?.uid == answerPost?.uid) ? 
                        <div className="delete-icon" style={{marginLeft:'850px', display:'flex', color:'grey'}}>
                        <Tooltip title="Delete Answer">
                   <DeleteIcon onClick={handleDelete}/>
                   </Tooltip>
                   </div> : ""
                    }  
        </div>
        </div>
        
        </>
            
    )
}

export default Ans;