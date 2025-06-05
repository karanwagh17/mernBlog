import { Link } from 'react-router-dom';
import "../css/post.css"

export default function PostCard({ post }) {
  console.log(post);
  return (
  <div className="col-md-6 col-lg-4 mb-4">
  <div className="card post-card-custom">
    <Link to={`/singlepost/${post._id}`}>
      <img
        src={
          post.postImage.startsWith("https")
            ? post.postImage
            : `${import.meta.env.VITE_BASEURL}/post/${post.postImage}`
        }
        alt="post cover"
        className="card-img-top img-fluid post-img"
      />
    </Link>
    <div className="card-body d-flex flex-column">
      <h5 className="card-title text-truncate text-light">{post.title}</h5>
      
      <p className="card-text mb-2">{post.category}</p>
      <Link to={`/singlepost/${post._id}`} className="btn btn-read-article mt-auto">
        Read article
      </Link>
    </div>
  </div>
</div>

  );
}
