import { useEffect, useState } from "react";
import { Modal, Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { toast } from "react-toastify";
import axios from "axios";
import { useSelector } from "react-redux";

export default function DashPosts() {
  const { user } = useSelector((state) => state.auth);
  const [posts, setPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState("");
  const [limit, setLimit] = useState(2);

  const handleDeletePost = async () => {
    setShowModal(false);
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_BASEURL}/api/post/deletePost/${user._id}/${postIdToDelete}`,
        { withCredentials: true }
      );
      toast.success(res.data.message);
      setPosts(posts.filter((post) => post._id !== postIdToDelete));
    } catch (error) {
      console.error("Error deleting post:", error);
      toast.error("Failed to delete post. Please try again.");
    }
  };

  const getAllpostsfromApi = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASEURL}/api/post/getAllpost?limit=${limit}`,
        { withCredentials: true }
      );
      setPosts(res.data.post);
    } catch (error) {
      console.error("Error fetching posts:", error);
      toast.error("Failed to fetch posts. Please try again.");
    }
  };

  useEffect(() => {
    getAllpostsfromApi();
  }, [limit]);

  return (
    <div
      className="p-4"
      style={{
        minHeight: "100vh",
        backgroundColor: "#1c1e21",
        color: "#f5f5f5",
      }}
    >
      <div
        className="container rounded p-4"
        style={{
          maxWidth: "90%",
          backgroundColor: "#2c2f33",
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
        }}
      >
        <h3 className="text-center mb-4 fw-bold text-info">
          Manage Your Posts
        </h3>
<Table
  bordered
  hover
  responsive
  className="text-light"
  style={{
    backgroundColor: "#343a40",
    borderColor: "#555",
  }}
>
  <thead style={{ backgroundColor: "#4b2990", color: "#ffffff" }}>
    <tr>
      <th>Date Updated</th>
      <th>Image</th>
      <th>Title</th>
      <th>Category</th>
      <th>Delete</th>
      <th>Edit</th>
    </tr>
  </thead>
  <tbody>
    {posts.map((post) => (
      <tr
        key={post._id}
        style={{
          backgroundColor: "#2c2f33",
          borderBottom: "1px solid #444",
        }}
      >
        <td>{new Date(post.updatedAt).toLocaleDateString()}</td>
        <td>
          <Link to={`/post/${post.slug}`}>
            <img
              src={
                post.postImage.startsWith("https")
                  ? post.postImage
                  : `${import.meta.env.VITE_BASEURL}/post/${post.postImage}`
              }
              alt={post.title}
              width={90}
              height={60}
              style={{
                objectFit: "cover",
                borderRadius: "8px",
                boxShadow: "0 2px 5px rgba(0,0,0,0.5)",
              }}
            />
          </Link>
        </td>
        <td>
          <Link
            className="text-decoration-none fw-semibold"
            style={{ color: "#a78bfa" }}
            to={`/post/${post.slug}`}
          >
            {post.title}
          </Link>
        </td>
        <td>{post.category}</td>
        <td>
          <span
            className="fw-bold"
            style={{ color: "#f87171", cursor: "pointer" }}
            onClick={() => {
              setShowModal(true);
              setPostIdToDelete(post._id);
            }}
          >
            Delete
          </span>
        </td>
        <td>
          <Link
            className="fw-bold"
            style={{ color: "#60a5fa" }}
            to={`/update-post/${post._id}`}
          >
            Edit
          </Link>
        </td>
      </tr>
    ))}
  </tbody>
</Table>


        <Button
          className="w-100 mt-3 rounded-pill fw-semibold"
          style={{
            backgroundColor: "#7c3aed",
            border: "none",
            color: "#fff",
          }}
          onClick={() => setLimit(limit + 2)}
        >
          Show More
        </Button>
      </div>

      {/* Modal for deletion */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <HiOutlineExclamationCircle className="text-warning mb-3" size={40} />
          <p className="text-muted">
            Are you sure you want to delete this post? This action cannot be undone.
            
          </p>
          <div className="d-flex justify-content-center mt-4">
            <Button variant="danger" onClick={handleDeletePost} className="me-3 px-4">
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
