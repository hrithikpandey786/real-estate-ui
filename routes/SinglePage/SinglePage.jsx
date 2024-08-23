import React from "react";
import Slider from "../../components/Slider/Slider";
import "./singlePage.scss";
import { singlePostData, userData } from "../../lib/dummydata";
import Map from "../../components/Map/Map"
import { useLoaderData, useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";
import apiRequest from "../../lib/apiRequest";
import { AuthContext } from "../../context/AuthContext";

export default function SinglePage(){
    const post = useLoaderData();
    const [saved, setSaved] = React.useState(post.isSaved);
    const {currentUser} = React.useContext(AuthContext);
    const navigate = useNavigate();

    const handleSave = async ()=>{
        if(!currentUser){
            navigate("/login");
        }

        setSaved(prev=>!prev);

        try{

            const save = await apiRequest.post("/users/save", {
                postId: post.id
            })
        } catch(err){
            console.log(err);
            setSaved(prev=>!prev);
        }
    }

    return (
        <div className="singlePage">
            <div className="details">
                <div className="wrapper">
                    <Slider images={post.images}/>
                    <div className="info">
                        <div className="top">
                            <div className="post">
                                <h1>{post.title}</h1>
                                <div className="address">
                                    <img src="/pin.png"></img>
                                    <span>{post.address}</span>
                                </div>
                                <div className="price">$ {post.price}</div>
                            </div>
                            <div className="user">
                                <img src={post.user.avatar} alt=""></img>
                                <span><b>{post.user.username}</b></span>
                            </div>
                        </div>
                        <div className="bottom">
                            <p dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(post.postDetail.desc)}}></p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="features">
                <div className="wrapper">
                    <p className="title">General</p>
                    <div className="listVertical">
                        <div className="feature">
                            <img src="utility.png"></img>
                            <div className="featureText">
                                <span>Utilities</span>{
                                    (post.postDetail.utilities==="owner")?
                                        <p>Owner is responsible</p>:
                                        <p>Renter is responsible</p>
                                }
                            </div>
                        </div>
                        <div className="feature">
                            <img src="pet.png"></img>
                            <div className="featureText">
                                <span>Pet Policy</span>{
                                    (post.postDetail.pet==="allowed")?
                                        <p>Pets are Allowed</p>:
                                        <p>Pets are not Allowed</p>   
                                }
                            </div>
                        </div>
                        <div className="feature">
                            <img src="fee.png"></img>
                            <div className="featureText">
                                <span>Property Fees</span>
                                <p>Must have 3x the rent in total householed income</p>
                            </div>
                        </div>
                    </div>
                    <p className="title">Room Sizes</p>
                    <div className="sizes">
                        <div className="size">
                            <img src="/size.png"></img>
                            <span>{post.postDetail.size} sqrm {Math.round(post.postDetail.size*(10.7639))} (sqft)</span>
                        </div>
                        <div className="size">
                            <img src="/bed.png"></img>
                            <span>{parseInt(post.bedroom)} bed</span>
                        </div>
                        <div className="size">
                            <img src="/bath.png"></img>
                            <span>{parseInt(post.bathroom)} bathroom</span>
                        </div>
                    </div>
                    <p className="title">Nearby Places</p>
                    <div className="listHorizontal">
                        <div className="feature">
                                <img src="/school.png"></img>
                                <div className="featureText">
                                    <span>School</span>
                                    <p>{(post.postDetail.school>1000)?post.postDetail.school/1000+" km": post.postDetail.school+" m"} away</p>
                                </div>
                            </div>
                            <div className="feature">
                                <img src="/bus.png"></img>
                                <div className="featureText">
                                    <span>Bus Stop</span>
                                    <p>{(post.postDetail.bus>1000)?post.postDetail.bus/1000+" km": post.postDetail.bus+" m"} away</p>
                                </div>
                            </div>
                            <div className="feature">
                                <img src="/restaurant.png"></img>
                                <div className="featureText">
                                    <span>Restaurant</span>
                                    <p>{(post.postDetail.restaurent>1000)?post.postDetail.restaurent/1000+" km": post.postDetail.restaurent+" m"} away</p>
                                </div>
                            </div>
                    </div>
                    <p className="title">Location</p>
                    <div className="mapContainer">
                        <Map items={[post]}/>
                   </div>
                    <div className="buttons">
                        <div className="button">
                            <img src="/chat.png"></img>
                            <p>Send a Message</p>
                        </div>
                        <div className="button" onClick={handleSave} style={{backgroundColor:saved?'#fece51':'white'}}>
                            <img src="save.png"></img>
                            <p>{saved?"Place Saved":"Save the Place"}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}