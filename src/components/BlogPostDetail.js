import React, { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebase";
import Stack from '@mui/material/Stack';
import { useParams,Link } from "react-router-dom";
import { AuthContext } from "../context/auth";

function BlogPostDetail() {

  const [postLists, setPostList] = useState([]);
  const postsCollectionRef = collection(db, "posts");

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postsCollectionRef);
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getPosts();
  }, []);



  const params = useParams();
  return (
    <div className="DetailPage">
      <nav>
        <Link to="/BlogHome"> Home </Link>
      </nav>
      {postLists
        .filter(
          (post) => post.author !== undefined && params.id === post.id
        )
        .map((post) => {
          return (
            <div className="content" key={post.id}>
              <Stack direction ="column" spacing={2}>
              <h1 className="sub-heading">{post.subTitle}</h1>
              <img className="blogImage" src={post.cover.url} alt="blogimage"></img>
              <p className="textcontainer">{post.postText}</p>
              </Stack>
            </div>
          );
        })}
    </div>
  );
}

export default BlogPostDetail;
