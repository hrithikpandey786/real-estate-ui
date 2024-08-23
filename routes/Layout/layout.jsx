import React from "react"
import { Outlet, Navigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import "../../src/index.scss";
import { AuthContext } from "../../context/AuthContext";


function Layout(){
    return(
        <div className="layout">
            <div className="navbar">
                <Navbar/>
            </div>
            <div className="content">
                <Outlet/>
            </div>
        </div>
    )
}

function RequireAuth(){
    const {currentUser} = React.useContext(AuthContext);
    // const navigate = useNavigate();

    if(!currentUser){
        return <Navigate to="/login"/>
    }

    return(
        currentUser && (<div className="layout">
            <div className="navbar">
                <Navbar/>
            </div>
            <div className="content">
                <Outlet/>
            </div>
        </div>)
    )
}
export {Layout, RequireAuth};