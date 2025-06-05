import axios from "axios";
import { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaUsers, FaRegComments, FaNewspaper } from "react-icons/fa";

export default function DashboardComp() {
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalComments, setTotalComments] = useState(0);

  const getAllCommentsFromApi = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/comment/admin/getallcomments`,
        { withCredentials: true }
      );
      setTotalComments(res.data.count);
      setComments(res.data.comments);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const getUsersFromApi = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASEURL}/api/user/getAllUser`,
        { withCredentials: true }
      );
      setUsers(res.data.users);
      setTotalUsers(res.data.count);
    } catch (error) {
      console.log(error);
    }
  };

  const getPostsFromApi = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASEURL}/api/post/getAllpost`,
        { withCredentials: true }
      );
      setPosts(res.data.post);
      setTotalPosts(res.data.totalDocument);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsersFromApi();
    getPostsFromApi();
    getAllCommentsFromApi();
  }, []);

  return (
    <div
      className="container-fluid py-4 px-5"
      style={{
        // marginLeft: "250px", // assumes sidebar width is 250px
        backgroundColor: "#1c1e21",
        minHeight: "100vh",
        color: "#fff",
      }}
    >
      {/* Cards */}
      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card bg-dark text-white shadow rounded">
            <div className="card-body text-center">
              <h5 className="card-title">Total Users</h5>
              <p className="display-6">{totalUsers}</p>
              <FaUsers className="display-1 text-info" />
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card bg-dark text-white shadow rounded">
            <div className="card-body text-center">
              <h5 className="card-title">Total Comments</h5>
              <p className="display-6">{totalComments}</p>
              <FaRegComments className="display-1 text-success" />
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card bg-dark text-white shadow rounded">
            <div className="card-body text-center">
              <h5 className="card-title">Total Posts</h5>
              <p className="display-6">{totalPosts}</p>
              <FaNewspaper className="display-1 text-warning" />
            </div>
          </div>
        </div>
      </div>

      {/* Data Tables */}
      <div className="row">
        <div className="col-md-4 mb-4">
          <h5 className="text-center text-light mb-3">Recent Users</h5>
          <div className="bg-dark p-3 rounded shadow">
            <Table variant="dark" striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Username</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>
                      <img
                        src={
                          user.profileImage.startsWith("https")
                            ? user.profileImage
                            : `http://localhost:8080/user/${user.profileImage}`
                        }
                        alt="Profile"
                        className="rounded-circle"
                        width={40}
                        height={40}
                      />
                    </td>
                    <td>{user.name}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Link to="/dashboard?tab=users">
              <Button variant="outline-info" className="w-100 mt-2">
                See All
              </Button>
            </Link>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <h5 className="text-center text-light mb-3">Recent Comments</h5>
          <div className="bg-dark p-3 rounded shadow">
            <Table variant="dark" striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>Content</th>
                  <th>Likes</th>
                </tr>
              </thead>
              <tbody>
                {comments.map((comment) => (
                  <tr key={comment._id}>
                    <td>{comment.comment}</td>
                    <td>{comment.numberOfLikes}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Link to="/dashboard?tab=comments">
              <Button variant="outline-success" className="w-100 mt-2">
                See All
              </Button>
            </Link>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <h5 className="text-center text-light mb-3">Recent Posts</h5>
          <div className="bg-dark p-3 rounded shadow">
            <Table variant="dark" striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Category</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr key={post._id}>
                    <td>
                      <img
                        src={
                          post.postImage?.startsWith("https")
                            ? post.postImage
                            : `http://localhost:8080/post/${post.postImage}`
                        }
                        alt="Post"
                        className="rounded-circle"
                        width={40}
                        height={40}
                      />
                    </td>
                    <td>{post.title}</td>
                    <td>{post.category}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Link to="/dashboard?tab=posts">
              <Button variant="outline-warning" className="w-100 mt-2">
                See All
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
