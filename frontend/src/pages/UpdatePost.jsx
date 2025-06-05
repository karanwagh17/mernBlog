import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function UpdatePost() {
  const { user } = useSelector((state) => state.auth);
  const { postId } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [newImage, setNewImage] = useState(null);

  const getSinglePostFromApi = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASEURL}/api/post/getSingelPost/${postId}`,
        { withCredentials: true }
      );
      const post = res.data.post;
      setTitle(post.title);
      setCategory(post.category);
      setContent(post.content);
      setImage(post.postImage);
    } catch (error) {
      console.log("Error fetching post:", error);
      toast.error("Failed to fetch post. Please try again.");
    }
  };

  useEffect(() => {
    getSinglePostFromApi();
  }, []);

  const handleUpdatePost = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("content", content);
    formData.append("postImage", newImage || image);

    try {
      const res = await axios.put(
        `${import.meta.env.VITE_BASEURL}/api/post/updatePost/${user._id}/${postId}`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success(res.data.message);
      navigate("/dashboard?tab=posts");
    } catch (error) {
      console.log("Error updating post:", error);
      toast.error("Failed to update post. Please try again.");
    }
  };

  return (
    <div
      className="p-4"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #f3e5f5, #ede7f6)",
      }}
    >
      <div className="container bg-white rounded shadow-sm p-4" style={{ maxWidth: "80%" }}>
        <h2 className="text-center fw-bold mb-4" style={{ color: "#6a1b9a" }}>
          Update Post
        </h2>

        <Form onSubmit={handleUpdatePost} className="d-flex flex-column gap-4">
          <Form.Group>
            <Form.Label className="fw-semibold" style={{ color: "#6a1b9a" }}>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{ borderColor: "#ba68c8" }}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label className="fw-semibold" style={{ color: "#6a1b9a" }}>Category</Form.Label>
            <Form.Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{ borderColor: "#ba68c8" }}
            >
              <option value="uncategorized">Select a category</option>
              <option value="javascript">JavaScript</option>
              <option value="reactjs">React.js</option>
              <option value="nextjs">Next.js</option>
            </Form.Select>
          </Form.Group>

          {image && typeof image === "string" && (
            <div>
              <Form.Label className="fw-semibold" style={{ color: "#6a1b9a" }}>
                Current Image
              </Form.Label>
              <br />
              <img
                src={
                  image.startsWith("https")
                    ? image
                    : `${import.meta.env.VITE_BASEURL}/post/${image}`
                }
                alt="Current"
                className="img-fluid rounded"
                style={{ maxHeight: "200px", border: "1px solid #ddd" }}
              />
            </div>
          )}

          <Form.Group>
            <Form.Label className="fw-semibold" style={{ color: "#6a1b9a" }}>
              Upload New Image (optional)
            </Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={(e) => setNewImage(e.target.files[0])}
              style={{ borderColor: "#ba68c8" }}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label className="fw-semibold" style={{ color: "#6a1b9a" }}>
              Content
            </Form.Label>
            <ReactQuill
              theme="snow"
              value={content}
              onChange={setContent}
              placeholder="Write something..."
              style={{
                height: "200px",
                backgroundColor: "#fff",
                border: "1px solid #ce93d8",
                color: "#4b0082",
                borderRadius: "10px",
              }}
            />
          </Form.Group>

          <Button
            type="submit"
            className="w-100 fw-bold rounded-pill mt-4"
            style={{
              backgroundColor: "#ce93d8",
              border: "none",
              color: "#4b0082",
            }}
          >
            Update Post
          </Button>
        </Form>
      </div>
    </div>
  );
}
