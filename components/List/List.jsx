import React from "react";
import Card from "../Card/Card";
import "./list.scss";

export default function List({items}){
    return (
        <div className="list">
            {
                items.map(data=>{
                    return <Card item={data} key={data.id}/>
                })
            }
        </div>
    )
}