import React, { useEffect, useState } from "react";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { Link } from "react-router-dom";
import Stack from '@mui/material/Stack';

import "./blog-home.css";
function BlogHome({ isAuth }) {
  const [postLists, setPostList] = useState([]);
  const postsCollectionRef = collection(db, "posts");

  const deletePost = async (id) => {
    const postDoc = doc(db, "posts", id);
    await deleteDoc(postDoc);
    // window.location.reload();
  };
  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postsCollectionRef);
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getPosts();
  }, [deletePost]);

  return (
    <div className="homePage">
     <nav>
        <Link to="/BlogHome"> Home </Link>
        <Link to="/createpost"> Create Post </Link>
      </nav>
      <Stack direction="column" spacing={3}>
      {postLists
        .filter((post) => post.author !== undefined)
        .map((post) => {
          return (
            <div className="post" key={post.id}>
              <Stack direction="column" spacing={2}>
              <div className="postHeader">
                <div className="title">
                  <Link to={`/post/${post.id}`}>
                    {post.title}
                  </Link>
                </div>
                <div className="deletePost">
                  {post.author.id === auth.currentUser.uid && (
                    <button
                      onClick={() => {
                        deletePost(post.id);
                      }}
                    >
                      {" "}
                      &#128465;
                    </button>
                  )}
                </div>
              </div>
              <div className="subTitle">
                  <p>{post.subTitle}</p>
              </div>
              {/* <div className="postTextContainer"> {post.postText} </div> */}
              <h3>@{post.author.name}</h3>
              </Stack>
            </div>
          );
        })}
         </Stack>
    </div>
  );
}

export default BlogHome;
