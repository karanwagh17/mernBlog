import React from 'react'
import { Link } from 'react-router-dom'

const Homepage = () => {
  return (
<div class="py-md-32 position-relative" style={{backgroundColor:"#121417", color: "#2c2c2c" , position:"static"}}>
    <div class="container-lg max-w-screen-xl">
      <div class="row align-items-center">
        <div class="col-lg-6 order-lg-1 ms-auto d-none d-lg-block">
          <div class=" mb-lg-0 w-11/10 position-relative">
            {/* <!-- Illustration --> */}
          
            {/* <!-- Decorations --> */}
            <div class="position-absolute bottom-0 start-72 h-64 w-64 mt-n4 transform translate-y-n1/2 translate-x-n1/2 gradient-bottom-right start-purple-400 end-cyan-500 filter blur-100 rounded-4 p-5"> </div>
          </div>
        </div>
        <div class="col-lg-6 order-md-0">
          {/* <!-- Surtitle --> */}
          <h5 class="h5 mb-5 text-uppercase text-warning mb-5">
          Welcome to my it blogs pages
          </h5>
          {/* <!-- Heading --> */}
          <h1 class="ls-tight font-bolder display-3 mb-5 text-light">
          Dive into the latest stories, trends, and tips from industry experts.
          </h1>
          {/* <!-- Text --> */}
          <p class="lead mb-10 text-light">
           tap this button and explore the blog page
          </p>
          {/* <!-- Buttons --> */}
          <div class="mx-n2 mb-5">
          <Link to="/blogs">
            <a href="#" class="btn btn-lg btn-primary shadow-sm mx-2 px-lg-8">
             go to the blogpages
            </a>
            </Link>
          
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Homepage