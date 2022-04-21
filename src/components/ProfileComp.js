import React, { useContext, useEffect, useState } from 'react'
import Navbar from './Navbar'
import { AuthContext } from '../context/auth'
import { db } from "../firebase";
import { doc, collection, onSnapshot, query, orderBy } from 'firebase/firestore'
import { Link } from "react-router-dom";
import "./profile.css";


function ProfileComp(){
    const {user} = useContext(AuthContext)
    const [userData, setUserData] = useState({});
    const [questions, setQuestions] = useState([]);

    // Jab bhi user ki state update hogi tab ye useState chalega
    useEffect(()=>{
        // console.log(user.uid)
        
        const unsub = onSnapshot(doc(db, "users", user?.uid), (doc)=>{
            // console.log(doc.data());
            setUserData(doc.data())
        })

        return ()=>{
            unsub();
        }
    }, [user])

    /* I was stuck here error destroy function in async calls*/
    useEffect(()=>{
        (async()=>{
            const unsub = await onSnapshot(query(collection(db, "questions"), orderBy("timestamp", "desc")), (snapshot)=>{
                let tempArray = []
                snapshot.docs.map((doc)=>{
                    console.log(doc.uid)
                    console.log(userData?.uid)
                    if(doc.uid == userData?.uid){
                        tempArray.push(doc.data())
                    }
                    
                })
                setQuestions([...tempArray])
                console.log(questions);
            })
          
        })();
    } , [])

    return(
        <>
            <Navbar userData={userData}/>
            <div>
                <div className = "profile-upper">
                    <img src = {userData?.photoUrl} style={{height:"8rem", width:"8rem", borderRadius:"50%"}}/>
                    <div style={{flexBasis:"40%"}}>
                        <h1>{(userData?.name)?.toUpperCase()}</h1>
                    </div>
                    
                </div>
                <div style={{marginLeft:'600px', marginTop:'-100px'}}>
                        <h3>{(userData?.bio)}</h3>
                    </div>
                <hr />
                <div className = "profile-videos">
                
                   <h2>Questions Asked By You:</h2>
                   <div className="questions-container">
                       {
                           questions.map((ques)=>{
                            console.log(questions)
                               if((ques.quesContent != "") && (ques.uid == userData.uid))
                               return <div className="profile-ques">{ques.quesContent}</div>
                           })
                       }
                   </div>
                </div>
            </div>
        </>
    )
}

export default ProfileComp;