import { Link, useNavigate } from "react-router-dom";
import "../../assets/global.css"
import 'bootstrap/dist/css/bootstrap.min.css'
import { useContext } from "react"
import { UserContext } from "../../contexts/UserContext";
import { Dropdown, DropdownButton } from "react-bootstrap"
import Notification from "../Notification"
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Navbar() {

    
    const { token, setToken, user, setUser } = useContext(UserContext)
    const navigate = useNavigate()

    const logOutHandler = () => {
        
        setUser({})
        setToken(null)
        navigate("/users/login")
    }


    if (token) {
        return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light nav-fill sticky-top w-100" id="navbar">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Restify</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarLinks" aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarLinks">
                        <ul className="navbar-nav ms-auto" id="hello"></ul>
                        <Notification />
                        
                        <DropdownButton id="dropdown-basic-button" title={<FontAwesomeIcon icon={faUser} />}>
                            <Dropdown.Item as={Link} to="/users/feed/">My Feed</Dropdown.Item>
                            { user["rest_id"] && <Dropdown.Item as={Link} to={`/restaurant/${user.rest_id}/info`}>My Restaurant</Dropdown.Item>}
                            <Dropdown.Item onClick={logOutHandler}>Log Out</Dropdown.Item>
                        </DropdownButton>

                        
                    </div>
                </div>
            </nav>    
            
        </>)
    }
    else {
        return (
            <>
                <div id="big-container">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light nav-fill w-100 sticky-top" id="navbar">
                        <div className="container-fluid">
                            <Link className="navbar-brand" to="/users/login">Login</Link>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarLinks" aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                        </div>
                    </nav>
                </div>
                
            </>
        )
    }
}

export default Navbar;