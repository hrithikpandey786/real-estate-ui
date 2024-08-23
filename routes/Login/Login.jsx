import React from "react";
import "./login.scss";
import {Link, useNavigate} from "react-router-dom";
import apiRequest from "../../lib/apiRequest";
import { AuthContext } from "../../context/AuthContext";

export default function Login(){

    const {updateUser} = React.useContext(AuthContext);

    const [error, setError] = React.useState(false);
    const [isDisabled, setIsDisabled] = React.useState(false);
    
    const navigate = useNavigate();

    async function handleSubmit(event){
        event.preventDefault();

        const formData = new FormData(event.target);

        const username = formData.get("username");
        const password = formData.get("password");

        setIsDisabled(true);
        setError(null);

        try{
            const user = await apiRequest.post("/auth/login", {
                username, password
            })

            const {password:userPassword, ...userInfo} = user.data;
           
            updateUser(userInfo);

            navigate("/");
        } catch(err){
            setError(err.response.data.message);
        } finally{
            setIsDisabled(false);
        }
    }

    return(
        <div className="login">
            <div className="formContainer">
                <form onSubmit={handleSubmit}>
                    <h1>Welcome back</h1>
                    <input name="username" type="text" placeholder="Username"></input>
                    <input name="password" type="text" placeholder="Password"></input>
                    <button disabled={isDisabled} type="submit">Login</button>
                    {error && <span>{error}</span>}
                    <Link className="link" to="/register">Don't you have an account?</Link>
                </form>
            </div>
            <div className="imgContainer">
                <img src="/bg.png"></img>
            </div>
        </div>
    )
}