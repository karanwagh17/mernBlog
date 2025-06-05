import React, { useState, useEffect } from "react";
import { Button, Modal, Alert } from "react-bootstrap";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import Comment from "./Comment";
import axios from "axios";
import { useSelector } from "react-redux";

export default function CommentSection({ postId }) {
  const { user, token } = useSelector((state) => state.auth);

  const [comment, setComment] = useState("");
  const [commentError, setCommentError] = useState(null);
  const [comments, setComments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);

  useEffect(() => {
    getCommentPost();
  }, []);

  const getCommentPost = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASEURL}/api/comment/getpostcomment/${postId}`,
        {
          withCredentials: true,
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      setComments(res?.data?.comments || []);
    } catch (error) {
      console.log("Error fetching comments:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.length > 200) {
      setCommentError("Comment exceeds the character limit of 200.");
      return;
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASEURL}/api/comment/addComment`,
        {
          comment,
          userId: user?._id,
          postId,
        },
        {
          withCredentials: true,
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      
      setComment("");
      setCommentError(null);
      await getCommentPost(); // Refresh comments
    } catch (error) {
      console.log("Error submitting comment:", error.message);
      setCommentError("Failed to submit comment.");
    }
  };

  const handleLike = async (commentId) => {
    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_BASEURL}/api/comment/likes/${user._id}/${commentId}`,
        {},
        {
          withCredentials: true,
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      console.log(res)
      await getCommentPost(); // Refresh likes
    } catch (error) {
      console.log("Error liking comment:", error);
    }
  };

  const handleDelete = () => {
    setComments(comments.filter((comment) => comment._id !== commentToDelete));
    setShowModal(false);
  };

  return (
    <div className="border p-4 rounded">
      <h5>Leave a Comment</h5>
      <form onSubmit={handleSubmit}>
        <textarea
          className="form-control"
          placeholder="Add a comment..."
          rows="3"
          maxLength="200"
          onChange={(e) => setComment(e.target.value)}
          value={comment}
        ></textarea>
        <div className="d-flex justify-content-between align-items-center mt-2">
          <p className="text-muted small">
            {200 - comment.length} characters remaining
          </p>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </div>
        {commentError && (
          <Alert variant="danger" className="mt-3">
            {commentError}
          </Alert>
        )}
      </form>

      <div className="mt-4">
        <h5>Comments ({comments.length})</h5>
        {comments.length === 0 ? (
          <p>No comments yet!</p>
        ) : (
          comments.map((comment) => (
            <Comment
              key={comment._id}
              comment={comment}
              handleLike={handleLike}
              setShowModal={setShowModal}
              setCommentToDelete={setCommentToDelete}
            />
          ))
        )}
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body className="text-center">
          <HiOutlineExclamationCircle className="text-danger mb-3" size={40} />
          <h5>Are you sure you want to delete this comment?</h5>
          <div className="d-flex justify-content-center gap-3 mt-4">
            <Button variant="danger" onClick={handleDelete}>
              Yes, delete
            </Button>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
