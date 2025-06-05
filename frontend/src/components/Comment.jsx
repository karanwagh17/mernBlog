import moment from "moment";
import { useState } from "react";
import { FaThumbsUp } from "react-icons/fa";
import { Button } from "react-bootstrap";

export default function Comment({comment,handleLike,setShowModal,setCommentToDelete}) {
 
  const [isEditing, setIsEditing] = useState(false);
  const dummyUser = {
    username: "john_doe",
    profilePicture: "https://via.placeholder.com/40",
  };
  const dummyComment = {
    content: "This is a sample comment!",
    createdAt: moment().subtract(1, "days").toDate(),
    numberOfLikes: 5,
  };



  

  return (
    <div className="d-flex p-3 border-bottom">
      <div className="me-3">
        <img
          className="rounded-circle"
          src={dummyUser.profilePicture}
          alt={dummyUser.username}
          width="40"
          height="40"
        />
      </div>
      <div className="flex-grow-1">
        <div className="d-flex align-items-center mb-1">
          <span className="fw-bold me-2">@{dummyUser.username}</span>
          <span className="text-muted small">
            {moment(comment.createdAt).fromNow()}
          </span>
        </div>
        {isEditing ? (
          <>
            <textarea
              className="form-control mb-2"
              defaultValue={comment.content}
            />
            <div className="d-flex justify-content-end gap-2">
              <Button variant="primary" size="sm">
                Save
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
            </div>
          </>
        ) : (
          <>
            <p className="text-muted">{comment.comment}</p>
            <div className="d-flex align-items-center gap-2 border-top pt-2">
              <button className="btn btn-link p-0 text-muted" onClick={()=>handleLike(comment._id)}>
                <FaThumbsUp />
              </button>
              <span className="text-muted small">
                {comment.numberOfLikes} likes
              </span>
              <Button
                variant="link"
                className="text-muted"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </Button>
              <Button variant="link" className="text-danger">
                Delete
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
