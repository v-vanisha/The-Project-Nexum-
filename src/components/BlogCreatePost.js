import React, { useState, useEffect, useContext } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, auth,storage } from "../firebase";
import { useNavigate,Link } from "react-router-dom";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import "./blog-createpost.css";
import { AuthContext } from "../context/auth";

function BlogCreatePost() {
  const [name,setName] = useState("");
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");
  const [subTitle,setSubTitle] = useState("");
  const postsCollectionRef = collection(db, "posts");
  let navigate = useNavigate();
  const [file, setFile] = useState("");
  // const {user} = useContext(AuthContext);

  // useEffect(() => {
  //   if (!isAuth) {
  //     navigate("/login");
  //   }
  // }, []);

//  another method
const createPost = async () => {
if(file == null){
  const cover = "default";
  await addDoc(postsCollectionRef, {
    title, 
    subTitle, 
    postText,
    cover,
    author: { id: auth.currentUser.uid} 
  });
}else{
  const cover = file.name + v4() ;
  var storageRef = await ref(storage, `blog-images/${cover}`);
  uploadBytesResumable(storageRef,file).then(
    () =>{
      getDownloadURL(storageRef).then(function(url){
        console.log(url);
        
      
      addDoc(postsCollectionRef, {
        title, 
        subTitle, 
        postText,
        cover: {cover, url},
        author: {name: name, id: auth.currentUser.uid} 
      });
    }
  );
  });
}
navigate("/BlogHome");
};

function SubmitButton(){
  if (title && subTitle && postText && file){
    return <button onClick={createPost}>Submit Post</button>
  } else {
    return <button type="button" disabled>Submit Post</button>
  };
}


  return (
    <div className="createPostPage">
      <nav>
        <Link to="/BlogHome"> Home </Link>
      </nav>
      <div className="cpContainer">
        <h1>Create A Post</h1>
        <div className="inputGp">
          <label> Author Name</label>
          <input
            placeholder="Your Name"
            onChange={(event) => {
              setName(event.target.value);
            }}
            required="required"
          />
        </div>
        <div className="inputGp">
          <label> Title:</label>
          <input
            placeholder="Title..."
            onChange={(event) => {
              setTitle(event.target.value);
            }}
            required="required"
          />
        </div>
        <div className="inputGp">
          <label> Sub Title:</label>
          <input
            placeholder="Title..."
            onChange={(event) => {
              setSubTitle(event.target.value);
            }}
            require="required"
          />
        </div>
        <div className="inputGp">
          <input
            type="file"
            onChange={(event) => {
              setFile(event.target.files[0]);
            }}
          />
        </div>
        <div className="inputGp">
          <label> Post:</label>
          <textarea
            placeholder="Post..."
            onChange={(event) => {
              setPostText(event.target.value);
            }}
          />
        </div>
        <SubmitButton/>
        {/* <button disabled={!title} disabled={!subTitle} disabled={!postText} disabled = {!file} onClick={createPost}> Submit Post</button> */}
      </div>
    </div>
  );
}

export default BlogCreatePost;
