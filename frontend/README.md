/client
├── /node_modules                 # Contains all project dependencies (auto-generated)
├── /public
│   ├── index.html                # Main HTML file for the React app
│   └── favicon.ico               # Favicon for the browser tab
├── /src
│   ├── /assets                   # Folder for images, icons, or other static assets
│   ├── /components               # Reusable React components
│   │ 
│   │   ├── Comment.jsx           # Single comment component
│   │   ├── CommentSection.jsx    # Section displaying multiple comments
│   │   ├── DashboardComp.jsx     # Component for dashboard overview
│   │   ├── DashComments.jsx      # Component for displaying comments in the dashboard
│   │   ├── DashPosts.jsx         # Component for displaying posts in the dashboard
│   │   ├── DashProfile.jsx       # Component for user profile section in the dashboard
│   │   ├── DashSidebar.jsx       # Sidebar component in the dashboard
│   │   ├── DashUsers.jsx         # Component for user management in the dashboard
│   │   ├── Footer.jsx            # Footer component
│   │   ├── Header.jsx            # Header component
│   │   ├── OnlyAdminPrivateRoute.jsx # Route component restricted to admin users
│   │   ├── PostCard.jsx          # Component for displaying a single post as a card
│   │   ├── PrivateRoute.jsx      # Private route component for authenticated users
│   ├── /pages                    # Main pages in your application
│   │   ├── About.jsx             # About page
│   │   ├── CreatePost.jsx        # Page to create new blog posts
│   │   ├── Dashboard.jsx         # Admin/user dashboard page
│   │   ├── Home.jsx              # Home page showing blog posts
│   │   ├── PostPage.jsx          # Page displaying details of a single blog post
│   │   ├── Projects.jsx          # Page for listing or managing projects
│   │   ├── Search.jsx            # Search functionality page
│   │   ├── SignIn.jsx            # Page for user sign-in
│   │   ├── SignUp.jsx            # Page for user sign-up
│   │   └── UpdatePost.jsx        # Page for editing/updating an existing post
│   ├── /redux                    # Redux state management folder
│   │   ├── /user
│   │   │   ├── userSlice.js      # Slice for managing user authentication state
│   │   │   └── store.js          # Centralized Redux store setup
│   ├── AllRoutes.jsx             # Component for handling routes with react-router-dom
│   ├── App.css                   # Global CSS for the application
│   ├── App.jsx                   # Main React component
│   ├── index.css                 # Index CSS file for global styles
│   ├── main.jsx                  # Entry point for rendering the React app
├── .env                          # Environment variables (API URLs, etc.)
├── .gitignore                    # Ignored files in version control (e.g., node_modules)
├── index.html                    # Main HTML entry point
├── package.json                  # Project metadata and dependencies
├── package-lock.json             # Lockfile for ensuring exact dependency versions