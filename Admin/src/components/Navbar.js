import { Link } from "react-router-dom";
import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

function Navbar(){

  const navigate = useNavigate()

  useEffect(()=>{
        let isLogin=localStorage.getItem("admin_email")
        if(!isLogin) navigate("/")
    },[])

    return (
        <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <a className="navbar-brand" href="#">Navbar</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item active">
        <Link className="nav-link" to='/users'>Users <span className="sr-only">(current)</span></Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/" onClick={(e)=>{localStorage.removeItem("admin_email")}}>Logout</Link>
      </li>
      <li className="nav-item active">
        <Link className="nav-link" to='/categories'>Categories <span className="sr-only">(current)</span></Link>
      </li>
      <li className="nav-item active">
        <Link className="nav-link" to='/password'>Change Password <span className="sr-only">(current)</span></Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to='/products'>Products <span className="sr-only">(current)</span></Link>
      </li>
    </ul>
    <form className="form-inline my-2 my-lg-0"> 
    </form>
  </div>
</nav>
        </>
    )
}
export default Navbar;