import React from "react"
import "./searchBar.scss";
import {Link} from "react-router-dom";


export default function SearchBar(){
    const [query, setQuery] = React.useState({
        type: "buy",
        location: "",
        minPrice: 0,
        maxPrice: 0
    })
    const types = ["buy", "rent"];

    function switchType(val){
        const newQuery = {...query, type: val};
        setQuery(newQuery);
    }

    function handleChange(event){
        const newQuery = {...query};
        newQuery[event.target.name] = event.target.value;
        setQuery(newQuery);
    }

    return (
        <div className="searchbar">
            <div className="type">
                {
                    types.map((type)=>{
                        return <button 
                                    key={`${type}`}
                                    type={`${type}`} 
                                    onClick={()=>switchType(type)}
                                    className={(query.type===type?"active":"")}
                                >
                                    {type}
                                </button>    
                    })
                }
            </div>
            <form>
                <input 
                    type="text" 
                    placeholder="City Location"
                    min= {0}
                    max= {10000000}
                    name="location"
                    onChange={handleChange}
                >
                </input>
                <input 
                    type="number" 
                    placeholder="Min Price"
                    min= {0}
                    max= {10000000}
                    name="minPrice"
                    onChange={handleChange}
                ></input>
                <input 
                    type="number" 
                    placeholder="Max Price"
                    name="maxPrice"
                    min= {0}
                    max= {10000000}
                    onChange={handleChange}
                ></input>
                <Link to={`/list/?type=${query.type}&city=${query.location}&minprice=${query.minPrice}&maxprice=${query.maxPrice}`}>
                    <button type="submit">
                        <img src="/search.png"></img>
                    </button>
                </Link>
            </form>
        </div>
    )
}