import React from "react";
import "./slider.scss";

export default function Slider({images}){
    const [imageIndex, setImageIndex] = React.useState(null);

    function changeSlide(index){
        if(index==-1){
            setImageIndex(3);
        } else if(index==4){
            setImageIndex(0);
        } else setImageIndex(index);
    }

    return (
        <div className="slider">
            
            {(imageIndex!=null)?<div className="fullSlider">
                <div className="arrow">
                    <img src="/arrow.png" onClick={()=>changeSlide(imageIndex-1)}></img>
                </div>
                <div className="imageContainer">
                    <img src={images[imageIndex]}></img>
                </div>
                <div className="arrow">
                    <img src="/arrow.png" className="right" onClick={()=>changeSlide(imageIndex+1)}></img>
                </div>
                <p className="close" onClick={()=>setImageIndex(null)}>X</p>
            </div>:""}   
            
            <div className="bigImage">
                <img src={images[0]} onClick={()=>setImageIndex(0)}></img>
            </div>
            <div className="smallImage">
                {
                    images.slice(1).map((image, index)=>{
                        return <img src={image} key={index} onClick={()=>setImageIndex(index+1)}></img>
                    })
                }
            </div>
        </div>
    )
}