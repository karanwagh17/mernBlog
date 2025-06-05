import React, { useEffect, useState } from "react";
import { Modal, Button, Table } from "react-bootstrap";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { FaCheck, FaTimes } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";

export default function DashUsers() {
  // Sample user data (replace with actual data as needed)
  const [users, setUsers] = useState(null);
  const [limit, setLimit] = useState(2);

  const getAllUSersfromApi = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASEURL}/api/user/getAllUser?limit=${limit}`,
        {
          withCredentials: true,
        }
      );
      console.log(res);
      setUsers(res.data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  const hendeldelete = async (userId) => {
    try {
      const res = await axios.delete(
        `http://localhost:8080/api/user/deleteuser/${userId}`,
        {
          withCredentials: true,
        }
      );
      console.log(res);

      toast.success(res.data.message);
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllUSersfromApi();
  }, [limit]);

  const [showModal, setShowModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState("");

  const openDeleteModal = (userId) => {
    setUserIdToDelete(userId);
    setShowModal(true);
  };

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
        boxShadow: "0 0 12px rgba(0, 0, 0, 0.6)",
      }}
    >
      <h2 className="text-center mb-4" style={{ color: "#a78bfa" }}>
        User List
      </h2>
      {users?.length > 0 ? (
        <>
          <Table
            hover
            bordered
            responsive
            className="text-light"
            style={{ backgroundColor: "#2a2b2e" }}
          >
            <thead style={{ backgroundColor: "#4b2990", color: "#fff" }}>
              <tr>
                <th>Date Created</th>
                <th>User Image</th>
                <th>Username</th>
                <th>Email</th>
                <th>Admin</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="align-middle">
                  <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td>
                    <img
                      src={
                        user.profileImage?.startsWith("https")
                          ? user?.profileImage
                          : `http://localhost:8080/user/${user?.profileImage}`
                      }
                      alt={user.username}
                      className="rounded-circle"
                      style={{
                        width: "40px",
                        height: "40px",
                        objectFit: "cover",
                      }}
                    />
                  </td>
                  <td>{user?.name}</td>
                  <td>{user?.email}</td>
                  <td className="text-center">
                    {user?.role ? (
                      <FaCheck className="text-success" />
                    ) : (
                      <FaTimes className="text-danger" />
                    )}
                  </td>
                  <td className="text-center">
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => openDeleteModal(user._id)}
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
        <p className="text-center">You have no users yet!</p>
      )}
      <button
        className="w-100   mt-3 rounded-pill fw-semibold"
        style={{
          backgroundColor: "#7c3aed",
          border: "none",
          color: "#fff",
          height: "40px",
        }}
        onClick={()=>setLimit(limit+2)}
        
      >
        see more
      </button>
      {/* Delete Confirmation Modal */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        contentClassName="bg-dark text-light"
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "#f87171" }}>
            Confirm Deletion
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <HiOutlineExclamationCircle className="h-14 w-14 text-warning mb-4" />
          <p className="mb-4">
            Are you sure you want to delete this user? This action cannot be
            undone.
          </p>
          <Button
            variant="danger"
            className="me-2"
            onClick={() => {
              hendeldelete(userIdToDelete);
              setShowModal(false);
            }}
          >
            Yes, Delete
          </Button>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
        </Modal.Body>
      </Modal>
    </div>
  );
}
