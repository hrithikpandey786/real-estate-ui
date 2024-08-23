import React from "react";
import {MapContainer, TileLayer, Marker, Popup} from "react-leaflet";
import "./map.scss";
// import { listData } from "../../lib/dummydata";
import Pin from "../Pin/Pin";
import "leaflet/dist/leaflet.css";

export default function Map({items}){
    const position = [51.505, -0.09]
    
    return (
        <MapContainer center={(items.length==1)?[parseFloat(items[0].latitude), parseFloat(items[0].longitude)]:[51.505, -0.09]} zoom={8} scrollWheelZoom={false} className="map">
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {
                items.map(data=>{
                    return <Pin item={data} key={data.id}/>
                })
            }            
        </MapContainer>
    )
}