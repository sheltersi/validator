import '../index.css';

import { Link, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-light">
  <div class="container-fluid">
    <a class="navbar-brand text-bg-light"  href="#"><b className='text-light'>Odims_Number_Validation_App</b></a>
    <button class="navbar-toggler btn-light" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon bg-light"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
        <Link class="nav-link active text-primary" to="/">Home</Link>
        </li>
        <li class="nav-item">
        <Link class="nav-link active text-primary" to="/ViewUsage">View Usage</Link>
        </li>
      </ul>
    </div>
  </div>
</nav>
      <Outlet />
    </>
  )
};

export default Layout;