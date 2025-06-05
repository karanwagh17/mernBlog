import React, { useState, useEffect } from "react";
import moment from "moment";
import CommentSection from "../components/CommentSection";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../css/card.css"; // Include styling

export default function BlogDetail() {
  const [post, setPost] = useState(null);
  const { postId } = useParams();

  const getSinglePostFromApi = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASEURL}/api/post/getSingelPost/${postId}`,
        { withCredentials: true }
      );
      setPost(res.data.post);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSinglePostFromApi();
  }, []);

  if (!post) {
    return <div className="text-center text-light my-5">Loading...</div>;
  }

  return (
    <div className="container my-4 " >
      <div className="row justify-content-center">
        <div className="col-md-10">
          <div className="card bg-dark text-light shadow-lg p-4 rounded-4">
            <img
              src={
                post.postImage?.startsWith("https")
                  ? post.postImage
                  : `${import.meta.env.VITE_BASEURL}/post/${post.postImage}`
              }
              alt={post.title}
              className="img-fluid rounded mb-3 post-img"
              style={{ maxHeight: "400px", objectFit: "cover" }}
            />
            <h2 className="fw-bold">{post.title}</h2>
            <p className="text-muted small">
              {moment(post.createdAt).fromNow()}
            </p>
            <p className="badge bg-secondary mb-3">{post.category}</p>
            <div
              className="blog-content"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </div>
      </div>
      <div className="mt-5">
        <CommentSection postId={post._id} />
      </div>
    </div>
  );
}
