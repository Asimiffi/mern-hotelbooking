import React from "react";

const Navbar = () => {
  function handlelogout (){
    JSON.parse(localStorage.removeItem("currentUser"))
    
  }
  const user = JSON.parse(localStorage.getItem("currentUser"));
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-extended">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            ASIM ROOMS
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            {user ? (
              <>
                <li className="nav-item ms-auto me-3">
                  <a
                    className="nav-link active"
                    aria-current="page"
                    href="/login"
                  >
                    
                  </a>
                </li>
                <div class="dropdown">
  <a className="btn btn-secondary me-5 dropdown-toggle" href="#" role="button" id="dropdownMenuLink" 
  data-bs-toggle="dropdown" aria-expanded="false">
  {user.name}
  </a>

  <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
    <li><a class="dropdown-item" href="/Profile">Profile</a></li>
    <li><a class="dropdown-item"  href="/login" onClick={handlelogout}>logout</a></li>
    {user.name=='admin' &&(<li><a class="dropdown-item" href="/admin">Admin Panel</a></li>)}
  </ul>
</div>
              </>
            ) : (
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    aria-current="page"
                    href="/login"
                  >
                    Login
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/register">
                    Register
                  </a>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
