import { Link, useNavigate } from "react-router-dom";
// import "../../assets/global.css"
import 'bootstrap/dist/css/bootstrap.min.css'
import { useContext } from "react"
import { UserContext } from "../../contexts/UserContext";
import { Dropdown, DropdownButton } from "react-bootstrap"

function Footer() {
    
    require("../../assets/global.css")

    const { token, setToken, user, setUser } = useContext(UserContext)
    const navigate = useNavigate()

    const logOutHandler = () => {
        
        setUser({})
        setToken(null)
        navigate("/users/login")
    }
    
    return (
        <>
        <div className="main-footer">
            <div id="footer-container">
                <footer className="row" id="footer">
            
                    <div id="copyright-footer-col" className="col-3" >
                    © Restify 2022
                    </div>
                    
                    <div id="links-footer-col" className="col-9">
                        <ul>
                            <li><a href="#">Privacy Policy</a></li>
                            <li><a href="#">Terms and Conditions</a></li>
                            <li><a href="#">FAQ</a></li>
                        </ul>
                    </div>
                </footer>
            </div>
        </div>
        </>
    )
    
}

export default Footer