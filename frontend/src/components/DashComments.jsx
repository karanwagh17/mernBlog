import axios from "axios";
import { useEffect, useState } from "react";

import { Modal, Table, Button } from "react-bootstrap";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useSelector } from "react-redux";

export default function DashComments() {
  const { user } = useSelector((state) => state.auth);

  const currentUser = { isAdmin: true };
  const [comments, setComments] = useState();
  const [showModal, setShowModal] = useState(false);
  const [commentIdToDelete, setCommentIdToDelete] = useState("");
  

  const handleDelete = (commentId) => {
    setShowModal(true);
    setCommentIdToDelete(commentId);
  };

  const confirmDelete = async() => {
    try {
      const res = await axios.delete(
        `http://localhost:8080/api/comment/delete/${user._id}/${commentIdToDelete}`,
        {
          withCredentials: true,
        }
      );
      console.log(res);
      if (res.status === 200) {
        setComments((prevComments) =>
          prevComments.filter((comment) => comment._id !== commentIdToDelete)
        );
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
      toast.error("Failed to delete comment. Please try again.");
    }

    setShowModal(false);
  };
  const getAllcomentsfromApi = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/comment/admin/getallcomments`,
        {
          withCredentials: true,
        }
      );
      setComments(res.data.comments);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };
  useEffect(() => {
    getAllcomentsfromApi();
  }, []);
  return (
   <div
  className="container p-4 rounded"
  style={{
    maxWidth: "60%",
    position: "absolute",
    top: "18%",
    left: "25%",
    backgroundColor: "#1e1f22",
    color: "#f1f1f1",
    boxShadow: "0 0 12px rgba(0,0,0,0.5)",
  }}
>
  <h3 className="text-center mb-4" style={{ color: "#a78bfa" }}>
    All Comments
  </h3>
  {currentUser?.isAdmin && comments?.length > 0 ? (
    <>
      <Table
        striped
        bordered
        hover
        responsive
        className="text-light"
        style={{ backgroundColor: "#2a2b2e" }}
      >
        <thead style={{ backgroundColor: "#4b2990", color: "#fff" }}>
          <tr>
            <th>Date Updated</th>
            <th>Comment Content</th>
            <th>Likes</th>
            <th>Post ID</th>
            <th>User ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {comments.map((comment) => (
            <tr key={comment._id}>
              <td>{new Date(comment.updatedAt).toLocaleDateString()}</td>
              <td>{comment.comment}</td>
              <td>{comment.numberOfLikes}</td>
              <td>{comment.postId}</td>
              <td>{comment.userId}</td>
              <td>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => handleDelete(comment._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  ) : (
    <p className="text-center">You have no comments yet!</p>
  )}

  {/* Delete Confirmation Modal */}
  <Modal
    show={showModal}
    onHide={() => setShowModal(false)}
    centered
    contentClassName="bg-dark text-light"
  >
    <Modal.Header closeButton>
      <Modal.Title className="d-flex align-items-center text-danger">
        <HiOutlineExclamationCircle className="me-2" />
        Confirm Deletion
      </Modal.Title>
    </Modal.Header>
    <Modal.Body className="text-center">
      Are you sure you want to delete this comment? This action cannot be undone.
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={() => setShowModal(false)}>
        Cancel
      </Button>
      <Button variant="danger" onClick={confirmDelete}>
        Yes, Delete
      </Button>
    </Modal.Footer>
  </Modal>
</div>

  );
}
