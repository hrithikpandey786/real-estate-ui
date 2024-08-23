import React from "react";
import "./register.scss";
import {Link, useNavigate} from "react-router-dom";
import apiRequest from "../../lib/apiRequest";

export default function Register(){
    const [error, setError] = React.useState(null);
    const [isDisabled, setIsDisabled] = React.useState(false);
    
    const navigate = useNavigate();

    async function handleSubmit(event){
        event.preventDefault();

        setIsDisabled(true);
        setError(false);
        
        const formData = new FormData(event.target);
            
        const username = formData.get("username");
        const email = formData.get("email");
        const password = formData.get("password");  

        try{ 
            
            const user = await apiRequest.post("/auth/register", {
                username, email, password
            })
            navigate("/login");
        } catch(err){
            setError(err.response.data.message);
        } finally{
            setIsDisabled(false);
        }
    }

    return(
        <div className="register">
            <div className="formContainer">
                <form onSubmit={handleSubmit}>
                    <h1>Create an Account</h1>
                    <input name="username" type="text" placeholder="Username"></input>
                    <input name="email" type="email" placeholder="Email"></input>
                    <input name="password" type="text" placeholder="Password"></input>
                    <button disabled={isDisabled} type="submit">Register</button>
                    {error && <span>{error}</span>}
                    <Link className="link" to="/login">Do you have an account?</Link>
                </form>
            </div>
            <div className="imgContainer">
                <img src="/bg.png"></img>
            </div>
        </div>
    )
}