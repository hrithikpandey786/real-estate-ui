import React from "react";
import "./filter.scss";
import { useSearchParams } from "react-router-dom";

export default function Filter(){
    const [searchPrams, setSearchParams] = useSearchParams();
    const [query, setQuery] = React.useState({
        type: searchPrams.get("type") || "any",
        city: searchPrams.get("city") || null,
        property: searchPrams.get("property") || "any",
        minprice: searchPrams.get("minprice") || 0,
        maxprice: searchPrams.get("maxprice") || 10000000,
        bedroom: searchPrams.get("bedroom") || null,
    })

    function handleChange(event){
        setQuery(prev=>{
            return {...prev, [event.target.name]: event.target.value};
        })
    }

    function handleFilter(){
        setSearchParams(query);
    }
    
    return (
        <form>
            <h1>Search Results for <b>{searchPrams.get("city")}</b></h1>
            <div className="top">
                <div className="item">
                    <label htmlFor="city" name="city">Location</label>
                    <input type="text" id="city" name="city" placeholder="City" onChange={handleChange}></input>
                </div>
            </div>
            <div className="bottom">
                 <div className="item">
                    <label htmlFor="type">Type</label>
                    <select name="type" id="type" onChange={handleChange}>
                        <option>any</option> 
                        <option value="buy">Buy</option>
                        <option value="rent">Rent</option>
                    </select>
                </div>  
                <div className="item">
                    <label htmlFor="property">Property</label>
                    <select name="property" id="property" onChange={handleChange}>
                        <option>any</option> 
                        <option value="apartment">Apartment</option>
                        <option value="house">House</option>
                        <option value="condo">Condo</option>
                        <option value="land">Land</option>
                    </select>
                </div>  
                <div className="item">
                    <label htmlFor="minprice">Min Price</label>
                    <input type="number" name="minprice" id="minprice" placeholder="Any" onChange={handleChange}></input>
                </div>  
                <div className="item">
                    <label htmlFor="maxprice">Max Price</label>
                    <input type="number" name="maxprice" id="maxprice" placeholder="Any" onChange={handleChange}></input>
                </div>  
                <div className="item">
                    <label htmlFor="bedroom">Bedroom</label>
                    <input type="text" name="bedroom" id="bedroom" placeholder="Any" onChange={handleChange}></input>
                </div>   

                <button type="submit" onClick={handleFilter}>
                    <img src="/search.png"></img>
                </button>
            </div>
        </form>
    )
}