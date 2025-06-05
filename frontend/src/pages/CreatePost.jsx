import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("uncategorized");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASEURL}/api/post/createPost`,
        { title, category, content },
        {
          withCredentials: true,
        }
      );
      toast.success(res?.data?.message || "Post created successfully");
      setTitle("");
      setCategory("uncategorized");
      setContent("");
    } catch (error) {
      console.log("Error creating post:", error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div
      className="p-4"
      style={{
        // adjust for sidebar width
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #f3e5f5, #ede7f6)",
      }}
    >
      <div
        className="container bg-white rounded shadow-sm p-4"
        style={{ maxWidth: "80%" }}
      >
        <h2
          className="text-center fw-bold mb-4"
          style={{ color: "#6a1b9a", fontWeight: "600" }}
        >
          Create a New Post
        </h2>

        <Form className="d-flex flex-column gap-4" onSubmit={handleSubmit}>
          <Form.Group className="d-flex flex-wrap gap-3">
            <Form.Control
              type="text"
              placeholder="Enter title"
              className="flex-fill"
              value={title}
              style={{ borderColor: "#ba68c8" }}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Form.Select
              className="flex-fill"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{ borderColor: "#ba68c8" }}
            >
              <option value="uncategorized">Select category</option>
              <option value="javascript">JavaScript</option>
              <option value="reactjs">React.js</option>
              <option value="nextjs">Next.js</option>
            </Form.Select>
          </Form.Group>

          <ReactQuill
            theme="snow"
            placeholder="Write your content..."
            value={content}
            className="mb-4"
            onChange={setContent}
            style={{
              height: "250px",
              color: "#4b0082",
              backgroundColor: "#fff",
              borderRadius: "10px",
              border: "1px solid #ce93d8",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
            }}
          />

          <Button
            type="submit"
            className="w-100 fw-bold rounded-pill"
            style={{
              backgroundColor: "#ce93d8",
              border: "none",
              color: "#4b0082",
            }}
          >
            Publish Post
          </Button>
        </Form>
      </div>
    </div>
  );
}
