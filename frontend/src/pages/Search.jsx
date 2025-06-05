import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import PostCard from "../components/PostCard";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import "../css/post.css";

export default function Search() {
  const [posts, setPosts] = useState([]);
  const [limit, setLimit] = useState(2);
  const [order, setOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");

  const getAllPostsFromApi = async () => {
    try {
      const res = await axios.get(
        `${
          import.meta.env.VITE_BASEURL
        }/api/post/getAllpost?limit=${limit}&search=${searchTerm}&order=${order}&category=${category}`,
        { withCredentials: true }
      );
      console.log(res);
      setPosts(res.data.post);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllPostsFromApi();
  }, [limit, searchTerm, order, category]);

  return (
    <div
      className="d-flex flex-column flex-md-row text-light"
      style={{ backgroundColor: "#1e1e2f", minHeight: "100vh" }}
    >
      <div
        className="p-4 border-end border-bottom md:min-vh-100"
        style={{ borderColor: "#2e2e4a" }}
      >
        <form className="d-flex flex-column gap-4">
          <div className="d-flex align-items-center">
            <label className="me-2">Search Term:</label>
            <input
              className="form-control bg-dark text-light border-0"
              placeholder="Search..."
              id="searchTerm"
              type="text"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="d-flex align-items-center">
            <label className="me-2">Sort:</label>
            <select
              className="form-select bg-dark text-light border-0"
              id="sort"
              onChange={(e) => setOrder(e.target.value)}
            >
              <option value="desc">Latest</option>
              <option value="asc">Oldest</option>
            </select>
          </div>
          <div className="d-flex align-items-center">
            <label className="me-2">Category:</label>
            <select
              className="form-select bg-dark text-light border-0"
              id="category"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="all">All</option>
              <option value="uncategorized">Uncategorized</option>
              <option value="reactjs">React.js</option>
              <option value="nextjs">Next.js</option>
              <option value="javascript">JavaScript</option>
            </select>
          </div>
          {/* <Button variant="outline-light" type="button">
            Apply Filters
          </Button> */}
        </form>
      </div>

      <div className="w-100">
        <h1
          className="border-bottom p-3 mt-5 text-light"
          style={{ borderColor: "#2e2e4a" }}
        >
          Posts results:
        </h1>
        <div className="p-4 d-flex flex-wrap gap-4">
          {posts.length > 0 ? (
            posts.map((post) => <PostCard key={post._id} post={post} />)
          ) : (
            <p className="text-light">No posts found.</p>
          )}
          <button
            className="btn show-more-btn mx-auto mt-4"
            onClick={() => setLimit(limit + 2)}
          >
            Show More
          </button>
        </div>
      </div>
    </div>
  );
}
