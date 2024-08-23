import React from "react";
import {Link, useNavigate} from "react-router-dom";
import "./Card.scss";
import apiRequest from "../../lib/apiRequest";
import { AuthContext } from "../../context/AuthContext";

export default function Card({item}){
    const {currentUser} = React.useContext(AuthContext);
    const [saved, setSaved] = React.useState(false);
    const navigate = useNavigate();

    React.useEffect(()=>{
        if(!currentUser){
            return;
        }

        async function isSaved(){
            try{
                const save = await apiRequest.get(`/posts/${item.id}`);
    
                if(save.data.isSaved){
                    setSaved(true);
                }
            } catch(err){
    
            }
        }
        isSaved();
    }, [])

    async function handleSavePost(){
        if(!currentUser){
            navigate("/login");
        }

        try{
            await apiRequest.post("/users/save",{
                postId: item.id
            })
            setSaved(prev=>!prev);
        } catch(err){
            console.log(err);
        }
    }
    
    return (
        <div className="card">
            <Link to={`/${item.id}`} className="imageContainer">
                <img src={(item.images)?item.images[0]:"/favicon.png"}></img>
            </Link>

            <div className="textContainer">
                <div className="title">
                    <h2><Link to={`/${item.id}`}>{item.title}</Link></h2>
                </div>
                <div className="address">
                    <img src="/pin.png"></img>
                    <span>{item.address}</span>
                </div>
                <div className="price">
                    <p>${item.price}</p>
                </div>

                <div className="bottom">
                    <div className="features">
                        <div className="feature">
                            <img src="/bed.png"></img>
                            <span>{item.bedroom}</span>
                        </div>
                        <div className="feature">
                            <img src="/bath.png"></img>
                            <span>{item.bathroom}</span>
                        </div>
                    </div>
                    <div className="icons">
                        <div className="icon" style={{backgroundColor:saved?"#fece51":"white"}}>
                            <img src="/save.png" onClick={handleSavePost}></img>
                        </div>
                        <div className="icon">
                            <img src="/chat.png"></img>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
} 